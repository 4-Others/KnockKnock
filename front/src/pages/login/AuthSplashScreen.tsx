import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {AuthProps} from '../../navigations/StackNavigator';
import LinearGradient from 'react-native-linear-gradient';
import {storageGetValue} from '../../util/authUtil';
import {useDispatch} from 'react-redux';
import {setUserId, setToken} from '../../util/redux/userSlice';

const AuthSplashScreen: React.FC<AuthProps> = props => {
  //? 첫 실행 시 동작
  const dispatch = useDispatch();
  const verifyTokens = async ({navigation}: any) => {
    // 메모리에 저장된 토큰 호출
    const user = await storageGetValue('user');
    if (user) {
      const {accessToken, refreshToken, userId} = user;
      dispatch(setToken({accessToken, refreshToken}));
      dispatch(setUserId(userId));
      // 로그인 성공 후 메인탭 이동
      navigation.navigate('MainTab');
    } else {
      // 로그인 실패 -> 재로그인
      // navigation.reset({routes: [{name: 'Login'}]});
      navigation.navigate('Login');
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
