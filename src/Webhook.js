const { MessageEmbed } = require('discord.js');
const Assets = require('../config/Assets.json');
const Helper = require('../tools/Helper');

class Webhook {
  constructor(channel, mcServer) {
    this.channel = channel;
    this.mcServcer = mcServer;
    this.iconUrl =
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/71c6fceb-a2b9-4ccb-9af4-387c330f23e5/d4j5vy7-b3e8d628-ced2-4c4a-89c4-bb1e3fa953dd.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzcxYzZmY2ViLWEyYjktNGNjYi05YWY0LTM4N2MzMzBmMjNlNVwvZDRqNXZ5Ny1iM2U4ZDYyOC1jZWQyLTRjNGEtODljNC1iYjFlM2ZhOTUzZGQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.5YmIy5ClmnCQOeF5HxVCXxouwkLvgKvFPp4EueJCyqw';
  }

  async sendWebhook(type = 'update') {
    switch (type) {
      case 'new':
        return await this.channel.send(this.getWebhookFormat());

      case 'update':
        return await this.embedMessage.edit(this.getWebhookFormat());

      default:
        break;
    }
  }

  getWebhookFormat() {
    const usersString =
      this.mcServcer.playerList.length > 0
        ? `🟢 ${this.mcServcer.playerList.join('\n🟢 ')}`
        : '🔴 No Users Online';

    return {
      embeds: [
        new MessageEmbed()
          .setTitle(`**${this.mcServcer.serverIp}**`)
          .setColor(
            this.mcServcer.playerList.length === 0 ? '#ee5253' : '#1dd1a1'
          )
          .setAuthor('Player List Updated!', this.iconUrl)
          .setDescription(this.mcServcer.description)
          .setThumbnail(this.mcServcer.icon)
          .addFields({
            name: `**Current Active Users** - ${this.mcServcer.playerList.length}/${this.mcServcer.maxUsers}`,
            value: usersString
          })
          .setImage(Helper.randomArrayElement(Assets.previewImages))
          .setFooter(
            `Last Updated: ${Helper.format12HourDate(
              new Date(this.mcServcer.lastUpdated)
            )}`,
            this.iconUrl
          )
      ]
    };
  }
}

module.exports = Webhook;
