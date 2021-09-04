# Minecraft-Server-List

DiscordJS bot that displays active Users on a Minecraft server using the [Minecraft Server Status API](https://api.mcsrvstat.us/). Currently the API response is unfortunately cached for 10 minutes hence the monitor delay.

To run the bot it's required to fill out the fields in the Config.json file with the following inputs:

- **serverIp** - The IP address of the server you wish to monitor.
- **discord.serverName** - Name of the Discord server you wish the bot to be active in.
- **discord.channelName** - Name of the server channel you wish for the bot to post in. (Please note if the Server name is incorrect or the Channel name does not exist in the Server provided the bot will throw an error and exit)
- **discord.botSecretToken** - Secret Bot token created in the Discord Developer Portal.
