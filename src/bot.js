const Logger = require('../tools/Logger');
const Helper = require('../tools/Helper');
const Config = require('../config/Config.json');
const MinecraftServer = require('./MinecraftServer');
const MinecraftAPI = require('./MinecraftAPI');
const Webhook = require('./Webhook');

const McAPI = new MinecraftAPI();
const CheckConfig = require('../tools/CheckConfig');
const { Client, Intents } = require('discord.js');

const intents = new Intents(32767);
const client = new Client({ intents });
let embedMessage, embedMessageId;

CheckConfig();

client.login(Config.discord.botSecretToken);

client.on('ready', () => Logger.log('Bot online...'));

client.on('ready', async (bot) => {
  const serverIds = getServerIds(bot);
  const channel = bot.channels.cache.get(serverIds.channelId);

  if (Config.discord.deleteAllMessages) await deleteChannelMessages(channel);

  setInterval(async () => {
    const minecraftServer = await getServerData();
    await updateChannelMessage(channel, minecraftServer);
  }, Config.delay);
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

const getServerData = async () => {
  try {
    let serverData,
      count = 0;

    while (!serverData) {
      if (count === 4) {
        Logger.error(
          'Failed to fetch initial Server data, please try again later'
        );
        process.exit();
      }
      serverData = await McAPI.getData();
      count++;
      await Helper.sleep(3000);
    }

    const playerList =
      serverData.onlinePlayers === 0
        ? []
        : serverData.samplePlayers.map((el) => el.name);

    const favicon = serverData.favicon
      ? serverData.favicon
      : 'https://images.eurogamer.net/2020/articles/2020-09-05-12-53/pack__1_.png/EG11/resize/512x-1/quality/100/format/jpg';

    return new MinecraftServer(
      Config.serverIp,
      playerList,
      serverData.onlinePlayers,
      serverData.maxPlayers,
      favicon,
      serverData.description.descriptionText,
      Date.now()
    );
  } catch (e) {
    Logger.error(e);
  }
};

const updateChannelMessage = async (channel, minecraftServer) => {
  try {
    const webhook = new Webhook(channel, minecraftServer);
    if (!embedMessageId) {
      const embedMessageData = await webhook.sendWebhook('new');
      embedMessageId = embedMessageData.id;
      embedMessage = await channel.messages.fetch(embedMessageId);
      return;
    }
    webhook.embedMessage = embedMessage;

    await webhook.sendWebhook('update');
  } catch (e) {
    Logger.error(e);
  }
};
