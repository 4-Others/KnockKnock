import React, {Dispatch} from 'react';
import axios, {AxiosResponse} from 'axios';

type SendRequestFunction = (
  url: string,
  data: any,
  setError?: Dispatch<number>,
  header?: any,
) => Promise<AxiosResponse | void>;

const sendRequest: SendRequestFunction = async (url, data, setError, header) => {
  try {
    const response = await axios.post(url, data, header || null);
    console.log(response);
    return response;
  } catch (error: any) {
    setError ? setError(error.request.status) : console.log(error.request.status);
  }
};

const isPasswordValid = (text: string) =>
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]:;'"<>,.?/\\|]).{8,}$/.test(text);

const isEmaildValid = (text: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);

export {sendRequest, isPasswordValid, isEmaildValid};
