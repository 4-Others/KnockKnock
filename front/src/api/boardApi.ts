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

export const patchBoardData = async (
  url: string,
  token: string,
  tagId: number,
  boardData: SetBoardData,
) => {
  try {
    const response = await axios.patch(`${url}api/v1/tags/${tagId}`, boardData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('보드 수정 성공!');
    return response.data;
  } catch (error) {
    console.error('보드 수정 실패: ', error);
    throw error;
  }
};

export const deleteBoardData = async (url: string, token: string, tagId: number) => {
  try {
    const response = await axios.delete(`${url}api/v1/tags/${tagId}`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    if (response.status === 200 || response.status === 204) {
      return true;
    } else {
      console.error(`API responded with status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error('API call failed', error);
    return false;
  }
};
