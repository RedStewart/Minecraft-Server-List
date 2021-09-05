# Minecraft-Server-List

DiscordJS bot that displays active Users on a Minecraft server using the [minecraft-server-util](https://www.npmjs.com/package/minecraft-server-util) package. Due to how this package is setup only a maximum of 10 players will be shown on the list which makes it great for smaller servers (number of online players will be accurate).

To run the bot it's required to fill out the fields in the Config.json file with the following inputs:

- **serverIp** - The IP address of the server you wish to monitor.
- **delay** - Delay in milliseconds between each player list check. 30-60 seconds (30000 - 60000) is recommended to prevent the risk of a 429 status.
- **discord.serverName** - Name of the Discord server you wish the bot to be active in.
- **discord.channelName** - Name of the server channel you wish for the bot to post in. (Please note if the Server name is incorrect or the Channel name does not exist in the Server provided the bot will throw an error and exit).
- **discord.botSecretToken** - Secret Bot token created in the Discord Developer Portal.
- **discord.deleteAllMessages** - Setting this to true will delete all the messages in the specified server channel before posting the player list. By default this is set to false.

It is recommended to run this on a server as a [PM2](https://pm2.keymetrics.io/) process using the 'npm run start' script.
