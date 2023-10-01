import axios from 'axios';

export const fetchBoardData = async (url: string, token: string) => {
  try {
    const response = await axios.get(`${url}api/v1/tags`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.body.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
