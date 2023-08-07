import React, {useEffect, useState} from 'react';
import Oauth2 from './Oauth2';
import {GradientButton_L} from '../../components/GradientButton';
import {AuthProps} from '../../navigations/StackNavigator';
import {variables} from '../../style/variables';
import {View, StyleSheet, Text, Image, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import {isPasswordValid} from '../signUp/SignupUtil';
import {AutomaticLoginAuth} from '../../util/AuthToken';

const Login: React.FC<AuthProps> = ({url, navigation}) => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [autoLogin, setAutoLogin] = useState(false);
  const [passwordCheck, setPasswordCheck] = React.useState(false);
  const data = {email: id, password: pw};
  const handleSignUp = () => {
    navigation.navigate('SignUpTab');
  };

  useEffect(() => {
    isPasswordValid(pw) === true || pw.length <= 0
      ? setPasswordCheck(true)
      : setPasswordCheck(false);
  }, [pw]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Image source={require('front/assets/image/SymbolLogo.png')} style={styles.symbolLogo} />
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.inputBottomLine]}
          onChangeText={setId}
          value={id}
          placeholder="이메일"
        />
        <TextInput style={styles.input} onChangeText={setPw} value={pw} placeholder="비밀번호" />
      </View>
      {passwordCheck === false ? (
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
        <View style={styles.textBtns}>
          <TouchableOpacity>
            <Text style={styles.textBtn}>계정 찾기</Text>
          </TouchableOpacity>
          <View style={styles.VerticalBar}></View>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.textBtn}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
      <GradientButton_L
        text="로그인"
        onPress={() => AutomaticLoginAuth(url, data, passwordCheck)}
      />
      <Oauth2
        onLogin={function (loginState: boolean): void {
          throw new Error('Function not implemented.');
        }}
      />
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
  input: {
    fontFamily: variables.font_4,
    fontSize: 14,
    width: '100%',
    padding: 16,
    height: 48,
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
  },
  VerticalBar: {
    marginLeft: 8,
    marginRight: 8,
    height: 10,
    width: 1,
    backgroundColor: variables.line_2,
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
});

export default Login;
