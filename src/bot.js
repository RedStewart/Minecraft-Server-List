const Logger = require('../tools/Logger');
const Helper = require('../tools/Helper');
const Config = require('../config/Config.json');
const Assets = require('../config/Assets.json');
const MinecraftServer = require('./MinecraftServer');
const MinecraftAPI = require('./MinecraftAPI');
const McAPI = new MinecraftAPI();
const CheckConfig = require('../tools/CheckConfig');
const { Client, Intents, MessageEmbed } = require('discord.js');

const intents = new Intents(32767);
const client = new Client({ intents });
let embedMessageId;

CheckConfig();

client.login(Config.discord.botSecretToken);

client.on('ready', () => Logger.log('Bot online...'));

client.on('ready', async (bot) => {
  const serverIds = getServerIds(bot);
  const channel = bot.channels.cache.get(serverIds.channelId);

  if (Config.discord.deleteAllMessages) await deleteChannelMessages(channel);

  const minecraftServer = await getServerData();

  console.log(minecraftServer);

  // console.log(server);
  updateChannelMessage(channel, minecraftServer);
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
    serverData.players.online === 0 ? [] : serverData.players.list;

  return new MinecraftServer(
    Config.serverIp,
    playerList,
    serverData.players.max,
    // serverData.icon
    //   ? serverData.icon
    //   : 'https://images.eurogamer.net/2020/articles/2020-09-05-12-53/pack__1_.png/EG11/resize/512x-1/quality/75/format/jpg',
    'https://images.eurogamer.net/2020/articles/2020-09-05-12-53/pack__1_.png/EG11/resize/512x-1/quality/75/format/jpg',
    serverData.motd.clean[0],
    Date.now()
  );
};

const updateChannelMessage = async (channel, minecraftServer) => {
  // const messages = await channel.messages.fetch();

  // if (messages.size === 0) {
  //   // no m
  // }

  const usersString =
    minecraftServer.playerList.length > 0
      ? `🟢 ${minecraftServer.playerList.join('\n🟢 ')}`
      : '🔴 No Users Online';

  const embedMessage = await channel.send({
    embeds: [
      new MessageEmbed()
        .setColor('#0099ff')
        .setAuthor(minecraftServer.serverIp, 'https://i.imgur.com/AfFp7pu.png')
        .setDescription(minecraftServer.motd)
        .setThumbnail(minecraftServer.icon)
        .addFields({
          name: `**Current Active Users** - ${minecraftServer.playerList.length}/${minecraftServer.maxUsers}`,
          value: usersString
        })
        .setImage(Helper.randomArrayElement(Assets.previewImages))
        .setFooter(
          `Last Updated: ${Helper.format12HourDate(
            new Date(minecraftServer.lastUpdated)
          )}`,
          'https://i.imgur.com/AfFp7pu.png'
        )
    ]
  });

  embedMessageId = embedMessage.id;

  await Helper.sleep(5000);

  const message = await channel.messages.fetch(embedMessageId);

  let x = await message.edit({
    embeds: [
      new MessageEmbed()
        .setColor('#000000')
        .setAuthor(minecraftServer.serverIp, 'https://i.imgur.com/AfFp7pu.png')
        .setDescription('edited')
        .setThumbnail(minecraftServer.icon)
        .addFields({
          name: `**Current Active Users** - ${minecraftServer.playerList.length}/${minecraftServer.maxUsers}`,
          value: usersString
        })
        .setImage(Helper.randomArrayElement(Assets.previewImages))
        .setFooter(
          `Last Updated: ${Helper.format12HourDate(
            new Date(minecraftServer.lastUpdated)
          )}`,
          'https://i.imgur.com/AfFp7pu.png'
        )
    ]
  });

  console.log(x);
};
