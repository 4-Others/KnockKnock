import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {variables} from '../../style/variables';
import {isEmaildValid, validErrorMessage, isBirthValid, isPasswordValid} from '../../util/authUtil';
import {InputArea, CheckBtn} from './SignUpComponent';
import {GradientButton_L} from '../../components/GradientButton';
import {loginPost} from '../../api/authApi';
import {setLogin} from '../../util/redux/userSlice';

type SignScreenProps = {
  route: any;
  navigation: any;
  url?: string;
};

type DataPostScreenProps = {
  route: any;
  navigation: any;
  url?: string;
};

//! step1: 약관동의 스크린
const SignAgree: React.FC<SignScreenProps> = ({navigation}) => {
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
    navigation.navigate('SignPersonalInfo', {pushAgree: eachAgree[eachAgree.length - 1].on});
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

//! step2: 인적사항 입력
const SignPersonalInfo: React.FC<SignScreenProps> = ({route, navigation}) => {
  const [complete, setComplete] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({username: '', birth: ''});
  const {username, birth} = personalInfo;

  const changeInputText = (type: string, text: string) => {
    setPersonalInfo({
      ...personalInfo,
      [type]: text,
    });
  };

  const handleNextPage = () => {
    if (route.params)
      navigation.navigate('SignPasswordInfo', {
        userData: {...personalInfo, pushAgree: route.params.pushAgree},
      });
  };

  useEffect(() => {
    if (isBirthValid(birth) && username.length > 1) setComplete(true);
  }, [personalInfo]);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text style={styles.title}>{'이름과 생년월일을\n입력해 주세요.'}</Text>
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
        errorMessage={validErrorMessage.birth(birth)}
      />
      <View style={styles.bottomButton}>
        <GradientButton_L
          text="다음"
          onPress={handleNextPage}
          disabled={complete === false ? true : false}
        />
      </View>
    </SafeAreaView>
  );
};

//! step3: 비밀번호 입력
const SignPasswordInfo: React.FC<SignScreenProps> = ({route, navigation}) => {
  const [complete, setComplete] = useState(false);
  const [pwInfo, setPwInfo] = useState({password: '', comparePassword: ''});
  const {password, comparePassword} = pwInfo;

  const changeInputText = (type: string, text: string) => {
    setPwInfo({
      ...pwInfo,
      [type]: text,
    });
  };

  useEffect(() => {
    if (isPasswordValid(password) && password == comparePassword) setComplete(true);
  }, [pwInfo]);

  const handleNextPage = () => {
    if (route.params) {
      const {birth, pushAgree, username} = route.params.userData;
      navigation.navigate('SignIDandEmailInfo', {
        userData: {...pwInfo, birth, pushAgree, username},
      });
    }
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text style={styles.title}>{'사용하실 비밀번호를\n입력해 주세요.'}</Text>
      <InputArea
        type="비밀번호"
        input={password}
        setInput={text => changeInputText('password', text)}
        errorMessage={validErrorMessage.password(password)}
      />
      <InputArea
        type="비밀번호 다시"
        input={comparePassword}
        setInput={text => changeInputText('comparePassword', text)}
        errorMessage={validErrorMessage.comparePassword(comparePassword, password)}
      />
      <View style={styles.bottomButton}>
        <GradientButton_L
          text="다음"
          onPress={handleNextPage}
          disabled={complete === false ? true : false}
        />
      </View>
    </SafeAreaView>
  );
};

//! step4: 아이디&이메일 입력
const SignIDandEmailInfo: React.FC<SignScreenProps> = ({url, route, navigation}) => {
  const [complete, setComplete] = useState(false);
  const [userInfo, setUserInfo] = useState({
    id: '',
    email: '',
    birth: '',
    pushAgree: false,
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const {id, email, password} = userInfo;

  const changeInputText = (type: string, text: string) => {
    setUserInfo({
      ...userInfo,
      [type]: text,
    });
  };

  const userInfoThenEmailPost = async () => {
    try {
      const response = await axios.post(`${url}api/v1/users/signup`, userInfo);
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
            setError('');
            setComplete(true);
          }
        } catch (emailError: any) {
          const res = JSON.parse(emailError.request.response);
          setError(res.message);
          console.log(res);
        }
      }
    } catch (error: any) {
      const res = JSON.parse(error.request.response);
      setError(res.message);
    }
  };

  const handleNextPage = () => {
    navigation.navigate('SignVerifyEmalInfo', {id, email, password});
  };

  useEffect(() => {
    if (route.params) {
      const {birth, pushAgree, username, password} = route.params.userData;
      setUserInfo({
        ...userInfo,
        birth,
        pushAgree,
        username,
        password,
      });
    }
  }, [route]);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <Text style={styles.title}>{'아이디와 이메일을\n입력해 주세요.'}</Text>
      <InputArea type="아이디" input={id} setInput={text => changeInputText('id', text)} />
      <InputArea
        type="이메일"
        setInput={text => changeInputText('email', text)}
        input={email}
        btnText="메일발송"
        func={userInfoThenEmailPost}
        disabled={!isEmaildValid(email)}
        errorMessage={error}
      />
      <View style={styles.bottomButton}>
        <GradientButton_L text="다음" onPress={handleNextPage} disabled={!complete} />
      </View>
    </SafeAreaView>
  );
};

const SignVerifyEmalInfo: React.FC<DataPostScreenProps> = ({route, navigation, url}) => {
  const dispatch = useDispatch();
  const [complete, setComplete] = useState(false);
  const [tokenOrKey, setTokenOrKey] = useState('');
  const [error, setError] = useState('');

  const handleNextPage = () => {
    navigation.navigate('SignSuccess');
  };

  const verifyKeyPost = async () => {
    if (route.params) {
      const {id, email, password} = route.params;
      try {
        const key = {tokenOrKey, email, password};
        const response = await axios.post(`${url}api/v1/emails/verify`, key);
        if (response.status === 200) {
          console.log('verifyKeyAPI 성공');
          try {
            const token = await loginPost({id, password});
            setError('');
            dispatch(setLogin({id, token}));
            setComplete(true);
          } catch (error: any) {
            console.log('로그인 실패', error.request);
          }
        }
      } catch (error: any) {
        setError('유효하지 않은 인증번호입니다.');
      }
    }
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>{`이메일로 전달받은 인증번호를\n입력해 주세요.`}</Text>
      <InputArea
        type="인증번호"
        setInput={setTokenOrKey}
        input={tokenOrKey}
        btnText="인증하기"
        func={verifyKeyPost}
        disabled={!(tokenOrKey.length >= 6)}
        errorMessage={error}
      />
      <View style={styles.bottomButton}>
        <GradientButton_L text="다음" onPress={handleNextPage} disabled={!complete} />
      </View>
    </View>
  );
};

interface SuccessScreenProps {
  navigation: any;
  route: any;
}

const SignSuccess: React.FC<SuccessScreenProps> = ({navigation}) => {
  const handleLogin = () => {
    navigation.navigate('MainTab');
  };

  return (
    <SafeAreaView style={styles.screenContainer}>
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

export {
  SignVerifyEmalInfo,
  SignPasswordInfo,
  SignIDandEmailInfo,
  SignAgree,
  SignPersonalInfo,
  SignSuccess,
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
