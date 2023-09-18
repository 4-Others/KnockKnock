import axios from 'axios';

export const refreshToken = async (url: string, token: string): Promise<string | null> => {
  try {
    const response = await axios.get(`${url}api/v1/auth/refresh`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    if (response.status === 200 && response.data) {
      return response.data.newToken;
    }
    return null;
  } catch (error) {
    throw error;
  }
};
