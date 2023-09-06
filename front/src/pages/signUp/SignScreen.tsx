import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {variables} from '../../style/variables';
import {GradientButton_L} from '../../components/GradientButton';
import {InputArea, PasswordInputArea, EmailInputArea, CheckBtn} from './SignUpComponent';
import {isPasswordValid, isEmaildValid} from '../../util/authUtil';
import axios from 'axios';
import {RouteProp, ParamListBase} from '@react-navigation/native';

type inputValue = {
  id: string;
  password: string;
  comparePassword: string;
};

type sendDataValue = {
  id: string;
  password: string;
  username: string;
  email: string;
  birth: string;
  pushAgree: boolean;
  certify: string;
};

type AgreeScreenProps = {
  route: RouteProp<ParamListBase, 'SignAgree'>;
  navigation: any;
};

type DataPostScreenProps = {
  route: any;
  navigation: any;
  url?: string;
};

//! step1: 약관동의 스크린
const SignAgree: React.FC<AgreeScreenProps> = ({navigation}) => {
  const [allAgree, setAllAgree] = useState(false);
  const [eachAgree, seteachAgree] = useState([
    {text: '[필수] 만 14세 이상입니다.', link: 'https//www.m.naver.com', on: false},
    {text: '[필수] 이용약관 동의', link: 'https//www.m.naver.com', on: false},
    {text: '[필수] 개인정보 수집 및 이용 동의', link: 'https//www.m.naver.com', on: false},
    {text: '[선택] 푸쉬 알림 동의', on: false},
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
    navigation.navigate('SignUserInfo', {pushAgree: eachAgree[eachAgree.length - 1].on});
  };

  useEffect(() => {
    const allAgreeNow = eachAgree.slice(0, -1).filter(item => item.on === false).length;
    allAgreeNow === 0 ? setAllAgree(true) : setAllAgree(false);
  }, [eachAgree]);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View>
        <View style={styles.title}>
          <Text style={styles.text}>{'서비스 이용약관에\n동의해 주세요.'}</Text>
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

//! step2: 회원정보 입력
const SignUserInfo: React.FC<DataPostScreenProps> = ({route, navigation}) => {
  const pushAgree = route.params.pushAgree;

  const [inputValue, setInputValue] = useState<inputValue>({
    id: '',
    password: '',
    comparePassword: '',
  });

  const {id, password, comparePassword} = inputValue;

  const handleChangeValue = (type: string, text: string) => {
    setInputValue({
      ...inputValue,
      [type]: text,
    });
  };

  const nextValue = {id, password, pushAgree};
  const handleNextPage = () => {
    navigation.navigate('SignEmailAuth', nextValue);
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.title}>
          <Text style={styles.text}>{`새로운 아이디와 비밀번호를\n입력해 주세요.`}</Text>
        </View>
        <InputArea type="아이디" input={id} setInput={text => handleChangeValue('id', text)} />
        <PasswordInputArea
          text="비밀번호 입력"
          input={password}
          setInput={text => handleChangeValue('password', text)}
        />
        <PasswordInputArea
          text="비밀번호 재확인"
          input={comparePassword}
          setInput={text => handleChangeValue('comparePassword', text)}
          compare={password}
        />
      </ScrollView>
      <View style={styles.bottomButton}>
        <GradientButton_L
          text="다음"
          onPress={handleNextPage}
          disabled={!isPasswordValid(password) || password !== comparePassword}
        />
      </View>
    </SafeAreaView>
  );
};

//! step3: 개인정보 입력 및 이메일 인증
const SignEmailAuth: React.FC<DataPostScreenProps> = ({route, navigation, url}) => {
  const [complete, setComplete] = useState(false);
  const [inputValue, setInputValue] = useState<sendDataValue>({
    id: '',
    password: '',
    username: '',
    email: '',
    birth: '',
    pushAgree: false,
    certify: '',
  });
  const {username, birth, email, certify} = inputValue;

  const handleChangeValue = (type: string, text: string) => {
    setInputValue({
      ...inputValue,
      [type]: text,
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

  console.log(inputValue);

  useEffect(() => {
    setInputValue({...inputValue, ...route.params});
  }, [route.params]);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.title}>
            <Text style={styles.text}>{`이름과 생일, 이메일을\n입력해 주세요.`}</Text>
          </View>
          <InputArea
            type="이름"
            input={username}
            setInput={text => handleChangeValue('username', text)}
          />
          <InputArea
            type="생년월일"
            input={username}
            setInput={text => handleChangeValue('birth', text)}
          />
          <EmailInputArea
            text="인증하실 이메일을 확인해 주세요"
            setInput={text => handleChangeValue('email', text)}
            input={email}
            btnText="메일발송"
            func={certifyEmailPost}
            disabled={!isEmaildValid(email)}
            defaultValue={email}
          />
          <EmailInputArea
            text="전달받은 인증번호를 입력하세요"
            setInput={text => handleChangeValue('certify', text)}
            input={certify}
            btnText="인증하기"
            func={SignupKeyPost}
            disabled={!(certify.length >= 6)}
            defaultValue={email}
          />
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
    <SafeAreaView style={styles.inputContainer}>
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
  screenContainer: {
    flex: 1,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    marginBottom: 24,
    textAlign: 'auto',
  },
  text: {
    color: variables.text_1,
    fontFamily: variables.font_4,
    fontSize: 24,
    textAlign: 'left',
    marginBottom: 5,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 20,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    paddingBottom: 10,
    marginBottom: 10,
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
    borderTopasswordidth: 1,
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
