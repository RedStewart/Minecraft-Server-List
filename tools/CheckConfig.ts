import Config from '../config/Config.json';
import Logger from './CustomLogger';

const CheckConfig = (): void => {
  let errArr: string[] = [];

  if (!Config.serverIp)
    errArr.push('Please input a Server IP in the Config.json file');
  if (!Config.discord.serverName)
    errArr.push('Please input a Server Name in the Config.json file');
  if (!Config.discord.channelName)
    errArr.push('Please input a Channel Name in the Config.json file');
  if (!Config.discord.botSecretToken)
    errArr.push(
      'Please input a Discord Bot Secret Token in the Config.json file'
    );

  if (errArr.length > 0) {
    errArr.forEach((msg: string): void => Logger.error(msg));
    process.exit();
  }
};

export default CheckConfig;
