import mcServerUtil from 'minecraft-server-util';

import Config from '../config/Config.json';
import Logger from '../tools/CustomLogger';

class MinecraftAPI {
  private serverIp: string;

  constructor() {
    this.serverIp = Config.serverIp;
  }

  async getData(): Promise<object | undefined> {
    try {
      const res: object = await mcServerUtil.status(this.serverIp);
      return res;
    } catch (e: any) {
      Logger.error(e);
      return;
    }
  }
}

export default MinecraftAPI;
