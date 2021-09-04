const chalk = require('chalk');

class Logger {
  static log(msg) {
    console.log(`${chalk.cyanBright(this.logTime())} ${msg}`);
  }

  static warn(msg) {
    console.log(
      `${chalk.yellowBright(this.logTime())} ${chalk.yellowBright(
        '[WARNING]'
      )} ${msg}`
    );
  }

  static error(msg) {
    console.log(
      `${chalk.redBright(this.logTime())} ${chalk.redBright('[ERROR]')} ${msg}`
    );
  }

  static logTime() {
    let date = new Date();
    let h = this.formatTime(date.getHours(), 2);
    let m = this.formatTime(date.getMinutes(), 2);
    let s = this.formatTime(date.getSeconds(), 2);
    let ms = this.formatTime(date.getMilliseconds(), 3);
    return (date = `[${h}:${m}:${s}:${ms}]`);
  }

  static formatTime(x, n) {
    while (x.toString().length < n) {
      x = '0' + x;
    }
    return x;
  }
}

module.exports = Logger;
