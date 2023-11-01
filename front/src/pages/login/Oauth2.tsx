import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {variables} from '../../style/variables';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {userAPI} from '../../api/commonApi';
interface onLoginProps {
  onLogin: (token: string, providerType: string) => void;
  onError: (error: string) => void;
}

const Oauth2: React.FC<onLoginProps> = ({onLogin, onError}) => {
  const oauthLogin = async (providerType: 'GOOGLE' | 'KAKAO') => {
    try {
      if (providerType === 'GOOGLE') {
        const userInfo = await GoogleSignin.signIn();
        oauthLogin2(userInfo.user.id, providerType);
      } else {
        const kakaoLogin = await KakaoLogin.login();
        const profile = await KakaoLogin.getProfile();
        oauthLogin2(profile.id, providerType);
      }
    } catch (error) {
      onError(`${providerType.toLowerCase()} 로그인에 실패했습니다.`);
    }
  };

  const oauthLogin2 = (userId: string, providerType: 'GOOGLE' | 'KAKAO') => {
    userAPI
      .post(`/auth/oauth`, {userId, providerType})
      .then(res => onLogin(res.data.body.token, providerType))
      .catch(error => onError(`${providerType.toLowerCase()} 로그인에 실패했습니다.`));
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '886031261795-u8dfvcjm836g9oiet9ilvd2u7m3f3bdp.apps.googleusercontent.com',
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.partition} />
        <Text style={styles.text}>다음 계정으로 로그인 / 회원가입</Text>
        <View style={styles.partition} />
      </View>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => oauthLogin('GOOGLE')}>
          <Image source={require('front/assets/image/google_login.png')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => oauthLogin('KAKAO')}>
          <Image source={require('front/assets/image/kakao_login.png')} style={styles.logo} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Oauth2;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  partition: {
    flex: 1,
    marginRight: 2,
    marginLeft: 2,
    height: 0.6,
    backgroundColor: variables.line_1,
  },
  text: {
    marginRight: 6,
    marginLeft: 6,
    fontFamily: variables.font_4,
    fontSize: 14,
    color: variables.text_4,
  },
  logo: {
    marginRight: 8,
    marginLeft: 8,
    width: 50,
    height: 50,
  },
});
