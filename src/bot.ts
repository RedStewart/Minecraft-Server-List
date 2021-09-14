import {
  Client,
  Intents,
  Guild,
  Channel,
  TextChannel,
  Message,
  Collection
} from 'discord.js';

import Logger from '../tools/CustomLogger';
import Helper from '../tools/Helper';
import Config from '../config/Config.json';
import CheckConfig from '../tools/CheckConfig';
import MinecraftServer from './MinecraftServer';
import MinecraftAPI from './MinecraftAPI';
import Webhook from './Webhook';

const McAPI: MinecraftAPI = new MinecraftAPI();
const intents: Intents = new Intents(32767);
const client: Client = new Client({ intents });
let embedMessage: string, embedMessageId: string;

CheckConfig();

client.login(Config.discord.botSecretToken);
console.log('one');

client.on('ready', () => Logger.log('Bot online...'));

client.on('ready', async (bot: Client) => {
  const { serverId, channelId }: { serverId: string; channelId: string } =
    getServerIds(bot);

  const channel: Channel | undefined = bot.channels.cache.get(channelId);

  if (!channel) {
    Logger.error(
      'Channel name supplied does not exist, please update your Config.json file with a new Channel name'
    );
    process.exit();
  }

  if (Config.discord.deleteAllMessages)
    await deleteChannelMessages(channel as TextChannel); // cast to a TextChannel since Channel class does not have messages property

  // setInterval(async () => {
  const minecraftServer = await getServerData();
  //   await updateChannelMessage(channel, minecraftServer);
  // }, Config.delay);
});

const getServerIds = (bot: Client): { serverId: string; channelId: string } => {
  const server: Guild | undefined = bot.guilds.cache.find(
    (server) => server.name === Config.discord.serverName
  );

  if (!server) {
    Logger.error(
      'Server name not recognised, please check your serverName input in the Config.json file'
    );
    process.exit();
  }

  const channelName: string = Config.discord.channelName
    .toLowerCase()
    .replace(/\s+/g, '-');

  const channel: Channel | undefined = server.channels.cache.find(
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

const deleteChannelMessages = async (channel: TextChannel): Promise<void> => {
  const messages: Collection<string, Message> = await channel.messages.fetch();
  if (messages.size === 0) return;
  for (const msg of messages.values()) await channel.messages.delete(msg.id);
};

const getServerData = async (): Promise<MinecraftServer | undefined> => {
  try {
    let serverData: object | undefined,
      count: number = 0;

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

    // const playerList: string[] =
    //   serverData.onlinePlayers === 0
    //     ? []
    //     : serverData.samplePlayers.map((el) => el.name);

    // const favicon = serverData.favicon
    //   ? serverData.favicon
    //   : 'https://images.eurogamer.net/2020/articles/2020-09-05-12-53/pack__1_.png/EG11/resize/512x-1/quality/100/format/jpg';

    // return new MinecraftServer(
    //   Config.serverIp,
    //   playerList,
    //   serverData.onlinePlayers,
    //   serverData.maxPlayers,
    //   favicon,
    //   serverData.description.descriptionText,
    //   Date.now()
    // );
  } catch (e: any) {
    Logger.error(e);
    return;
  }
};

// const updateChannelMessage = async (channel, minecraftServer) => {
//   try {
//     const webhook = new Webhook(channel, minecraftServer);
//     if (!embedMessageId) {
//       const embedMessageData = await webhook.sendWebhook('new');
//       embedMessageId = embedMessageData.id;
//       embedMessage = await channel.messages.fetch(embedMessageId);
//       return;
//     }
//     webhook.embedMessage = embedMessage;

//     await webhook.sendWebhook('update');
//   } catch (e) {
//     Logger.error(e);
//   }
// };

export {};
