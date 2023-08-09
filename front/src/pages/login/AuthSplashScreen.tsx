import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {AuthProps} from '../../navigations/StackNavigator';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStorageValue = async (key: string) => {
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

export const responseToken = (res: string[]) => {
  const resultObject: Record<string, string> = {};
  res.forEach(item => {
    const [key, value] = item.split(': ');
    resultObject[key] = value;
  });
  return resultObject;
};

const AuthSplashScreen: React.FC<AuthProps> = props => {
  //? 첫 실행 시 동작
  const verifyTokens = async ({navigation, url}: any) => {
    const token = await getStorageValue('tokens');
    const saveEmail = await getStorageValue('saveEmail');
    //
    if (token === null || saveEmail === null) {
      navigation.reset({routes: [{name: 'Login'}]});
    }
    // 로컬 스토리지에 Token데이터가 있으면 -> 토큰들을 헤더에 넣어 검증
    else {
      try {
        navigation.navigate('MainTab');
      } catch (error: any) {
        console.log(error);
        navigation.reset({routes: [{name: 'Login'}]});
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      verifyTokens(props);
    }, 1000);

    return () => {
      clearTimeout(timer); // 컴포넌트가 언마운트되면 타이머 정리
    };
  }, []);

  return (
    <LinearGradient
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      start={{x: 0, y: 0}}
      end={{x: 0.6, y: 0.6}}
      colors={['#FEA97A', '#FF5789']}>
      <Image
        source={require('front/assets/image/logo_white.png')}
        style={{
          width: 180,
          height: 80,
          marginBottom: 30,
        }}
      />
    </LinearGradient>
  );
};

export default AuthSplashScreen;
