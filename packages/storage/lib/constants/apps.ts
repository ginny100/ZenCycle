export interface App {
  name: string;
  icon: string;
  url: string;
}

export const availableApps: Array<App> = [
  { name: '9GAG', icon: 'https://www.google.com/s2/favicons?domain=9gag.com&size=32', url: 'https://www.9gag.com' },
  {
    name: 'Alibaba',
    icon: 'https://www.google.com/s2/favicons?domain=alibaba.com&size=32',
    url: 'https://www.alibaba.com',
  },
  {
    name: 'Amazon',
    icon: 'https://www.google.com/s2/favicons?domain=amazon.com&size=32',
    url: 'https://www.amazon.com',
  },
  { name: 'BBC', icon: 'https://www.google.com/s2/favicons?domain=bbc.com&size=32', url: 'https://www.bbc.com' },
  {
    name: 'BuzzFeed',
    icon: 'https://www.google.com/s2/favicons?domain=buzzfeed.com&size=32',
    url: 'https://www.buzzfeed.com',
  },
  { name: 'CNN', icon: 'https://www.google.com/s2/favicons?domain=cnn.com&size=32', url: 'https://www.cnn.com' },
  {
    name: 'Disney+',
    icon: 'https://www.google.com/s2/favicons?domain=disneyplus.com&size=32',
    url: 'https://www.disneyplus.com',
  },
  {
    name: 'Discord',
    icon: 'https://www.google.com/s2/favicons?domain=discord.com&size=32',
    url: 'https://www.discord.com',
  },
  {
    name: 'DoorDash',
    icon: 'https://www.google.com/s2/favicons?domain=doordash.com&size=32',
    url: 'https://www.doordash.com',
  },
  {
    name: 'Epic Games',
    icon: 'https://www.google.com/s2/favicons?domain=epicgames.com&size=32',
    url: 'https://www.epicgames.com',
  },
  { name: 'Etsy', icon: 'https://www.google.com/s2/favicons?domain=etsy.com&size=32', url: 'https://www.etsy.com' },
  {
    name: 'Facebook',
    icon: 'https://www.google.com/s2/favicons?domain=facebook.com&size=32',
    url: 'https://www.facebook.com',
  },
  {
    name: 'Messenger',
    icon: 'https://www.google.com/s2/favicons?domain=messenger.com&size=32',
    url: 'https://www.messenger.com',
  },
  {
    name: 'HuffPost',
    icon: 'https://www.google.com/s2/favicons?domain=huffpost.com&size=32',
    url: 'https://www.huffpost.com',
  },
  { name: 'Hulu', icon: 'https://www.google.com/s2/favicons?domain=hulu.com&size=32', url: 'https://www.hulu.com' },
  { name: 'Imgur', icon: 'https://www.google.com/s2/favicons?domain=imgur.com&size=32', url: 'https://www.imgur.com' },
  {
    name: 'Instagram',
    icon: 'https://www.google.com/s2/favicons?domain=instagram.com&size=32',
    url: 'https://www.instagram.com',
  },
  {
    name: 'Kongregate',
    icon: 'https://www.google.com/s2/favicons?domain=kongregate.com&size=32',
    url: 'https://www.kongregate.com',
  },
  {
    name: 'LinkedIn',
    icon: 'https://www.google.com/s2/favicons?domain=linkedin.com&size=32',
    url: 'https://www.linkedin.com',
  },
  {
    name: 'Miniclip',
    icon: 'https://www.google.com/s2/favicons?domain=miniclip.com&size=32',
    url: 'https://www.miniclip.com',
  },
  {
    name: 'Netflix',
    icon: 'https://www.google.com/s2/favicons?domain=netflix.com&size=32',
    url: 'https://www.netflix.com',
  },
  {
    name: 'Pinterest',
    icon: 'https://www.google.com/s2/favicons?domain=pinterest.com&size=32',
    url: 'https://www.pinterest.com',
  },
  { name: 'Quora', icon: 'https://www.google.com/s2/favicons?domain=quora.com&size=32', url: 'https://www.quora.com' },
  {
    name: 'Reddit',
    icon: 'https://www.google.com/s2/favicons?domain=reddit.com&size=32',
    url: 'https://www.reddit.com',
  },
  { name: 'Slack', icon: 'https://www.google.com/s2/favicons?domain=slack.com&size=32', url: 'https://www.slack.com' },
  {
    name: 'Snapchat',
    icon: 'https://www.google.com/s2/favicons?domain=snapchat.com&size=32',
    url: 'https://www.snapchat.com',
  },
  {
    name: 'Spotify',
    icon: 'https://www.google.com/s2/favicons?domain=spotify.com&size=32',
    url: 'https://www.spotify.com',
  },
  {
    name: 'Steam',
    icon: 'https://www.google.com/s2/favicons?domain=steampowered.com&size=32',
    url: 'https://store.steampowered.com',
  },
  {
    name: 'Telegram',
    icon: 'https://www.google.com/s2/favicons?domain=telegram.org&size=32',
    url: 'https://www.telegram.org',
  },
  {
    name: 'TikTok',
    icon: 'https://www.google.com/s2/favicons?domain=tiktok.com&size=32',
    url: 'https://www.tiktok.com',
  },
  {
    name: 'Tumblr',
    icon: 'https://www.google.com/s2/favicons?domain=tumblr.com&size=32',
    url: 'https://www.tumblr.com',
  },
  { name: 'Twitch', icon: 'https://www.google.com/s2/favicons?domain=twitch.tv&size=32', url: 'https://www.twitch.tv' },
  {
    name: 'Twitter',
    icon: 'https://www.google.com/s2/favicons?domain=twitter.com&size=32',
    url: 'https://www.twitter.com',
  },
  {
    name: 'Uber Eats',
    icon: 'https://www.google.com/s2/favicons?domain=ubereats.com&size=32',
    url: 'https://www.ubereats.com',
  },
  {
    name: 'Walmart',
    icon: 'https://www.google.com/s2/favicons?domain=walmart.com&size=32',
    url: 'https://www.walmart.com',
  },
  {
    name: 'WhatsApp',
    icon: 'https://www.google.com/s2/favicons?domain=whatsapp.com&size=32',
    url: 'https://www.whatsapp.com',
  },
  {
    name: 'Youtube',
    icon: 'https://www.google.com/s2/favicons?domain=youtube.com&size=32',
    url: 'https://www.youtube.com',
  },
] as const;
