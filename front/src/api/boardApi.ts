import axios from 'axios';
import {SetBoardData} from '../util/dataConvert';

export const fetchBoardData = async (url: string, token: string) => {
  try {
    const response = await axios.get(`${url}api/v1/tags`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Tag response: ', response.data.body.data);
    return response.data.body.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postBoardData = async (url: string, token: string, tag: SetBoardData) => {
  try {
    const response = await axios.post(`${url}api/v1/tags`, tag, {
      headers: {Authorization: `Bearer ${token}`},
    });
    console.log('Posting tag data:', JSON.stringify(tag));
    return response.data;
  } catch (error) {
    console.error('Error posting tag:', error);
    throw error;
  }
};
