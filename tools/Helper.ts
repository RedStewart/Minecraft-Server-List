class Helper {
  static sleep(ms: number): Promise<any> {
    return new Promise<any>((resolve) => setTimeout(resolve, ms));
  }

  static randomArrayElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  static format12HourDate(date: Date): string {
    let day: number = date.getDate(),
      month: number = date.getMonth() + 1,
      year: number = date.getFullYear();

    let hours: number = date.getHours();
    let minutes: number = date.getMinutes();
    let seconds: number = date.getSeconds();
    let milliseconds: number = date.getMilliseconds();
    const ampm: string = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    // minutes = minutes < 10 ? parseInt('0' + minutes) : minutes;

    if (hours.toString().length === 1) hours = parseInt(`0${hours}`);
    if (minutes.toString().length === 1) minutes = parseInt(`0${minutes}`);
    if (seconds.toString().length === 1) seconds = parseInt(`0${seconds}`);
    if (day.toString().length === 1) day = parseInt(`0${day}`);
    if (month.toString().length === 1) month = parseInt(`0${month}`);

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
  }
}

export default Helper;
