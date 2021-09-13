const mcServerUtil = require('minecraft-server-util');

const Config = require('../config/Config.json');
const Logger = require('../tools/CustomLogger');

class MinecraftAPI {
  private serverIp: string;

  constructor() {
    this.serverIp = Config.serverIp;
  }

  async getData(): Promise<object | undefined> {
    try {
      const res: object = await mcServerUtil.status(this.serverIp);
      return res;
    } catch (e) {
      Logger.error(e);
      return;
    }
  }
}

module.exports = MinecraftAPI;
