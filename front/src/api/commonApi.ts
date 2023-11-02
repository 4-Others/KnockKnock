import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {
  SetScheduleData,
  convertScheduleData,
  convertTagData,
  SetBoardData,
} from '../util/dataConvert';

type KeyData = Record<string, any>;

const apiClient = axios.create({
  baseURL: Config.API_APP_KEY,
});

const refreshTokenAPI = async (token: string) => {
  try {
    const res = await axios.post('auth/refresh', {headers: {Authorization: `Bearer ${token}`}});
    const {token: newToken} = res.data.body;
    return newToken;
  } catch (error) {
    throw error as AxiosError;
  }
};

apiClient.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response?.status === 401 && error.config && !error.config.__isRetryRequest) {
      error.config.__isRetryRequest = true;
      try {
        console.log(error.config.headers.Authorization);
        const newAccessToken = await refreshTokenAPI(error.config.headers.Authorization);
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(error.config);
      } catch (error) {
        throw error as AxiosError;
      }
    }
    throw error;
  },
);

//? 회원가입, 로그인 관련 api 모두 요청 가능
const userAPI = {
  get: async (url: string, token: string) => {
    try {
      const res = await apiClient.get(url, {headers: {Authorization: `Bearer ${token}`}});
      return res;
    } catch (error: any) {
      throw error as AxiosError;
    }
  },
  post: async (url: string, data?: KeyData, option?: KeyData) => {
    try {
      const res = await apiClient.post(url, data, option);
      return res;
    } catch (error: any) {
      throw error as AxiosError;
    }
  },

  patch: async (url: string, token: string, data: KeyData) => {
    try {
      const res = await apiClient.patch(url, data, {headers: {Authorization: `Bearer ${token}`}});
      return res;
    } catch (error: any) {
      throw error as AxiosError;
    }
  },
  delete: async (url: string, token: string) => {
    try {
      const res = await apiClient.delete(url, {headers: {Authorization: `Bearer ${token}`}});
      return res;
    } catch (error: any) {
      throw error as AxiosError;
    }
  },
};

//? 기존 API 그대로 가져다가 적용 (서버데이터 변환하는 함수만 모듈로 빼서 가져옴)
//! 전부 로그인 시 동작하기 때문에 테스트 도중 수정된 코드 저장하면 401 반환
const scheduleAPI = {
  scheduleGet: async (token: string) => {
    try {
      const response = await apiClient.get('schedule', {
        headers: {Authorization: `Bearer ${token}`},
      });
      const fetchedData = response.data.body.data;
      return convertScheduleData(fetchedData);
    } catch (error) {
      throw error as AxiosError;
    }
  },
  schedulePost: async (token: string, data: SetScheduleData) => {
    try {
      const response = await apiClient.post(`schedule`, data, {
        headers: {Authorization: `Bearer ${token}`},
      });
      return response.data;
    } catch (error) {
      throw error as AxiosError;
    }
  },
  schedulePatch: async (token: string, scheduleId: number, data: any) => {
    try {
      const response = await apiClient.patch(`schedule/${scheduleId}`, data, {
        headers: {Authorization: `Bearer ${token}`},
      });
      return response.data;
    } catch (error) {
      throw error as AxiosError;
    }
  },
  scheduleDelete: async (token: string, scheduleId: number) => {
    try {
      const response = await apiClient.delete(`schedule/${scheduleId}`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      if (response.status === 200 || response.status === 204) {
        return true;
      } else {
        console.error(`API responded with status: ${response.status}`);
        return false;
      }
    } catch (error) {
      throw error as AxiosError;
    }
  },
  tagIdScheduleGet: async (token: string, tagId: number) => {
    try {
      const response = await apiClient.get(`tags/${tagId}`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      const fetchedData = response.data.body.data.schedules;
      return convertTagData(fetchedData);
    } catch (error) {
      throw error as AxiosError;
    }
  },
  tagGet: async (token: string) => {
    try {
      const response = await apiClient.get(`tags`, {headers: {Authorization: `Bearer ${token}`}});
      return response.data.body.data;
    } catch (error) {
      throw error as AxiosError;
    }
  },
  tagPost: async (token: string, tag: SetBoardData) => {
    try {
      const response = await apiClient.post(`tags`, tag, {
        headers: {Authorization: `Bearer ${token}`},
      });
      return response.data;
    } catch (error) {
      throw error as AxiosError;
    }
  },
  tagPatch: async (token: string, tagId: number, boardData: SetBoardData) => {
    try {
      const response = await apiClient.patch(`tags/${tagId}`, boardData, {
        headers: {Authorization: `Bearer ${token}`},
      });
      return response.data;
    } catch (error) {
      throw error as AxiosError;
    }
  },
  tagdelete: async (token: string, tagId: number) => {
    try {
      const response = await apiClient.delete(`tags/${tagId}`, {
        headers: {Authorization: `Bearer ${token}`},
      });
      if (response.status === 200 || response.status === 204) {
        return true;
      } else {
        console.error(`API responded with status: ${response.status}`);
        return false;
      }
    } catch (error) {
      return false;
    }
  },
  notificationGet: async (token: string) => {
    try {
      const res = await apiClient.get('notification', {
        headers: {Authorization: `Bearer ${token}`},
      });
      const resData = res.data.body.data;
      if (res.status === 200) {
        return resData.sort();
      }
    } catch (error) {
      throw error as AxiosError;
    }
  },
  notificationDelete: async (token: string, notificationIds: number[]) => {
    try {
      const res = await apiClient.delete('notification', {
        headers: {Authorization: `Bearer ${token}`},
        data: {notificationIds},
      });
      return res.status;
    } catch (error) {
      throw error as AxiosError;
    }
  },
  searchGet: async (token: string, params: KeyData) => {
    try {
      const res = await apiClient.get('schedule/search', {
        headers: {Authorization: `Bearer ${token}`},
        ...params,
      });
      const fetchedData = res.data.body.data;
      return convertScheduleData(fetchedData);
    } catch (error) {
      throw error as AxiosError;
    }
  },
};

export {scheduleAPI, userAPI};
