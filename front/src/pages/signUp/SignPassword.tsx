import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {variables} from '../../style/variables';
import {RouteProp, ParamListBase} from '@react-navigation/native';
import {GradientButton_L} from '../../components/GradientButton';
import {useRoute} from '@react-navigation/native';

interface InputArea {
  text: string;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

type SignUpProps = {
  route: any;
  navigation: any;
  setDeps: React.Dispatch<number>;
  url?: string;
};

const SignPassword: React.FC<SignUpProps> = ({navigation, setDeps, route, url}) => {
  const [passwordInput, setPasswordInput] = React.useState('');
  const [passwordCheck, setPasswordCheck] = React.useState('');
  const {password} = route.params;

  const handleNextPage = () => {
    if (passwordInput === passwordCheck) {
      navigation.jumpTo('SignEmail');
      setDeps(0.75);
      navigation.setParams({password: passwordCheck});
    } else Alert.alert('비밀번호가 일치하지 않습니다', '다시 확인해 주세요');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.title}>
          <Text style={styles.text}>사용하실 비밀번호를</Text>
          <Text style={styles.text}>입력해 주세요.</Text>
        </View>
        <InputArea text="비밀번호 입력" input={passwordInput} setInput={setPasswordInput} />
        <InputArea text="비밀번호 확인" input={passwordCheck} setInput={setPasswordCheck} />
      </View>
      <View style={styles.bottomButton}>
        <GradientButton_L text="다음" onPress={handleNextPage} />
      </View>
    </SafeAreaView>
  );
};

export default SignPassword;

export const InputArea: React.FC<InputArea> = ({text, input, setInput}) => {
  const [masking, setMasking] = React.useState(false);

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  return (
    <View style={styles.inputArea}>
      <TextInput
        style={styles.inputContainer}
        placeholder={text}
        value={masking ? '*'.repeat(input.length) : input}
        onChangeText={handleInputChange}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'space-between',
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
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    paddingBottom: 10,
    marginBottom: 20,
  },
  inputContainer: {
    fontFamily: variables.font_4,
    fontSize: 14,
    color: variables.text_3,
  },
  swmIcon: {
    width: 20,
    height: 20,
  },
  bottomButton: {
    bottom: 0,
    marginBottom: 40,
  },
});
