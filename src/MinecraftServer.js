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
    this.description = description.trim();
    this.lastUpdated = lastUpdated;
  }
}
module.exports = MinecraftServer;
