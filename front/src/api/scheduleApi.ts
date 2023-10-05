import axios, {AxiosError} from 'axios';
import {ApiResponseData, ScheduleData, convertResponseData} from '../util/dataConvert';
import {format} from 'date-fns';

type ScheduleItems = Record<string, ScheduleData[]>;

export const fetchScheduleItems = async (url: string, token: string): Promise<ScheduleItems> => {
  try {
    const response = await axios.get(`${url}api/v1/schedule`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    console.log('Server Response:', response.data.body.data);
    const fetchedData = response.data.body.data;
    const newItems: ScheduleItems = {};

    fetchedData.forEach((item: ApiResponseData) => {
      const convertedData: ScheduleData = convertResponseData(item);
      const dateKey = format(new Date(convertedData.startAt), 'yyyy-MM-dd');
      if (!newItems[dateKey]) {
        newItems[dateKey] = [];
      }
      newItems[dateKey].push(convertedData);
    });
    console.log('newItems: ', newItems);
    return newItems;
  } catch (error) {
    throw error as AxiosError;
  }
};

export const deleteScheduleItem = async (url: string, token: string, scheduleId: number) => {
  try {
    const response = await axios.delete(`${url}api/v1/schedule/${scheduleId}`, {
      headers: {Authorization: `Bearer ${token}`},
    });

    if (response.status === 200) {
      console.log('스케줄 삭제!');
    } else {
      return false;
    }
  } catch (error) {
    console.error('스케줄 삭제 실패:', error);
    return false;
  }
};

export const patchScheduleItem = async (
  url: string,
  token: string,
  scheduleId: number,
  data: any,
) => {
  try {
    await axios.patch(`${url}/api/v1/schedule/${scheduleId}`, data, {
      headers: {Authorization: `Bearer ${token}`},
    });
    console.log('스케줄 완료여부 변경!');
  } catch (error) {
    console.error('스케줄 완료여부 변경 실패: ', error);
    return false;
  }
};
