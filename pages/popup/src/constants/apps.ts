export const availableApps = [
  { name: "Chrome", icon: "🌐" },
  { name: "Firefox", icon: "🦊" },
  { name: "Safari", icon: "🧭" },
  { name: "VS Code", icon: "📝" },
  { name: "Slack", icon: "💬" },
  { name: "Discord", icon: "🎮" },
  { name: "Spotify", icon: "🎵" },
  { name: "Twitter", icon: "🐦" },
  { name: "Facebook", icon: "👥" },
  { name: "Instagram", icon: "📸" },
] as const;

export type App = typeof availableApps[number]; 