const axios = require('axios');
require('dotenv').config();

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

      if (res.status === 200) return res.data;

      throw { msg: 'Unexpected response from Minecraft API' };
      console.log(res);

      // if(res.status)
    } catch (error) {
      return undefined;
    }
  }
}

module.exports = MinecraftAPI;
