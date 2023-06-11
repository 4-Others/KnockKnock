import {View, StyleSheet, Text, Image, TextInput, TouchableOpacity, StatusBar} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, StackActions} from '@react-navigation/native';
import {GradientButton_L} from '../../components/GradientButton';
import {variables} from '../../style/variables';

export const CheckBox: React.FC = () => {
  const [on, setOn] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => setOn(!on)}
      style={on ? styles.checkState : styles.unCheckState}>
      <Image style={styles.checkIcon} source={require('front/assets/image/check.png')} />
    </TouchableOpacity>
  );
};

const Login: React.FC = () => {
  const navigation = useNavigation();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleSignUp = () => {
    navigation.dispatch(StackActions.push('SignUp', {locate: undefined}));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Image source={require('front/assets/image/SymbolLogo.png')} style={styles.symbolLogo} />
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.inputBottomLine]}
          onChangeText={setId}
          value={id}
          placeholder="아이디"
        />
        <TextInput style={styles.input} onChangeText={setPw} value={pw} placeholder="비밀번호" />
      </View>
      <View style={styles.loginMenu}>
        <View style={styles.autoLogin}>
          <CheckBox />
          <Text style={styles.checkBoxBtn}>자동 로그인</Text>
        </View>
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

      <GradientButton_L text="로그인" />
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
    paddingLeft: 24,
    paddingRight: 24,
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
    color: variables.text_3,
  },
  checkBoxBtn: {
    fontFamily: variables.font_4,
    fontSize: 14,
    color: variables.text_2,
    marginLeft: 10,
  },
});

export default Login;
