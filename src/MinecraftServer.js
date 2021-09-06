class MinecraftServer {
  constructor(
    serverIp,
    playerList,
    onlinePlayers,
    maxPlayers,
    favicon,
    description,
    lastUpdated
  ) {
    this.serverIp = serverIp;
    this.playerList = playerList;
    this.onlinePlayers = onlinePlayers;
    this.maxPlayers = maxPlayers;
    this.favicon = this.parseFavicon(favicon);
    this.description = description
      .trim()
      .replace(/\n/g, ' ')
      .replace(/§([a-z]{1})|§([A-Z]{1})|§(\d{1})/g, ' ');
    this.lastUpdated = lastUpdated;
  }

  parseFavicon(favicon) {
    if (!favicon.includes('base64')) return favicon;

    const icon = favicon.split('base64,').slice(1).join(',');
    return Buffer.from(icon, 'base64');
  }
}
module.exports = MinecraftServer;
