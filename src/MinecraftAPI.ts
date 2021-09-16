import mcServerUtil from 'minecraft-server-util';
import { StatusResponse } from 'minecraft-server-util/dist/model/StatusResponse';

import Config from '../config/Config.json';
import Logger from '../tools/CustomLogger';

class MinecraftAPI {
  private serverIp: string;

  constructor() {
    this.serverIp = Config.serverIp;
  }

  async getData(): Promise<StatusResponse | undefined> {
    try {
      const res: StatusResponse = await mcServerUtil.status(this.serverIp);
      return res;
    } catch (e: any) {
      Logger.error(e);
      return;
    }
  }
}

export default MinecraftAPI;
