import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, Platform} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import auth from '@react-native-firebase/auth';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import Config from 'react-native-config';
import {userAPI} from '../../api/commonApi';
import {variables} from '../../style/variables';

interface onLoginProps {
  onLogin: (token: string) => void;
  onError: (error: string) => void;
}

const Oauth2: React.FC<onLoginProps> = ({onLogin, onError}) => {
  const socialLogin = async (providerType: 'GOOGLE' | 'KAKAO' | 'APPLE') => {
    try {
      if (providerType === 'GOOGLE') {
        const userInfo = await GoogleSignin.signIn();
        postId(userInfo.user.id, providerType);
      } else if (providerType === 'KAKAO') {
        await KakaoLogin.login();
        const profile = await KakaoLogin.getProfile();
        postId(`${profile.id}`, providerType);
      } else if (providerType === 'APPLE') {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });
        if (!appleAuthRequestResponse.identityToken) {
          throw new Error('Apple Sign-In failed - no identify token returned');
        }
        const {identityToken, nonce} = appleAuthRequestResponse;

        const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
        const userCredential = await auth().signInWithCredential(appleCredential);
        console.log('Firebase User ID:', userCredential.user.uid);
        postId(`${userCredential.user.uid}`, providerType);
      }
    } catch (error: any) {
      console.log(error);
      onError(`${providerType.toLowerCase()} 인증서버 로그인에 실패했습니다.`);
    }
  };
  const postId = async (userId: string, providerType: 'GOOGLE' | 'KAKAO' | 'APPLE') => {
    try {
      const res = await userAPI.post(`auth/oauth`, {userId, providerType});
      const {token} = res.data.body;
      onLogin(token);
    } catch (error) {
      onError(`${providerType.toLowerCase()} 토큰 전달에 실패했습니다.`);
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
          <Image source={require('../../../assets/image/google_login.png')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => socialLogin('KAKAO')}>
          <Image source={require('../../../assets/image/kakao_login.png')} style={styles.logo} />
        </TouchableOpacity>
        {Platform.OS === 'ios' && (
          <TouchableOpacity onPress={() => socialLogin('APPLE')}>
            <Image source={require('../../../assets/image/apple_login.png')} style={styles.logo} />
          </TouchableOpacity>
        )}
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
