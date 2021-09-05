const Logger = require('../tools/Logger');
const Helper = require('../tools/Helper');
const Config = require('../config/Config.json');
const Assets = require('../config/Assets.json');
const MinecraftServer = require('./MinecraftServer');
const MinecraftAPI = require('./MinecraftAPI');
const Webhook = require('./Webhook');

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

  // console.log(server);
  // updateChannelMessage(channel, minecraftServer);
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
    'https://images.eurogamer.net/2020/articles/2020-09-05-12-53/pack__1_.png/EG11/resize/512x-1/quality/75/format/jpg',
    serverData.motd.clean[0],
    Date.now()
  );
};

const updateChannelMessage = async (channel, minecraftServer) => {
  const webhook = new Webhook(channel, minecraftServer);

  if (!embedMessageId) {
    const embedMessage = await webhook.sendWebhook();
    embedMessageId = embedMessage.id;
  }

  await Helper.sleep(5000);

  const message = await channel.messages.fetch(embedMessageId);

  let x = await message.edit({
    embeds: [
      new MessageEmbed()
        .setTitle(minecraftServer.serverIp)

        .setColor('#ffffff')
        .setAuthor(
          'Player List Updated!',
          'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/71c6fceb-a2b9-4ccb-9af4-387c330f23e5/d4j5vy7-b3e8d628-ced2-4c4a-89c4-bb1e3fa953dd.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzcxYzZmY2ViLWEyYjktNGNjYi05YWY0LTM4N2MzMzBmMjNlNVwvZDRqNXZ5Ny1iM2U4ZDYyOC1jZWQyLTRjNGEtODljNC1iYjFlM2ZhOTUzZGQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.5YmIy5ClmnCQOeF5HxVCXxouwkLvgKvFPp4EueJCyqw'
        )
        .setDescription(minecraftServer.motd)
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
          'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/71c6fceb-a2b9-4ccb-9af4-387c330f23e5/d4j5vy7-b3e8d628-ced2-4c4a-89c4-bb1e3fa953dd.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzcxYzZmY2ViLWEyYjktNGNjYi05YWY0LTM4N2MzMzBmMjNlNVwvZDRqNXZ5Ny1iM2U4ZDYyOC1jZWQyLTRjNGEtODljNC1iYjFlM2ZhOTUzZGQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.5YmIy5ClmnCQOeF5HxVCXxouwkLvgKvFPp4EueJCyqw'
        )
    ]
  });

  console.log(x);
};
