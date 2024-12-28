import { zenStorage } from '@extension/storage';
import { availableApps } from '@extension/shared/lib/constants/apps';

// Track blocking state
let isBlockingEnabled = false;
let blockedUrls: string[] = [];

// Update the path to match your build output directory
const CONTENT_SCRIPT_PATH = 'pages/content/src/index.tsx';

// Listen for timer state changes
zenStorage.subscribe(async () => {
  const settings = await zenStorage.get();
  // Enable blocking only during focus time
  isBlockingEnabled = settings.timerActive && settings.timerState === 'focus';
  console.log('🔍 Timer State:', { isBlockingEnabled, timerActive: settings.timerActive, timerState: settings.timerState });

  // Get URLs of blocked apps
  blockedUrls = settings.blockedApps.map(app => {
    const appInfo = availableApps.find(a => a.name === app);
    return appInfo?.url || '';
  }).filter(Boolean);
  console.log('📋 Blocked URLs:', blockedUrls);

  // Check all open tabs and block if needed
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach(tab => {
      if (tab.id && tab.url) {
        const shouldBlock = isBlockingEnabled && blockedUrls.some(url => tab.url?.includes(url));
        console.log('🚫 Checking Tab:', { url: tab.url, shouldBlock });
        if (shouldBlock) {
          console.log('🛑 Injecting BlockView into:', tab.url);
          chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: [CONTENT_SCRIPT_PATH]
          });
        }
      }
    });
  });
});

// Monitor new tabs or URL changes
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    const shouldBlock = isBlockingEnabled && blockedUrls.some(url => tab.url?.includes(url));
    console.log('🔄 Tab Updated:', { url: tab.url, shouldBlock });
    if (shouldBlock) {
      console.log('🛑 Injecting BlockView into:', tab.url);
      chrome.scripting.executeScript({
        target: { tabId },
        files: [CONTENT_SCRIPT_PATH]
      });
    }
  }
}); 