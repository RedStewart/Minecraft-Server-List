import Assets from '../config/Assets.json';
import Helper from '../tools/Helper';
import MinecraftServer from './MinecraftServer';
import {
  AttachmentBuilder,
  EmbedBuilder,
  TextChannel,
  Message,
} from 'discord.js';

class Webhook {
  private channel: TextChannel;
  private mcServer: MinecraftServer;
  private iconUrl: string;
  public embedMessage!: Message; // non null assertion as embedMessage will never be null|undefined
  constructor(channel: TextChannel, mcServer: MinecraftServer) {
    this.channel = channel;
    this.mcServer = mcServer;
    this.iconUrl =
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/71c6fceb-a2b9-4ccb-9af4-387c330f23e5/d4j5vy7-b3e8d628-ced2-4c4a-89c4-bb1e3fa953dd.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzcxYzZmY2ViLWEyYjktNGNjYi05YWY0LTM4N2MzMzBmMjNlNVwvZDRqNXZ5Ny1iM2U4ZDYyOC1jZWQyLTRjNGEtODljNC1iYjFlM2ZhOTUzZGQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.5YmIy5ClmnCQOeF5HxVCXxouwkLvgKvFPp4EueJCyqw';
  }

  async sendWebhook(type: string = 'update'): Promise<Message | undefined> {
    switch (type) {
      case 'new':
        return await this.channel.send(this.getWebhookFormat());
      case 'update':
        return await this.embedMessage.edit(this.getWebhookFormat());
      default:
        break;
    }
  }

  getWebhookFormat(): object {
    const usersString: string =
      this.mcServer.playerList.length > 0
        ? `🟢 ${this.mcServer.playerList.join('\n🟢 ')}`
        : '🔴 No Users Online';

    const favicon: string | Buffer | AttachmentBuilder = this.getFavicon();

    const { max: maxPlayers, online: onlinePlayers } =
      this.mcServer.playerCount;

    // console.log(this.mcServer.favicon);
    // console.log(this.mcServer.favicon.includes('base64'));

    let embed: DiscordMessageEmbed = {
      embeds: [
        new EmbedBuilder()
          .setTitle(`**${this.mcServer.serverIp}**`)
          .setColor(
            this.mcServer.playerList.length === 0 ? '#ee5253' : '#1dd1a1'
          )
          .setAuthor({ name: 'Player List Updated!', iconURL: this.iconUrl })
          .setDescription(this.mcServer.description)
          // .setThumbnail(favicon.toString())
          // .setThumbnail()
          .addFields({
            name: `**Current Active Users** - ${onlinePlayers}/${maxPlayers}`,
            value: usersString,
          })
          .setImage(Helper.randomArrayElement(Assets.previewImages))
          .setFooter({
            text: `Last Updated: ${Helper.format12HourDate(
              new Date(this.mcServer.lastUpdated)
            )}`,
            iconURL: this.iconUrl,
          }),

        // new MessageEmbed()
        //   .setTitle(`**${this.mcServer.serverIp}**`)
        //   .setColor(
        //     this.mcServer.playerList.length === 0 ? '#ee5253' : '#1dd1a1'
        //   )
        //   .setAuthor('Player List Updated!', this.iconUrl)
        //   .setDescription(this.mcServer.description)
        //   .setThumbnail(favicon.toString())
        //   .addFields({
        //     name: `**Current Active Users** - ${onlinePlayers}/${maxPlayers}`,
        //     value: usersString,
        //   })
        //   .setImage(Helper.randomArrayElement(Assets.previewImages))
        //   .setFooter(
        //     `Last Updated: ${Helper.format12HourDate(
        //       new Date(this.mcServer.lastUpdated)
        //     )}`,
        //     this.iconUrl
        //   ),
      ],
    };

    if (typeof favicon === 'object') {
      embed.files = [{ attachment: favicon, name: 'favicon.png' }];
      embed.embeds[0].setThumbnail('attachment://favicon.png');
    }
    return embed;
  }

  getFavicon(): string | Buffer | AttachmentBuilder {
    if (!this.mcServer.favicon.includes('base64')) return this.mcServer.favicon;
    return new AttachmentBuilder(this.mcServer.favicon, {
      name: 'favicon.png',
    });
  }
}

type DiscordMessageEmbed = {
  embeds: EmbedBuilder[];
  files?: { attachment: Buffer | AttachmentBuilder; name: string }[];
};

export default Webhook;
