const Logger = require('../tools/Logger');
const Config = require('../config/Config.json');
const { Client, Intents } = require('discord.js');

const intents = new Intents(32767);
const client = new Client({ intents });

client.login(Config.discord.botSecretToken);

client.on('ready', () => Logger.log('Bot online...'));

client.on('ready', async (bot) => {
  const serverIds = getServerIds(bot);
  const channel = bot.channels.cache.get(serverIds.channelId);

  if (Config.discord.deleteAllMessages) await deleteChannelMessages(channel);

  console.log('done');
});

const getServerIds = (bot) => {
  const server = bot.guilds.cache.find(
    (server) => server.name === Config.discord.serverName
  );

  if (!server) {
    Logger.error(
      'Server name not recognised, please check your serverName input in the Config.json file'
    );
    process.exit();
  }

  const channelName = Config.discord.channelName
    .toLowerCase()
    .replace(/\s+/g, '-');

  const channel = server.channels.cache.find(
    (channel) => channel.name === channelName
  );

  if (!channel) {
    Logger.error(
      'Channel name not recognised, please check your channelName input in the Config.json file'
    );
    process.exit();
  }

  return {
    serverId: server.id,
    channelId: channel.id
  };
};

const deleteChannelMessages = async (channel) => {
  const messages = await channel.messages.fetch();

  if (messages.size === 0) return;

  for (const msg of messages.values()) await channel.messages.delete(msg.id);
};
