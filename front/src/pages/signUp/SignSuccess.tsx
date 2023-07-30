import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, StyleSheet, Image} from 'react-native';
import {variables} from '../../style/variables';
import {GradientButton_L} from '../../components/GradientButton';

interface onLoginProps {
  onLogin: (loginState: boolean) => void;
}

const SignSuccess: React.FC<onLoginProps> = ({onLogin}) => {
  const handleLogin = () => {
    onLogin(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('front/assets/animations/signup.gif')}
        style={{width: '100%', height: '50%'}}
      />
      <View style={styles.title}>
        <Text style={styles.text}>회원가입이</Text>
        <Text style={styles.text}>정상적으로 완료됐습니다!</Text>
        <Text style={styles.subText}>KnockKnock의 다양한 서비스를 만나보세요.</Text>
      </View>
      <View style={styles.bottomButton}>
        <GradientButton_L text="로그인" onPress={handleLogin} />
      </View>
    </SafeAreaView>
  );
};

export default SignSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'space-between',
  },
  title: {
    position: 'absolute',
    width: '100%',
    marginBottom: 24,
    top: '35%',
  },
  text: {
    fontFamily: variables.font_4,
    fontSize: 24,
    textAlign: 'center',
    color: variables.text_1,
    marginBottom: 5,
  },
  subText: {
    fontFamily: variables.font_5,
    color: variables.text_2,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  bottomButton: {
    bottom: 0,
    marginBottom: 60,
  },
});
