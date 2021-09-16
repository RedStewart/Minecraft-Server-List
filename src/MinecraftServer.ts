class MinecraftServer {
  public serverIp: string;
  public playerList: string[];
  public playerCount: PlayerCount;
  public favicon: string | Buffer;
  public description: string;
  public lastUpdated: number;

  constructor(
    serverIp: string,
    playerList: string[],
    playerCount: PlayerCount = {
      online: 0,
      max: 0
    },
    favicon: string, // import only as string as never will import as a buffer
    description: string,
    lastUpdated: number
  ) {
    this.serverIp = serverIp;
    this.playerList = playerList;
    this.playerCount = playerCount;
    this.favicon = this.parseFavicon(favicon);
    this.description = description
      .replace(/\n/g, ' ')
      .replace(/§([a-z]{1})|§([A-Z]{1})|§(\d{1})/g, ' ')
      .trim();
    this.lastUpdated = lastUpdated;
  }

  parseFavicon(favicon: string): string | Buffer {
    if (!favicon.includes('base64')) return favicon;

    const icon = favicon.split('base64,').slice(1).join(',');
    return Buffer.from(icon, 'base64');
  }
}

type PlayerCount = {
  online: number | null;
  max: number | null;
};

export default MinecraftServer;
