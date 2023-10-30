import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {variables} from '../../style/variables';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

interface onLoginProps {
  onLogin: (id: string, token: string) => void;
  onError: (error: string) => void;
}

const Oauth2: React.FC<onLoginProps> = ({onLogin, onError}) => {
  const GoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const userInfo = await GoogleSignin.signIn();
      console.log('Google Sign-In Success:', userInfo);
    } catch (error) {
      console.log('Google Sign-In Error:', error);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '886031261795-u8dfvcjm836g9oiet9ilvd2u7m3f3bdp.apps.googleusercontent.com',
    });
  }, []);

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
        <TouchableOpacity onPress={GoogleSignIn}>
          <Image source={require('front/assets/image/google_login.png')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={KakaoSignIn}>
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
