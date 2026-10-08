const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function dayMonth(date) {
  return `${MONTHS[date.getMonth()]} ${date.getDate()}`;
}

export function weekday(date) {
  return DAYS[date.getDay()];
}
