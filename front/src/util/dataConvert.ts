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

export type BoardItem = {
  tagId: number;
  name: string;
  color: string;
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
};

export interface SearchData {
  keyword: string;
  startAt: string;
  endAt: string;
}

const convertResponseData = (resData: ScheduleData) => {
  const {scheduleId, title, content, period, startAt, endAt, alerts, modifiedAt, complete, tag} =
    resData;

  const calendarData: ScheduleData = {
    scheduleId,
    title,
    complete,
    startAt,
    endAt,
    modifiedAt,
    content,
    period,
    alerts,
    tag,
  };

  return calendarData;
};

export {convertResponseData};
