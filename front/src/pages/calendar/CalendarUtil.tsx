import {ItemsData, DayData} from './style';

export const timeToString = (time: number | null) => {
  const date = time ? new Date(time) : new Date();
  return date.toISOString().split('T')[0];
}; // YYYY-MM-DD

export const dateFormat = (date?: string) => {
  const currentDate = date
    ? new Date(date).getTime() - new Date().getTimezoneOffset() * 60000
    : new Date().getTime() - new Date().getTimezoneOffset() * 60000;
  return timeToString(currentDate);
};

export const loadItems = (
  day: DayData,
  setItems: React.Dispatch<React.SetStateAction<ItemsData>>,
  data: any,
): void => {
  const newItems: ItemsData = {};
  const startDate = new Date(day.timestamp);
  const endDate = new Date(day.timestamp + 10 * 24 * 60 * 60 * 1000);

  const formatDate = (date: string) => dateFormat(date); // dateFormat 함수로 날짜 형식 일치시킴

  for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
    const time = formatDate(String(date));

    if (!newItems[time]) {
      newItems[time] = [];
      const calendarData = data.filter((item: any) => formatDate(item.startAt) === time); // formatDate로 형식 일치시킴
      calendarData.forEach((item: any) => {
        newItems[time].push({
          id: item.calendarId,
          name: item.title,
          height: 0,
          day: formatDate(item.startAt), // formatDate로 형식 일치시킴
          complete: item.complete,
          color: item.tag.color,
          startAt: item.startAt.split(' ')[1].slice(0, 5),
          endAt: item.endAt.split(' ')[1].slice(0, 5),
          board: item.tag.name,
          content: item.content,
          period: item.period,
          alerts: item.alerts,
        });
      });
    }
  }

  setItems(newItems);
};
