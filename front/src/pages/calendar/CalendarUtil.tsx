import {ItemProps, ItemsData, MarkedDate} from './style';

export const today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
  .toISOString()
  .split('T')[0]; // 오늘 날짜

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

export const loadItems = (day: any, setItems: any, items: any, data: any) => {
  const newItems: ItemsData = {};

  for (let i = 0; i < 19; i++) {
    const time = dateFormat(day.timestamp + i * 24 * 60 * 60 * 1000);

    if (!newItems[time]) {
      newItems[time] = [];
      const calendarData = data.filter((item: any) => dateFormat(item.startAt) === time);
      calendarData.forEach((item: any) => {
        newItems[time].push({
          id: item.calendarId,
          name: item.title,
          height: 0,
          day: dateFormat(item.startAt),
          complete: item.complete,
          color: item.tag.color,
          startAt: item.startAt.split(' ')[1].slice(0, 5),
          endAt: item.endAt.split(' ')[1].slice(0, 5),
        });
      });
    }
  }

  setItems(newItems);
};

export const toggleComplete = (day: string, setItems: any, itemId?: number) => {
  setItems((prevItems: any) => {
    const updatedItems = prevItems[day].map((item: any) => {
      if (item.id === itemId) {
        return {...item, complete: !item.complete};
      }
      return item;
    });
    return {...prevItems, [day]: updatedItems};
  });
};
