import chalk from "chalk";

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
    let date: Date = new Date();
    const h: string = this.formatTime(date.getHours(), 2),
      m: string = this.formatTime(date.getMinutes(), 2),
      s: string = this.formatTime(date.getSeconds(), 2),
      ms: string = this.formatTime(date.getMilliseconds(), 3);
    return `[${h}:${m}:${s}:${ms}]`;
  }

  static formatTime(num: number, paddingCount: number): string {
    let timeFormat: string = num.toString();
    while (timeFormat.length < paddingCount) {
      timeFormat = '0' + timeFormat;
    }
    return timeFormat;
  }
}

export default CustomLogger;
