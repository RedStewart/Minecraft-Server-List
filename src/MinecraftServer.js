class MinecraftServer {
  constructor(serverIp, playerList, maxUsers, icon, description, lastUpdated) {
    this.serverIp = serverIp;
    this.playerList = playerList;
    this.maxUsers = maxUsers;
    this.icon = icon;
    this.description = description.trim();
    this.lastUpdated = lastUpdated;
  }
}
module.exports = MinecraftServer;
