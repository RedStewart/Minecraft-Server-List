class MinecraftServer {
  private serverIp: string;
  private playerList: string[];
  // private onlinePlayers: number;
  // private maxPlayers: number;
  private playerCount: object;
  private favicon: string | Buffer;
  private description: string;
  private lastUpdated: Date;
  constructor(
    serverIp: string,
    playerList: string[],
    playerCount: { online: number; max: number } = {
      online: 0,
      max: 0
    },
    // onlinePlayers: number,
    // maxPlayers: number,
    favicon: string, // import only as string as never will import as a buffer
    description: string,
    lastUpdated: Date
  ) {
    this.serverIp = serverIp;
    this.playerList = playerList;
    this.playerCount = playerCount;
    // this.onlinePlayers = onlinePlayers;
    // this.maxPlayers = maxPlayers;
    this.favicon = this.parseFavicon(favicon);
    this.description = description
      .trim()
      .replace(/\n/g, ' ')
      .replace(/§([a-z]{1})|§([A-Z]{1})|§(\d{1})/g, ' ');
    this.lastUpdated = lastUpdated;
  }

  parseFavicon(favicon: string): string | Buffer {
    if (!favicon.includes('base64')) return favicon;

    const icon = favicon.split('base64,').slice(1).join(',');
    return Buffer.from(icon, 'base64');
  }
}
module.exports = MinecraftServer;
