import {ScheduleItems} from './redux/scheduleSlice';
import format from 'date-fns/format';

export interface ScheduleData {
  scheduleId: number;
  title: string;
  complete: boolean;
  startAt: string;
  endAt: string;
  content: string;
  period: string;
  alerts: number[];
  createdAt?: string;
  modifiedAt?: string;
  tag: {
    name: string;
    color: string;
    tagId?: number;
  };
}

export interface SetScheduleData {
  title: string;
  content: string;
  period: string;
  startAt: string;
  endAt: string;
  alerts: number[];
  complete: boolean;
  tagId?: number;
  name?: string;
}

export type ScheduleWithTagResponse = {
  header: {
    code: number;
    message: string;
  };
  body: {
    data: {
      tagId: number;
      name: string;
      color: string;
      schedules: ScheduleData;
    };
  };
};

export type BoardItem = {
  name: string;
  color: string;
  tagId: number;
  scheduleCount: number;
};

export type BoardData = {
  tag: {
    name: string;
    color: string;
    tagId?: number;
  };
};

export type SetBoardData = {
  name: string;
  color: string;
  tagId?: number;
  scheduleCount?: number;
};

export interface SearchData {
  keyword: string;
  startAt: string;
  endAt: string;
}

export const convertScheduleData = (res: ScheduleData[]) => {
  const newItems: ScheduleItems = {};

  res.forEach((item: ScheduleData) => {
    if (item.tag === null) {
      item.tag = {
        name: '전체',
        color: '#757575',
        tagId: 0,
      };
    }
    const dateKey = format(new Date(item.startAt), 'yyyy-MM-dd');
    if (!newItems[dateKey]) {
      newItems[dateKey] = [];
    }
    newItems[dateKey].push(item);
  });
  return newItems;
};

export const convertTagData = (fetchedData: ScheduleData[]) => {
  const newItems: ScheduleItems = {};
  const formatDateToUnifiedFormat = (dateString: string): string => {
    return format(new Date(dateString), 'yyyy-MM-dd HH:mm:ss');
  };

  fetchedData.forEach((item: ScheduleData) => {
    item.startAt = formatDateToUnifiedFormat(item.startAt);
    item.endAt = formatDateToUnifiedFormat(item.endAt);

    const convertedData: ScheduleData = item;
    const dateKey = format(new Date(convertedData.startAt), 'yyyy-MM-dd');
    if (!newItems[dateKey]) {
      newItems[dateKey] = [];
    }
    newItems[dateKey].push(convertedData);
  });
  return newItems;
};

export {};
