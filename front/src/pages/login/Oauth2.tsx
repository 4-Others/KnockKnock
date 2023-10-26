import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {variables} from '../../style/variables';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import {WebView} from 'react-native-webview';
import {AuthProps} from '../../navigations/StackNavigator';

GoogleSignin.configure({
  webClientId: '340169174026-hp6l0uudlrjnsiu2phk5mmf7mb91srrt.apps.googleusercontent.com',
  offlineAccess: true,
});

interface onLoginProps {
  onLogin: (id: string, token: string) => void;
  onError: (error: string) => void;
}

const Oauth2: React.FC<onLoginProps> = ({onLogin, onError}) => {
  const url = Config.API_APP_KEY;

  const sendAuthCodeToServer = async (code: string, provider: string) => {
    try {
      const response = await axios.get(`${url}oauth2/authorization/${provider}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${code}`,
        },
      });

      const data = response.data;
      if (data.token) {
        await AsyncStorage.setItem('jwt_token', data.token);
      } else {
        console.log('Error retrieving token from server');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const GoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const OauthSignIn = await GoogleSignin.signIn();
      if (OauthSignIn && OauthSignIn.serverAuthCode) {
        await sendAuthCodeToServer(OauthSignIn.serverAuthCode, 'google');
      }
    } catch (error) {
      console.log('Google Sign-In Error:', error);
    }
  };

  //!-----------------------------------------------------------------------------

  const KakaoSignIn = async () => {
    KakaoLogin.login()
      .then(result => {
        console.log('Login Success', JSON.stringify(result, null, 2));
        getProfile(result.accessToken);
      })
      .catch(error => {
        if (error.code === 'E_CANCELLED_OPERATION') {
          console.log('Login Cancel', error.message);
        } else {
          console.log(`Login Fail (code:${error.code})`, error.message);
          onError('카카오 로그인에 실패했습니다.');
        }
      });
  };

  const getProfile = async (accessToken: string) => {
    try {
      const profile = await KakaoLogin.getProfile();
      console.log('GetProfile Success', JSON.stringify(profile));

      const id = profile.id;
      onLogin(id, accessToken);
    } catch (error) {
      console.log('GetProfile Fail', error);
      onError('프로필 정보를 가져오는 데 실패했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.partition} />
        <Text style={styles.text}>다음 계정으로 로그인 / 회원가입</Text>
        <View style={styles.partition} />
      </View>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => GoogleSignIn}>
          <Image source={require('front/assets/image/google_login.png')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => KakaoSignIn}>
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
