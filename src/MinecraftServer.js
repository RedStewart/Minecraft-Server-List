class MinecraftServer {
  constructor(
    serverIp,
    playerList,
    onlinePlayers,
    maxPlayers,
    icon,
    description,
    lastUpdated
  ) {
    this.serverIp = serverIp;
    this.playerList = playerList;
    this.onlinePlayers = onlinePlayers;
    this.maxPlayers = maxPlayers;
    this.icon = icon;
    this.description = description
      .trim()
      .replace(/§([a-z]{1})|§([A-Z]{1})|§(\d{1})/g, ' ');
    this.lastUpdated = lastUpdated;
  }
}
module.exports = MinecraftServer;
