import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {AuthProps} from '../../navigations/StackNavigator';
import {variables} from '../../style/variables';
import axios from 'axios';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import * as KakaoLogin from '@react-native-seoul/kakao-login';

const Oauth2: React.FC<any> = ({navigation}) => {
  const OauthSignIn = (provider: string) => {
    navigation.navigate('Redirect', {params: `${provider}`});
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.partition} />
        <Text style={styles.text}>다음 계정으로 로그인 / 회원가입</Text>
        <View style={styles.partition} />
      </View>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => OauthSignIn('google')}>
          <Image source={require('front/assets/image/google_login.png')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => OauthSignIn('kakao')}>
          <Image source={require('front/assets/image/kakao_login.png')} style={styles.logo} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const OauthRedirectScreen: React.FC<AuthProps> = ({navigation, url, route}) => {
  console.log('route:', route);
  return (
    <WebView
      source={{uri: `${url}oauth2/authorization/${route.params.params}`}}
      userAgent="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36"
    />
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
