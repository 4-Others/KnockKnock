import {View, StyleSheet, Text, Button, Image} from 'react-native';
import React from 'react';
import {useNavigation, StackActions} from '@react-navigation/native';
import {GradientButton_L} from '../../components/GradientButton';
import {variables} from '../../style/variables';

const Login: React.FC = () => {
  const navigation = useNavigation();

  const handleSignUp = () => {
    navigation.dispatch(StackActions.push('SignUp', {locate: undefined}));
  };

  return (
    <View style={styles.container}>
      <Image source={require('front/assets/image/SymbolLogo.png')} style={styles.symbolLogo} />
      <Text style={styles.text}>Login 겸 Home</Text>
      <Button title="회원가입" onPress={handleSignUp} />
      <GradientButton_L text="로그인" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontFamily: 'Pretendard-Medium',
    color: variables.main,
    fontSize: 30,
  },
  symbolLogo: {
    width: 140,
    height: 60,
  },
});

export default Login;
