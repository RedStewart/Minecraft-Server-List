const MinecraftAPI = require('./MinecraftAPI');
const Logger = require('../tools/Logger');

const main = async () => {
  const mcapi = new MinecraftAPI();
  await mcapi.getData();
};

main();
