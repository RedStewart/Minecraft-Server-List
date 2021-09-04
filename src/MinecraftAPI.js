const axios = require('axios');
require('dotenv').config();

const Logger = require('../tools/Logger');

class MinecraftAPI {
  constructor() {
    this.endpoint = 'https://api.mcsrvstat.us/2';
    this.serverIp = process.env.SERVER_IP;
  }

  async getData() {
    try {
      const res = await axios({
        method: 'GET',
        url: `${this.endpoint}/${this.serverIp}`
      });

      if (res.data && res.data.online === false)
        throw { status: 404, msg: 'Server is currently offline' };

      if (res.status === 200) return res.data;

      throw { status: 400, msg: 'Unexpected response from Minecraft API' };
    } catch (e) {
      if (e.status && e.status.toString().startsWith('4')) Logger.error(e.msg);
      else Logger.error(e);
      return undefined;
    }
  }
}

module.exports = MinecraftAPI;
