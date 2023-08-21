import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {AuthProps} from '../../navigations/StackNavigator';
import LinearGradient from 'react-native-linear-gradient';
import {storageGetValue, storageSetValue} from '../../util/authUtil';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {setUserId, setAccessToken} from '../../util/redux/userSlice';

const AuthSplashScreen: React.FC<AuthProps> = props => {
  //? 첫 실행 시 동작
  const dispatch = useDispatch();
  const verifyTokens = async ({navigation, url}: any) => {
    // 메모리에 저장된 토큰 호출
    const tokens = await storageGetValue('tokens');
    if (tokens) {
      try {
        const header = {headers: {Authorization: `Bearer ${tokens.accessToken}`}};
        //  토큰 갱신 후 저장
        const response = await axios.post(
          `${url}api/v1/users/refreshToken`,
          {refreshToken: tokens.refreshToken},
          header,
        );
        const {accessToken, refreshToken, userId} = response.data;
        await storageSetValue('tokens', {accessToken, refreshToken});
        dispatch(setAccessToken(accessToken));
        dispatch(setUserId(userId));
        // 로그인 성공 후 메인탭 이동
        navigation.navigate('MainTab');
      } catch (error) {
        console.log(error);
        // 로그인 실패 -> 재로그인
        navigation.reset({routes: [{name: 'Login'}]});
      }
    } else {
      // 로그인 실패 -> 재로그인
      navigation.reset({routes: [{name: 'Login'}]});
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      verifyTokens(props);
    }, 1000);
    // 컴포넌트가 언마운트되면 타이머 정리
    return () => {
      clearTimeout(timer);
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
