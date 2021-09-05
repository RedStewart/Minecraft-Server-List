const mcServerUtil = require('minecraft-server-util');

const Config = require('../config/Config.json');
const Logger = require('../tools/Logger');

class MinecraftAPI {
  constructor() {
    this.serverIp = Config.serverIp;
  }

  async getData() {
    try {
      const res = await mcServerUtil.status(this.serverIp);
      return res;
    } catch (e) {
      Logger.error(e);
      return;
    }
  }
}

module.exports = MinecraftAPI;
