import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {AuthProps} from '../../navigations/StackNavigator';
import LinearGradient from 'react-native-linear-gradient';
import {storageGetValue} from '../../util/authUtil';
import {useDispatch} from 'react-redux';
import {setLogin} from '../../util/redux/userSlice';
import {userAPI} from '../../api/commonApi';

const AuthSplashScreen: React.FC<AuthProps> = ({navigation}) => {
  const dispatch = useDispatch();

  const onLogin = async (token: string) => {
    try {
      const res = await userAPI.get('users', token);
      const {userId, birth, id, email, providerType, pushAgree, username} = res.data.body.data;
      dispatch(setLogin({token, userId, birth, id, email, providerType, pushAgree, username}));
      navigation.navigate('MainTab');
    } catch (error) {
      navigation.navigate('Login');
    }
  };
  const verifyTokens = async () => {
    // 메모리에 저장된 토큰 호출
    const initialToken = await storageGetValue('token');
    if (initialToken) {
      const {token} = initialToken;
      onLogin(token);
    } else {
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      setTimeout(() => {
        verifyTokens();
      }, 1000);
    });
  }, [navigation]);

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
