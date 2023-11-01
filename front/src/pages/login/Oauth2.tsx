import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {variables} from '../../style/variables';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {userAPI} from '../../api/commonApi';
import Config from 'react-native-config';

interface onLoginProps {
  onLogin: (token: string) => void;
  onError: (error: string) => void;
}

const Oauth2: React.FC<onLoginProps> = ({onLogin, onError}) => {
  const socialLogin = async (providerType: 'GOOGLE' | 'KAKAO') => {
    try {
      if (providerType === 'GOOGLE') {
        const userInfo = await GoogleSignin.signIn();
        postId(userInfo.user.id, providerType);
      } else {
        const kakaoLogin = await KakaoLogin.login();
        const profile = await KakaoLogin.getProfile();
        postId(profile.id, providerType);
      }
    } catch (error) {
      onError(`${providerType.toLowerCase()} 로그인에 실패했습니다.`);
    }
  };
  const postId = async (userId: string, providerType: 'GOOGLE' | 'KAKAO') => {
    try {
      const res = await userAPI.post(`auth/oauth`, {userId, providerType});
      const {token} = res.data.body;
      onLogin(token);
    } catch (error) {
      onError(`${providerType.toLowerCase()} 로그인에 실패했습니다.`);
    }
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Config.API_GOOGLE_ID,
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
        <TouchableOpacity onPress={() => socialLogin('GOOGLE')}>
          <Image source={require('front/assets/image/google_login.png')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => socialLogin('KAKAO')}>
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
