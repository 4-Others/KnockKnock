import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Alert, ScrollView} from 'react-native';
import Header from '../../components/Header';
import {variables} from '../../style/variables';
import {AuthProps} from '../../navigations/StackNavigator';
import {InputArea} from '../signUp/SignUpComponent';
import {isEmaildValid} from '../../util/authUtil';
import {userAPI} from '../../api/commonApi';

const ForgotId: React.FC<AuthProps> = ({navigation}) => {
  const [inputInfo, setInputInfo] = useState({email: '', randomKey: ''});
  const {email, randomKey} = inputInfo;
  const [complete, setComplete] = useState({resEmail: false, resRandomKey: false});
  const {resEmail, resRandomKey} = complete;
  const [error, setError] = useState('');

  const changeState = (type: string, value: string | boolean) => {
    typeof value === 'string'
      ? setInputInfo({...inputInfo, [type]: value})
      : setComplete({...complete, [type]: value});
  };

  const emailPost = () => {
    userAPI
      .post('users/me/id', {email})
      .then(res => changeState('resEmail', true))
      .catch(error => setError('유효하지 않은 이메일입니다.'));
  };

  const randomKeyPost = () => {
    userAPI
      .post('users/me/confirm-id', {email, randomKey})
      .then(res => {
        changeState('resRandomKey', true);
        Alert.alert('입력하신 이메일로 회원 아이디를 전송했습니다.');
        navigation.goBack();
      })
      .catch(error => setError('회원정보를 찾을 수 없습니다.'));
  };

  useEffect(() => {
    setError('');
  }, [setInputInfo]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="아이디 찾기" type="none" />
      <View style={styles.screenContainer}>
        <Text style={styles.title}>{'가입하신 이메일을\n입력해 주세요.'}</Text>
        <InputArea
          type="이메일"
          input={email}
          setInput={text => changeState('email', text)}
          btnText="메일발송"
          disabled={!isEmaildValid(email) || resEmail === true}
          func={emailPost}
          errorMessage={error}
        />
        {resEmail === true ? (
          <InputArea
            type="인증번호"
            setInput={text => changeState('randomKey', text)}
            input={randomKey}
            btnText="인증하기"
            disabled={!(randomKey.length >= 6 || resRandomKey === true)}
            func={randomKeyPost}
            errorMessage={error}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const ForgotPw: React.FC<AuthProps> = ({navigation}) => {
  const [inputInfo, setInputInfo] = useState({id: '', email: '', randomKey: ''});
  const {id, email, randomKey} = inputInfo;
  const [complete, setComplete] = useState({resEmail: false, resRandomKey: false});
  const {resEmail, resRandomKey} = complete;
  const [error, setError] = useState('');

  const changeState = (type: string, value: string | boolean) => {
    typeof value === 'string'
      ? setInputInfo({...inputInfo, [type]: value})
      : setComplete({...complete, [type]: value});
  };

  const emailPost = () => {
    userAPI
      .post('users/me/pw', {id, email})
      .then(res => {
        changeState('resEmail', true);
      })
      .catch(error => setError('유효하지 않은 회원정보입니다.'));
  };

  const randomKeyPost = () => {
    userAPI
      .post('users/me/confirm-pw', {id, email, randomKey})
      .then(res => {
        changeState('resRandomKey', true);
        Alert.alert('입력하신 이메일로 회원 아이디를 전송했습니다.');
        navigation.goBack();
      })
      .catch(error => setError('회원정보를 찾을 수 없습니다.'));
  };

  useEffect(() => {
    setError('');
  }, [setInputInfo]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="비밀번호 찾기" type="none" />
      <ScrollView style={styles.screenContainer} scrollEnabled={false}>
        <Text style={styles.title}>{'가입하신 아이디와 이메일을\n입력해 주세요.'}</Text>
        <InputArea type="아이디" input={id} setInput={text => changeState('id', text)} />
        <InputArea
          type="이메일"
          input={email}
          setInput={text => changeState('email', text)}
          btnText="메일발송"
          disabled={!isEmaildValid(email) || resEmail === true}
          func={emailPost}
          errorMessage={error}
        />
        {resEmail === true ? (
          <InputArea
            type="인증번호"
            setInput={text => changeState('randomKey', text)}
            input={randomKey}
            btnText="인증하기"
            disabled={!(randomKey.length >= 6 || resRandomKey === true)}
            func={randomKeyPost}
            errorMessage={error}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 60,
  },
  title: {
    marginBottom: 30,
    color: variables.text_1,
    fontFamily: variables.font_4,
    fontSize: 24,
    textAlign: 'left',
    lineHeight: 34,
  },
});

export {ForgotId, ForgotPw};
