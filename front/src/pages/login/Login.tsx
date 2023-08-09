import React, {useEffect, useState} from 'react';
import Oauth2 from './Oauth2';
import {GradientButton_L} from '../../components/GradientButton';
import {AuthProps} from '../../navigations/StackNavigator';
import {variables} from '../../style/variables';
import {View, StyleSheet, Text, Image, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import {isPasswordValid} from '../signUp/SignupUtil';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {responseToken, getStorageValue} from './AuthSplashScreen';

const Login: React.FC<AuthProps> = ({url, navigation}) => {
  const [data, setData] = useState({email: '', password: ''});
  const {password, email} = data;
  const [masking, setMasking] = React.useState(true);
  const [autoLogin, setAutoLogin] = useState(false);

  const loginAuth = async () => {
    if (url !== undefined) {
      try {
        const response = await axios.post(`${url}api/v1/users/login`, data);
        const {accessToken, refreshToken} = responseToken(response.data.tokens);
        //? 토큰 정보를 수집
        AsyncStorage.setItem(
          'tokens',
          JSON.stringify({
            accessToken: accessToken,
            refreshToken: refreshToken,
          }),
        );
        //? 자동 로그인 정보 수집
        autoLogin
          ? AsyncStorage.setItem('saveEmail', JSON.stringify(`${email}`))
          : AsyncStorage.removeItem('saveEmail');
        navigation.navigate('MainTab');
      } catch (error: any) {
        console.log(error.response.status);
      }
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpTab');
  };

  const inputPassword = (text: string) => {
    setData({
      ...data,
      password: text,
    });
  };

  const inputEmail = (text: string) => {
    setData({
      ...data,
      email: text,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Image source={require('front/assets/image/SymbolLogo.png')} style={styles.symbolLogo} />
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.inputArea, styles.inputBottomLine]}
          onChangeText={inputEmail}
          value={email}
          placeholder="이메일"
        />
        <View style={styles.passwordInputArea}>
          <TextInput
            style={styles.inputArea}
            onChangeText={inputPassword}
            value={password}
            placeholder="비밀번호"
            keyboardType="ascii-capable"
            secureTextEntry={masking}
          />
          <TouchableOpacity onPress={() => setMasking(open => !open)}>
            <Image
              style={styles.swmIcon}
              source={
                masking
                  ? require('front/assets/image/swm_close_btn.png')
                  : require('front/assets/image/swm_open_btn.png')
              }
            />
          </TouchableOpacity>
        </View>
      </View>
      {isPasswordValid(password) === false && password.length > 0 ? (
        <Text style={styles.alertText}>
          8자리 이상 영문, 숫자, 특수문자 1개를 포함한 비밀번호를 입력하세요.
        </Text>
      ) : null}
      <View style={styles.loginMenu}>
        <TouchableOpacity
          style={styles.autoLogin}
          onPress={() => {
            setAutoLogin(on => !on);
          }}>
          <TouchableOpacity
            onPress={() => {
              setAutoLogin(on => !on);
            }}
            style={autoLogin ? styles.checkState : styles.unCheckState}>
            <Image style={styles.checkIcon} source={require('front/assets/image/check.png')} />
          </TouchableOpacity>
          <Text style={styles.checkBoxBtn}>자동 로그인</Text>
        </TouchableOpacity>
      </View>
      <GradientButton_L text="로그인" onPress={loginAuth} />
      <View style={styles.textBtns}>
        <Text style={styles.textBtn}>계정이 없으신가요?</Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signBtn}>가입하기</Text>
        </TouchableOpacity>
      </View>

      <Oauth2 />
    </View>
  );
};

const styles = StyleSheet.create({
  checkState: {
    width: 18,
    height: 18,
    backgroundColor: '#FF5789',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  unCheckState: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: variables.line_1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  checkIcon: {
    width: 10,
    height: 6,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 24,
    paddingRight: 24,
    paddingLeft: 24,
  },
  text: {
    fontFamily: 'Pretendard-Medium',
    color: variables.main,
    fontSize: 30,
  },
  symbolLogo: {
    width: 180,
    height: 80,
    marginBottom: 30,
  },
  inputContainer: {
    borderColor: variables.line_1,
    borderWidth: 1,
    width: '100%',
    borderRadius: 6,
  },
  inputArea: {
    fontFamily: variables.font_4,
    fontSize: 14,
    padding: 16,
    height: 48,
  },
  passwordInputArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputBottomLine: {
    borderBottomColor: variables.line_1,
    borderBottomWidth: 1,
  },
  loginMenu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    marginTop: 10,
  },
  autoLogin: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBtns: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  signBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: variables.Mater_5,
    marginLeft: 5,
  },
  textBtn: {
    fontFamily: variables.font_4,
    fontSize: 14,
    color: variables.text_4,
  },
  checkBoxBtn: {
    fontFamily: variables.font_4,
    fontSize: 14,
    color: variables.text_4,
    marginLeft: 10,
  },
  alertText: {
    fontFamily: variables.font_4,
    color: variables.board_8,
    lineHeight: 20,
  },
  swmIcon: {
    width: 20,
    height: 20,
    marginRight: 16,
  },
});

export default Login;
