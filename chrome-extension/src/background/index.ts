import 'webextension-polyfill';
import type { ZenSettings } from '@extension/storage';
import { ZenEvent, zenStorage, ZenTimerState } from '@extension/storage';

let timerIntervalId: NodeJS.Timeout | null = null;

const endState = {
  timerState: ZenTimerState.None,
  timeLeft: 0,
  currentSession: 1,
  timerActive: false,
};

const stopTimer = (newState: ZenSettings) => {
  if (timerIntervalId) {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
  }
  zenStorage.set(newState);
};
// Define a function to start or stop the timer
async function startTimer(focusMinutes: number, breakMinutes: number, sessions: number, blockedApps: string[]) {
  const initialState: ZenSettings = {
    timerActive: true,
    currentSession: 1,
    timerState: ZenTimerState.Focus,
    timeLeft: focusMinutes * 60, // in seconds
    sessions,
    focusMinutes,
    breakMinutes,
    blockedApps: blockedApps,
    lastTimestamp: Date.now(),
  };

  await zenStorage.set(initialState); // Store initial state

  // Handle timer state transitions
  timerIntervalId = setInterval(async () => {
    const state = await zenStorage.get();
    console.log(
      '🕒 Timer Ticking: phase = ',
      state.timerState,
      'timeLeft = ',
      state.timeLeft,
      ' blockedSites = ',
      state.blockedApps,
    );
    // Decrease the timeLeft
    const updatedTimeLeft = state.timeLeft - 1;
    await zenStorage.set({ ...state, timeLeft: updatedTimeLeft });

    if (updatedTimeLeft <= 0) {
      // Phase change logic
      switch (state.timerState) {
        case ZenTimerState.Focus:
          {
            const nextState = {
              timerState: ZenTimerState.Break,
              timeLeft: breakMinutes * 60,
              currentSession: state.currentSession,
              timerActive: true,
            };
            await zenStorage.set({ ...state, ...nextState }); // Set to break phase
          }
          break;
        case ZenTimerState.Break:
          // All sessions are done
          if (state.currentSession >= sessions) {
            const allDoneState = {
              timerState: ZenTimerState.Break,
              timeLeft: 0,
              currentSession: state.currentSession + 1,
              timerActive: false,
            };
            stopTimer({ ...state, ...allDoneState });
            // There're more sessions to go
          } else {
            const nextState = {
              timerState: ZenTimerState.Focus,
              timeLeft: focusMinutes * 60,
              currentSession: state.currentSession + 1,
              timerActive: true,
            };
            await zenStorage.set({ ...state, ...nextState }); // Set to focus phase
          }
          break;
        default:
          break;
      }
    }
  }, 1000);
}

// Handle setting changes from Popup
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (timerIntervalId) {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
  }
  const state = await zenStorage.get();

  switch (message.type) {
    case ZenEvent.StartTimer:
      {
        const { focusMinutes, breakMinutes, sessions, blockedApps } = message.payload;
        startTimer(focusMinutes, breakMinutes, sessions, blockedApps).then();
        console.log('🚀 Timer Started');
      }
      break;
    case ZenEvent.StopTimer:
      console.log('🛑 Timer Stopped');
      stopTimer({ ...state, ...endState });
  }
  sendResponse({ status: 'ok' });
});

// trigger stop timer immediately when first launched
chrome.runtime.onInstalled.addListener(() => {
  console.log('🚀 Extension Installed');
  chrome.runtime.sendMessage({ type: ZenEvent.StopTimer }, () => {
    console.log('🛑 Initial Timer Stopped');
  });
});
