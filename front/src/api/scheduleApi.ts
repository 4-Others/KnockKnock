import axios, {AxiosError} from 'axios';
import {ApiResponseData, ScheduleData, convertResponseData} from '../util/dataConvert';
import {format} from 'date-fns';

type ScheduleItems = Record<string, ScheduleData[]>;

export const fetchScheduleItems = async (url: string, token: string): Promise<ScheduleItems> => {
  try {
    const response = await axios.get(`${url}api/v1/schedule/tag?tagName=전체`, {
      headers: {Authorization: `Bearer ${token}`},
    });
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

    return newItems;
  } catch (error) {
    throw error as AxiosError;
  }
};
