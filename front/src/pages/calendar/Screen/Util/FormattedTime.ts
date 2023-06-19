export const formattedTime = (time: Date): string => {
  return `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(
    2,
    '0',
  )}`;
};
