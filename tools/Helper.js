class Helper {
  static sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static randomArrayElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  static format12HourDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let milliseconds = date.getMilliseconds();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;

    if (hours.toString().length === 1) hours = `0${hours}`;
    if (day.toString().length === 1) day = `0${day}`;
    if (month.toString().length === 1) month = `0${month}`;

    let strTime = `${day}/${month}/${year} ${hours}:${minutes}:${milliseconds} ${ampm}`;
    return strTime;
  }
}

module.exports = Helper;
