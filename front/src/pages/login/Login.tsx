import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {AuthProps} from '../../navigations/StackNavigator';
import {isPasswordValid, storageSetValue} from '../../util/authUtil';
import {setLogin} from '../../util/redux/userSlice';
import {loginPost} from '../../api/authApi';
import {variables} from '../../style/variables';
import {GradientButton_L} from '../../components/GradientButton';
import Oauth2 from './Oauth2';

const Login: React.FC<AuthProps> = ({url, navigation}) => {
  const [data, setData] = useState({id: '', password: ''});
  const {password, id} = data;
  const [masking, setMasking] = React.useState(true);
  const [autoLogin, setAutoLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const loginAuth = async () => {
    try {
      const token = await loginPost(data);
      if (autoLogin === true) storageSetValue('user', {id, token});
      dispatch(setLogin({id, token}));
      navigation.navigate('MainTab');
      // 자동 로그인 정보 수집
    } catch (error: any) {
      console.log(error);
      setErrorMessage('아이디와 비밀번호를 확인해 주세요.');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('SignUpTab');
  };

  const inputText = (type: string, text: string) => {
    setData({
      ...data,
      [type]: text,
    });
  };

  useEffect(() => {
    if (isPasswordValid(password) === false && password.length > 0)
      setErrorMessage('8자리 이상 영문, 숫자, 특수문자 1개를 포함한 비밀번호를 입력하세요.');
    else setErrorMessage('');
  }, [password, id]);

  const handleSocialLoginSuccess = (id: string, token: string) => {
    if (autoLogin === true) storageSetValue('user', {id, token});
    dispatch(setLogin({id, token}));
    navigation.navigate('MainTab');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('front/assets/image/SymbolLogo.png')}
        style={{width: 180, height: 80, marginBottom: 30}}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.inputArea, styles.inputBottomLine]}
          onChangeText={text => inputText('id', text)}
          value={id}
          placeholder="아이디"
        />
        <View style={styles.passwordInputArea}>
          <TextInput
            style={styles.inputArea}
            onChangeText={text => inputText('password', text)}
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
      {errorMessage && <Text style={styles.alertText}>{errorMessage}</Text>}
      <View style={styles.loginMenu}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              setAutoLogin(on => !on);
            }}>
            <TouchableOpacity
              onPress={() => {
                setAutoLogin(on => !on);
              }}
              style={autoLogin ? styles.checkState : styles.unCheckState}>
              <Image
                style={{width: 10, height: 6}}
                source={require('front/assets/image/check.png')}
              />
            </TouchableOpacity>
            <Text style={styles.loginMenuText}>자동 로그인</Text>
          </TouchableOpacity>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotId')}>
            <Text style={styles.loginMenuText}>아이디 찾기</Text>
          </TouchableOpacity>
          <View style={styles.textLine} />
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPw')}>
            <Text style={styles.loginMenuText}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <GradientButton_L text="로그인" onPress={loginAuth} />
      <View style={styles.textBtns}>
        <Text style={styles.textBtn}>계정이 없으신가요?</Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signBtn}>가입하기</Text>
        </TouchableOpacity>
      </View>
      <Oauth2
        onLogin={handleSocialLoginSuccess}
        onError={(error: React.SetStateAction<string>) => {
          setErrorMessage(error);
        }}
      />
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 24,
    marginRight: 24,
    marginLeft: 24,
  },
  loginMenu: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
  },
  autoLogin: {
    display: 'flex',
    flexDirection: 'row',
  },
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
  text: {
    fontFamily: 'Pretendard-Medium',
    color: variables.main,
    fontSize: 30,
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
  loginMenuText: {
    fontFamily: variables.font_3,
    fontSize: 14,
    color: variables.text_4,
    marginLeft: 10,
  },
  textLine: {
    width: 1,
    height: 14,
    marginLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: variables.text_6,
  },
  alertText: {
    width: '100%',
    fontFamily: variables.font_4,
    color: variables.board_8,
    marginTop: 10,
  },
  swmIcon: {
    width: 20,
    height: 20,
    marginRight: 16,
  },
});
