export const availableApps = [
  { name: "Chrome", icon: "🌐", url: "https://www.google.com" },
  { name: "Firefox", icon: "🦊", url: "https://www.mozilla.org" },
  { name: "Safari", icon: "🧭", url: "https://www.apple.com" },
  { name: "VS Code", icon: "📝", url: "https://www.microsoft.com" },
  { name: "Slack", icon: "💬", url: "https://www.slack.com" },
  { name: "Discord", icon: "🎮", url: "https://www.discord.com" },
  { name: "Spotify", icon: "🎵", url: "https://www.spotify.com" },
  { name: "Twitter", icon: "🐦", url: "https://www.twitter.com" },
  { name: "Facebook", icon: "👥", url: "https://www.facebook.com" },
  { name: "Instagram", icon: "📸", url: "https://www.instagram.com" },
  { name: "TikTok", icon: "🎶", url: "https://www.tiktok.com" },
  { name: "Youtube", icon: "🎥", url: "https://www.youtube.com" },
  { name: "LinkedIn", icon: "🔗", url: "https://www.linkedin.com" },
  { name: "WhatsApp", icon: "📱", url: "https://www.whatsapp.com" },
  { name: "Telegram", icon: "📱", url: "https://www.telegram.org" },
  { name: "Snapchat", icon: "📸", url: "https://www.snapchat.com" },
  { name: "Pinterest", icon: "📌", url: "https://www.pinterest.com" },
] as const;

export type App = typeof availableApps[number]; 