const chalk = require('chalk');

class CustomLogger {
  static log(msg: string): void {
    return console.log(`${chalk.cyanBright(this.logTime())} ${msg}`);
  }

  static warn(msg: string): void {
    return console.log(
      `${chalk.yellowBright(this.logTime())} ${chalk.yellowBright(
        '[WARNING]'
      )} ${msg}`
    );
  }

  static error(msg: string): void {
    return console.log(
      `${chalk.redBright(this.logTime())} ${chalk.redBright('[ERROR]')} ${msg}`
    );
  }

  static logTime(): string {
    let date = new Date();
    let h = this.formatTime(date.getHours(), 2);
    let m = this.formatTime(date.getMinutes(), 2);
    let s = this.formatTime(date.getSeconds(), 2);
    let ms = this.formatTime(date.getMilliseconds(), 3);
    return `[${h}:${m}:${s}:${ms}]`;
  }

  static formatTime(num: number, paddingCount: number): string {
    let timeFormat: string = num.toString();
    while (num.toString().length < paddingCount) {
      timeFormat = '0' + timeFormat;
    }
    return timeFormat;
  }
}

module.exports = CustomLogger;
