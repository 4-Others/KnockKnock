import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

type AutomaticLoginAuthType = (
  url: string | undefined,
  token: any,
  autometicLoginCheck?: boolean,
) => Promise<void>;

//? 응답받은 토큰 데이터 배열을 객체로 변환
const responseToken = (res: string[]) => {
  const resultObject: Record<string, string> = {};
  res.forEach(item => {
    const [key, value] = item.split(': ');
    resultObject[key] = value;
  });
  return resultObject;
};

//? 토큰 저장 여부를 확인
const getTokenFromLocal = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (e: any) {
    console.log(e.message);
  }
};
//? 로그인 시 동작
const AutomaticLoginAuth: AutomaticLoginAuthType = async (url, data, autometicLoginCheck) => {
  if (url !== undefined) {
    try {
      const response = await axios.post(url, data);
      const {accessToken, refreshToken} = responseToken(response.data.tokens);
      //? 토큰 정보를 수집
      if (response.status === 200) {
        AsyncStorage.setItem(
          'tokens',
          JSON.stringify({
            accessToken: accessToken,
            refreshToken: refreshToken,
          }),
        );
        //? 자동 로그인 정보 수집
        autometicLoginCheck === true ? AsyncStorage.setItem('AutomaticLogin', 'true') : null;
      }
    } catch (error: any) {
      console.log(error.response);
    }
  }
};

//? 첫 실행 시 동작
const verifyTokens = async ({navigation, url}: any) => {
  const token = await getTokenFromLocal('tokens');
  //?
  if (token === null) {
    navigation.reset({routes: [{name: 'Login'}]});
  }
  // 로컬 스토리지에 Token데이터가 있으면 -> 토큰들을 헤더에 넣어 검증
  else {
    try {
      const response = await axios.post(url, token);
      const {accessToken, refreshToken} = responseToken(response.data.tokens);
      // accessToken 만료, refreshToken 정상 -> 재발급된 accessToken 저장 후 자동 로그인
      AsyncStorage.setItem(
        'Tokens',
        JSON.stringify({
          accessToken,
          refreshToken,
        }),
      );
      navigation.navigate({routes: [{name: 'TabNavigator'}]});
    } catch (error: any) {
      const code = error.response.data.code;

      // accessToken 만료, refreshToken 만료 -> 로그인 페이지
      if (code === 401) {
        navigation.reset({routes: [{name: 'Login'}]});
      }
      // accessToken 정상, refreshToken 정상 -> 자동 로그인
      else {
        navigation.navigate({routes: [{name: 'TabNavigator'}]});
      }
    }
  }
};

export {verifyTokens, AutomaticLoginAuth};
