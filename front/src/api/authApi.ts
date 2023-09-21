import axios from 'axios';
import Config from 'react-native-config';

type loginData = {
  id: string;
  password: string;
};

const apiClient = axios.create({
  baseURL: Config.API_APP_KEY,
});

const addAuthToken = (token: string) => {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const removeAuthToken = () => {
  delete apiClient.defaults.headers.common['Authorization'];
};

const loginPost = async (data: loginData) => {
  try {
    const res = await apiClient.post(`api/v1/auth/login`, data);
    return res.data.body.token;
  } catch (error: any) {
    throw error;
  }
};

const fetchAuthPost = async (url: string, data: any) => {
  try {
    const res = await apiClient.post(`${url}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export {loginPost, addAuthToken, removeAuthToken, fetchAuthPost};
