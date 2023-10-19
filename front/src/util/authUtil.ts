import AsyncStorage from '@react-native-async-storage/async-storage';

//! 아이디 유효성 검사
const isIdValid = (text: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);

//! 비밀번호 유효성 검사
const isPasswordValid = (text: string) =>
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]:;'"<>,.?/\\|]).{8,}$/.test(text);

//! 이메일 유효성 검사
const isEmaildValid = (text: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);

//! 생년월일 유효성 검사
const isBirthValid = (text: string) => {
  if (text.length !== 8) return false;

  const year = parseInt(text.slice(0, 4), 10);
  const month = parseInt(text.slice(4, 6), 10);
  const day = parseInt(text.slice(6, 8), 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) return false;

  if (year < 1900 || year > new Date().getFullYear()) return false;
  if (month < 1 || month > 12) return false;

  const lastDayOfMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > lastDayOfMonth) return false;

  return true;
};

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

//! 유효성검사 모음
const validErrorMessage = {
  password: (input: string) => {
    if (!isPasswordValid(input) && input.length > 0)
      return '영문, 숫자 ,특수문자를 1개 이상 포함한 8자리 이상 비밀번호를 입력하세요.';
  },
  comparePassword: (input: string, compare: string) => {
    if (input !== compare && input.length > 0) return '비밀번호가 일치하지 않습니다.';
  },
  birth: (input: string) => {
    if (!isBirthValid(input) && input.length > 0) return '유효한 생년월일 8자리를 입력하세요.';
  },
  email: (input: string) => {
    if (!isEmaildValid(input) && input.length > 0) return '유효하지 않은 이메일입니다.';
  },
  verifyKey: '유효하지 않은 인증번호입니다.',
};

export {
  isIdValid,
  isPasswordValid,
  isEmaildValid,
  isBirthValid,
  storageGetValue,
  storageSetValue,
  storageDeleteValue,
  storageResetValue,
  validErrorMessage,
};
