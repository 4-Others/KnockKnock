import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {variables} from '../../style/variables';
import {GradientButton_L} from '../../components/GradientButton';
import {PasswordInputArea, EmailInputArea, EmailRenderArea, CheckBtn} from './SignUpComponent';
import {isPasswordValid, isEmaildValid} from './SignupUtil';
import axios from 'axios';
import {RouteProp, ParamListBase} from '@react-navigation/native';

type inputValue = {email: string; password: string};

type sendDataValue = {email: string; password: string; tokenOrKey: string};

type AgreeScreenProps = {
  route: RouteProp<ParamListBase, 'SignAgree'>;
  navigation: any;
};

type DataPostScreenProps = {
  route: any;
  navigation: any;
  url?: string;
};

// 약관동의 스크린
const SignAgree: React.FC<AgreeScreenProps> = ({navigation}) => {
  const [allAgree, setAllAgree] = useState(false);
  const [eachAgree, seteachAgree] = useState([
    {text: '[필수] 만 14세 이상입니다.', link: 'https//www.m.naver.com', on: false},
    {text: '[필수] 이용약관 동의', link: 'https//www.m.naver.com', on: false},
    {text: '[필수] 개인정보 수집 및 이용 동의', link: 'https//www.m.naver.com', on: false},
  ]);

  const handleAllAgreePress = () => {
    setAllAgree(!allAgree);
    seteachAgree(agree =>
      agree.map(e => ({
        ...e,
        on: !allAgree,
      })),
    );
  };

  const agreeHandler = (idx: number) => {
    seteachAgree(agree => agree.map((e, i) => (i === idx ? {...e, on: !e.on} : e)));
  };

  const handleNextPage = () => {
    navigation.navigate('SignUserInfo');
  };

  useEffect(() => {
    const allAgreeNow = eachAgree.filter(item => item.on === false).length;
    allAgreeNow === 0 ? setAllAgree(true) : setAllAgree(false);
  }, [eachAgree]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.title}>
          <Text style={styles.text}>서비스 이용약관에</Text>
          <Text style={styles.text}>동의해 주세요.</Text>
        </View>
        <View style={styles.allAgree}>
          <TouchableOpacity style={styles.checkbox} onPress={handleAllAgreePress}>
            <Image
              style={
                allAgree
                  ? [styles.checkImg, styles.smallCheck]
                  : [styles.unCheckImg, styles.smallCheck]
              }
              source={require('front/assets/image/check.png')}
            />
          </TouchableOpacity>
          <Text style={styles.unCheckText}>모두 동의하십니까?</Text>
        </View>
        <View style={styles.essentials}>
          {eachAgree.map((agreement, index) => (
            <CheckBtn
              key={index}
              text={agreement.text}
              link={agreement.link}
              on={agreement.on}
              onPress={() => agreeHandler(index)}
            />
          ))}
        </View>
      </View>
      <View style={styles.bottomButton}>
        <GradientButton_L
          text="다음"
          onPress={handleNextPage}
          disabled={allAgree === false ? true : false}
        />
      </View>
    </SafeAreaView>
  );
};

const SignUserInfo: React.FC<DataPostScreenProps> = ({navigation, url}) => {
  const [inputValue, setInputValue] = useState<inputValue>({email: '', password: ''});
  const [error, setError] = useState(false);
  const {password, email} = inputValue;

  // 이메일 & 비밀번호 입력 api
  const handleNextPage = async () => {
    try {
      const response = await axios.post(`${url}api/v1/users/signup`, inputValue);
      console.log(response);
      if (response.status === 200) navigation.navigate('SignEmailAuth', inputValue);
    } catch (error: any) {
      console.log(error);
      // 에러 처리
      setError(error => !error);
    }
  };

  const handleChangePassword = (text: string) => {
    setInputValue({
      ...inputValue,
      password: text,
    });
  };

  const handleChangeEmail = (text: string) => {
    setInputValue({
      ...inputValue,
      email: text,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.title}>
            <Text style={styles.text}>사용하실 회원 정보를</Text>
            <Text style={styles.text}>입력해 주세요.</Text>
          </View>
          <View style={styles.InputTextArea}>
            <EmailInputArea
              text="이메일 입력"
              btnText="메일 발송"
              setInput={handleChangeEmail}
              input={email}
            />
            {!isEmaildValid(email) && email.length > 0 ? (
              <Text style={styles.alertText}>올바른 이메일 주소를 입력하세요.</Text>
            ) : null}
            {error ? <Text style={styles.alertText}>다른 이메일 주소를 입력해 주세요.</Text> : null}
          </View>
          <View style={styles.InputTextArea}>
            <PasswordInputArea
              text="비밀번호 입력"
              input={password}
              setInput={handleChangePassword}
            />
            {!isPasswordValid(password) && password.length > 0 ? (
              <Text style={styles.alertText}>
                8자리 이상 영문, 숫자, 특수문자 1개를 포함한 비밀번호를 입력하세요.
              </Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomButton}>
        <GradientButton_L
          text="다음"
          onPress={handleNextPage}
          disabled={!isPasswordValid(password) || !isEmaildValid(email)}
        />
      </View>
    </SafeAreaView>
  );
};

const SignEmailAuth: React.FC<DataPostScreenProps> = ({route, navigation, url}) => {
  const initialEmail = route.params?.email;
  const initialPassword = route.params?.password;
  const [complete, setComplete] = useState(false);
  const [inputValue, setInputValue] = useState<sendDataValue>({
    email: '',
    password: '',
    tokenOrKey: '',
  });
  const {email, tokenOrKey} = inputValue;

  const changeEmailKey = (text: string) => {
    setInputValue({
      ...inputValue,
      tokenOrKey: text,
    });
  };

  const changeCertifyEmail = (text: string) => {
    setInputValue({
      ...inputValue,
      email: text,
    });
  };

  // 회원가입 인증 메일 발송 api
  const certifyEmailPost = async () => {
    const formData = new FormData();
    formData.append('recipientEmail', email);
    formData.append('subject', 'KnockKnock 회원가입을 위한 인증 메일을 보내드립니다.');
    const headers = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      transformRequest: [
        function () {
          return formData;
        },
      ],
    };
    try {
      const response = await axios.post(`${url}api/v1/emails/send`, formData, headers);
      console.log('인증메일발송', response.status);
    } catch (error: any) {
      console.log('인증메일발송', error.request);
    }
  };

  // 최종 회원가입 인증 api
  const SignupKeyPost = async () => {
    try {
      const response = await axios.post(`${url}api/v1/emails/verify`, inputValue);
      console.log('인증키발송', response.status);
      if (response.status === 200) setComplete(boolean => !boolean);
    } catch (error: any) {
      console.log('인증키발송', error.request);
    }
  };

  // inputvalue 초기값 설정
  useEffect(() => {
    setInputValue({
      ...inputValue,
      email: initialEmail || '',
      password: initialPassword || '',
    });
  }, [initialEmail, initialPassword]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.title}>
            <Text style={styles.text}>입력하신 이메일 인증을</Text>
            <Text style={styles.text}>진행해 주세요.</Text>
          </View>
          <View style={styles.InputTextArea}>
            <EmailInputArea
              text="인증하실 이메일을 확인해 주세요"
              btnText="메일발송"
              setInput={changeCertifyEmail}
              input={email}
              func={certifyEmailPost}
              disabled={!isEmaildValid(email)}
              defaultValue={initialEmail}
            />
          </View>
          <View style={styles.InputTextArea}>
            <EmailInputArea
              text="전달받은 인증번호를 입력하세요"
              btnText="인증하기"
              setInput={changeEmailKey}
              input={tokenOrKey}
              func={SignupKeyPost}
              disabled={!(tokenOrKey.length >= 6)}
              defaultValue={initialEmail}
            />
            {!isEmaildValid(email) && email.length > 0 ? (
              <Text style={styles.alertText}>올바른 이메일 주소를 입력하세요.</Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomButton}>
        <GradientButton_L
          text="다음"
          onPress={() => navigation.navigate('SignSuccess')}
          disabled={!complete}
        />
      </View>
    </SafeAreaView>
  );
};

interface SuccessScreenProps {
  navigation: any;
}

const SignSuccess: React.FC<SuccessScreenProps> = ({navigation}) => {
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('front/assets/animations/signup.gif')}
        style={{width: '100%', height: '50%'}}
      />
      <View style={styles.successTitle}>
        <Text style={styles.successText}>회원가입이</Text>
        <Text style={styles.successText}>정상적으로 완료됐습니다!</Text>
        <Text style={styles.subText}>KnockKnock의 다양한 서비스를 만나보세요.</Text>
      </View>
      <View style={styles.bottomButton}>
        <GradientButton_L text="로그인" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
};

export {SignUserInfo, SignEmailAuth, SignAgree, SignSuccess};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    marginBottom: 24,
  },
  text: {
    color: variables.text_1,
    fontFamily: variables.font_4,
    fontSize: 24,
    textAlign: 'left',
    marginBottom: 5,
  },
  InputTextArea: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20,
  },
  bottomButton: {
    marginTop: 'auto',
    marginBottom: 60,
  },
  alertText: {
    fontFamily: variables.font_4,
    color: variables.board_8,
    lineHeight: 20,
  },
  allAgree: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: variables.line_1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  unCheckText: {
    fontFamily: variables.font_4,
    fontSize: 14,
    color: variables.text_3,
    marginLeft: 10,
  },
  smallCheck: {
    width: 10,
    height: 6,
  },
  largeCheck: {
    width: 12,
    height: 12,
  },
  checkImg: {
    tintColor: variables.main,
  },
  unCheckImg: {
    tintColor: '#ddd',
  },
  essentials: {
    borderTopColor: variables.line_1,
    borderTopWidth: 1,
    paddingTop: 16,
  },
  essential: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 16,
  },
  linkText: {
    fontFamily: variables.font_4,
    fontSize: 14,
    color: variables.text_4,
    marginLeft: 10,
    textDecorationLine: 'underline',
  },
  successText: {
    fontFamily: variables.font_4,
    fontSize: 24,
    textAlign: 'center',
    color: variables.text_1,
    marginBottom: 5,
  },
  successTitle: {
    position: 'absolute',
    width: '100%',
    marginBottom: 24,
    top: '35%',
  },
  subText: {
    fontFamily: variables.font_5,
    color: variables.text_2,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});
