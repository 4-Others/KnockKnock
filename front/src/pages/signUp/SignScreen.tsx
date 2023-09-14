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
import {InputArea, CheckBtn} from './SignUpComponent';
import {isEmaildValid} from '../../util/authUtil';
import axios from 'axios';
import {RouteProp, ParamListBase} from '@react-navigation/native';

type InputValue = {
  id: string;
  password: string;
  comparePassword: string;
  username: string;
  email: string;
  birth: string;
  pushAgree: boolean;
  verifyKey: string;
};

type Complete = {
  emailAPI: boolean;
  verifyKeyAPI: boolean;
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
        <Text style={styles.title}>{'서비스 이용약관에\n동의해 주세요.'}</Text>
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
const SignUserInfo: React.FC<DataPostScreenProps> = ({route, navigation, url}) => {
  const pushAgree = route.params.pushAgree;

  const [complete, setComplete] = useState<Complete>({
    emailAPI: false,
    verifyKeyAPI: false,
  });

  const [inputValue, setInputValue] = useState<InputValue>({
    id: '',
    password: '',
    comparePassword: '',
    username: '',
    email: '',
    birth: '',
    pushAgree: false,
    verifyKey: '',
  });

  const {id, password, comparePassword, username, email, birth, verifyKey} = inputValue;

  const changeInputText = (type: string, text: string) => {
    setInputValue({
      ...inputValue,
      [type]: text,
    });
  };

  const changeComplete = (type: string, value: boolean) => {
    setComplete({
      ...complete,
      [type]: value,
    });
  };

  const handleNextPage = () => {
    complete && navigation.navigate('SignSuccess');
  };

  const userInfoThenEmailPost = async () => {
    const userData = {id, email, password, username, birth, pushAgree};
    try {
      const response = await axios.post(`${url}api/v1/users/signup`, userData);
      if (response.status === 200) {
        console.log('usersAPI 성공');
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
          const emailResponse = await axios.post(`${url}api/v1/emails/send`, formData, headers);
          if (emailResponse.status === 200) {
            console.log('emailAPI 성공');
            changeComplete('emailAPI', true);
          }
        } catch (emailError: any) {
          console.log('emailAPI', emailError.request);
        }
      }
    } catch (error: any) {
      console.log('usersAPI', error.request);
    }
  };

  // 최종 회원가입 인증 api
  const verifyKeyPost = async () => {
    try {
      const key = {tokenOrKey: verifyKey, email, password};
      const response = await axios.post(`${url}api/v1/emails/verify`, key);
      if (response.status === 200) {
        console.log('verifyKeyAPI 성공');
        changeComplete('verifyKeyAPI', true);
      }
    } catch (error: any) {
      console.log('verifyKeyAPI', error.request);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{`회원정보를\n입력해 주세요.`}</Text>
        <InputArea type="아이디" input={id} setInput={text => changeInputText('id', text)} />
        <InputArea
          type="비밀번호"
          input={password}
          setInput={text => changeInputText('password', text)}
        />
        <InputArea
          type="비밀번호 다시"
          input={comparePassword}
          setInput={text => changeInputText('comparePassword', text)}
          compare={password}
        />
        <InputArea
          type="이름"
          input={username}
          setInput={text => changeInputText('username', text)}
        />
        <InputArea
          type="생년월일"
          input={birth}
          setInput={text => changeInputText('birth', text)}
          keyType="numeric"
        />
        <InputArea
          type="이메일"
          setInput={text => changeInputText('email', text)}
          input={email}
          btnText="메일발송"
          func={userInfoThenEmailPost}
          disabled={!isEmaildValid(email)}
        />
        {complete.emailAPI && isEmaildValid(email) && (
          <InputArea
            type="인증번호"
            setInput={text => changeInputText('verifyKey', text)}
            input={verifyKey}
            btnText="인증하기"
            func={verifyKeyPost}
            disabled={!(verifyKey.length >= 6)}
          />
        )}
      </ScrollView>
      <View style={styles.bottomButton}>
        <GradientButton_L text="다음" onPress={handleNextPage} disabled={!complete.verifyKeyAPI} />
      </View>
    </View>
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

export {SignUserInfo, SignAgree, SignSuccess};

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
