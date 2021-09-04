class MinecraftServer {
  constructor(serverIp, playerList, maxUsers, icon, motd, lastUpdated) {
    this.serverIp = serverIp;
    this.playerList = playerList;
    this.maxUsers = maxUsers;
    this.icon = icon;
    this.motd = motd.trim();
    this.lastUpdated = lastUpdated;
  }
}
module.exports = MinecraftServer;
