export interface ApiResponseData {
  calendarId: number;
  title: string;
  content: string;
  period: string;
  startAt: string;
  endAt: string;
  alerts: [];
  createdAt: string;
  modifiedAt: string;
  complete: boolean;
  tag: {
    name: string;
    color: string;
  };
}

export interface ScheduleData {
  calendarId: number;
  name: string;
  height: number;
  day: string;
  complete: boolean;
  startAt: string;
  endAt: string;
  content: string;
  period: string;
  alerts: number[];
  modifiedAt: string;
  tag: {
    name: string;
    color: string;
  };
}

const dateCache: {[key: string]: string} = {}; // 날짜 포맷 결과를 저장할 캐시 객체

const dateFormat = (dateString: string) => {
  if (dateCache[dateString]) {
    // 캐시에 저장된 결과가 있으면 캐시된 결과를 반환
    return dateCache[dateString];
  } else {
    // 캐시에 결과가 없으면 새로 계산하고 캐시에 저장
    const formattedDate = new Date(
      new Date(dateString).getTime() - new Date().getTimezoneOffset() * 60000,
    )
      .toISOString()
      .split('T')[0];
    dateCache[dateString] = formattedDate; // 결과를 캐시에 저장
    return formattedDate;
  }
};

const convertResponseData = (resData: ApiResponseData) => {
  const {
    calendarId,
    title,
    content,
    period,
    startAt,
    endAt,
    alerts,
    createdAt,
    modifiedAt,
    complete,
    tag,
  } = resData;

  const calendarData: ScheduleData = {
    calendarId,
    name: title,
    height: 0,
    day: dateFormat(createdAt), // formatDate로 형식 일치시킴
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

export {convertResponseData, dateFormat};
