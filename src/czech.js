const DAYS = ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'];

export function dayMonth(date) {
  return `${date.getDate()}. ${date.getMonth() + 1}.`;
}

export function dateLine(date) {
  return `${DAYS[date.getDay()]} ${dayMonth(date)} ${date.getFullYear()}`;
}
