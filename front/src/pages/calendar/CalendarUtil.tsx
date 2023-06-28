export const today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
  .toISOString()
  .split('T')[0]; // 오늘 날짜

export const timeToString = (time: number) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}; // YYYY-MM-DD

export const dateFormat = (date?: string) => {
  const currentDate = date
    ? new Date(date).getTime() - new Date().getTimezoneOffset() * 60000
    : new Date().getTime() - new Date().getTimezoneOffset() * 60000;
  return timeToString(currentDate);
};
