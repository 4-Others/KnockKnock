import AsyncStorage from '@react-native-async-storage/async-storage';

//! 아이디 유효성 검사
const isIdValid = (text: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);

//! 비밀번호 유효성 검사
const isPasswordValid = (text: string) =>
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]:;'"<>,.?/\\|]).{8,}$/.test(text);

//! 이메일 유효성 검사
const isEmaildValid = (text: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);

//! AsyncStorage 데이터 접근
const storageGetValue = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (e: any) {
    console.log(e.message);
    return null;
  }
};
//! AsyncStorage 데이터 저장
const storageSetValue = async (key: string, value: any) => {
  try {
    if (value !== null) {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } else {
      return null;
    }
  } catch (e: any) {
    console.log(e.message);
    return null;
  }
};

//! AsyncStorage 데이터 삭제
const storageDeleteValue = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e: any) {
    console.log(e.message);
    return null;
  }
};

//! AsyncStorage 리셋
const storageResetValue = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e: any) {
    console.log(e.message);
    return null;
  }
};

export {
  isIdValid,
  isPasswordValid,
  isEmaildValid,
  storageGetValue,
  storageSetValue,
  storageDeleteValue,
  storageResetValue,
};
