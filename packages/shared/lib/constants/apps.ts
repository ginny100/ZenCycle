export const availableApps = [
  { name: '9GAG', icon: 'https://www.9gag.com/favicon.ico', url: 'https://www.9gag.com' },
  { name: 'Alibaba', icon: 'https://www.alibaba.com/favicon.ico', url: 'https://www.alibaba.com' },
  { name: 'Amazon', icon: 'https://www.amazon.com/favicon.ico', url: 'https://www.amazon.com' },
  { name: 'BBC', icon: 'https://www.bbc.com/favicon.ico', url: 'https://www.bbc.com' },
  { name: 'BuzzFeed', icon: 'https://www.buzzfeed.com/favicon.ico', url: 'https://www.buzzfeed.com' },
  { name: 'CNN', icon: 'https://www.cnn.com/favicon.ico', url: 'https://www.cnn.com' },
  { name: 'Disney+', icon: 'https://www.disneyplus.com/favicon.ico', url: 'https://www.disneyplus.com' },
  {
    name: 'Discord',
    icon: 'https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/6266bc493fb42d4e27bb8393_847541504914fd33810e70a0ea73177e.ico',
    url: 'https://www.discord.com',
  },
  {
    name: 'DoorDash',
    icon: 'https://cdn.doordash.com/static/img/favicon@2x.ico?dd-nonce',
    url: 'https://www.doordash.com',
  },
  { name: 'Epic Games', icon: 'https://www.epicgames.com/favicon.ico', url: 'https://www.epicgames.com' },
  { name: 'Etsy', icon: 'https://www.etsy.com/favicon.ico', url: 'https://www.etsy.com' },
  {
    name: 'Facebook',
    icon: 'https://static.xx.fbcdn.net/rsrc.php/yT/r/aGT3gskzWBf.ico',
    url: 'https://www.facebook.com',
  },
  { name: 'HuffPost', icon: 'https://www.huffpost.com/favicon.ico', url: 'https://www.huffpost.com' },
  { name: 'Hulu', icon: 'https://www.hulu.com/favicon.ico', url: 'https://www.hulu.com' },
  { name: 'Imgur', icon: 'https://www.imgur.com/favicon.ico', url: 'https://www.imgur.com' },
  {
    name: 'Instagram',
    icon: 'https://static.cdninstagram.com/rsrc.php/v4/yI/r/VsNE-OHk_8a.png',
    url: 'https://www.instagram.com',
  },
  { name: 'Kongregate', icon: 'https://www.kongregate.com/favicon.ico', url: 'https://www.kongregate.com' },
  { name: 'LinkedIn', icon: 'https://www.linkedin.com/favicon.ico', url: 'https://www.linkedin.com' },
  { name: 'Miniclip', icon: 'https://www.miniclip.com/favicon.ico', url: 'https://www.miniclip.com' },
  { name: 'Netflix', icon: 'https://www.netflix.com/favicon.ico', url: 'https://www.netflix.com' },
  { name: 'Pinterest', icon: 'https://www.pinterest.com/favicon.ico', url: 'https://www.pinterest.com' },
  { name: 'Quora', icon: 'https://www.quora.com/favicon.ico', url: 'https://www.quora.com' },
  { name: 'Reddit', icon: 'https://www.reddit.com/favicon.ico', url: 'https://www.reddit.com' },
  { name: 'Slack', icon: 'https://slack.com/favicon.ico', url: 'https://www.slack.com' },
  { name: 'Snapchat', icon: 'https://www.snapchat.com/favicon.ico', url: 'https://www.snapchat.com' },
  { name: 'Spotify', icon: 'https://www.spotify.com/favicon.ico', url: 'https://www.spotify.com' },
  { name: 'Steam', icon: 'https://store.steampowered.com/favicon.ico', url: 'https://store.steampowered.com' },
  { name: 'Telegram', icon: 'https://telegram.org/favicon.ico', url: 'https://www.telegram.org' },
  { name: 'TikTok', icon: 'https://www.tiktok.com/favicon.ico', url: 'https://www.tiktok.com' },
  { name: 'Tumblr', icon: 'https://www.tumblr.com/favicon.ico', url: 'https://www.tumblr.com' },
  { name: 'Twitch', icon: 'https://www.twitch.tv/favicon.ico', url: 'https://www.twitch.tv' },
  { name: 'Twitter', icon: 'https://twitter.com/favicon.ico', url: 'https://www.twitter.com' },
  { name: 'Uber Eats', icon: 'https://www.ubereats.com/_static/d526ae562360062f.ico', url: 'https://www.ubereats.com' },
  { name: 'Walmart', icon: 'https://www.walmart.com/favicon.ico', url: 'https://www.walmart.com' },
  { name: 'WhatsApp', icon: 'https://web.whatsapp.com/favicon.ico', url: 'https://www.whatsapp.com' },
  { name: 'Youtube', icon: 'https://www.youtube.com/favicon.ico', url: 'https://www.youtube.com' },
] as const;

export type App = (typeof availableApps)[number];
