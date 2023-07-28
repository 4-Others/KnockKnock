import React, {Dispatch, SetStateAction, useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {variables} from '../../../style/variables';

interface InputAreaProps {
  type: string;
  text: string;
  btnText: string;
  func: () => void;
  setInput: (text: string) => void;
  input: string;
}

interface EmailProps {
  url?: string;
}

export const InputArea: React.FC<InputAreaProps> = ({
  type,
  text,
  btnText,
  func,
  setInput,
  input,
}) => {
  return (
    <View style={styles.inputArea}>
      <TextInput
        value={input}
        onChangeText={setInput}
        style={styles.inputContainer}
        placeholder={text}
        keyboardType={type === 'email' ? 'email-address' : 'numeric'}
      />
      <TouchableOpacity style={styles.inputBtn} onPress={func}>
        <Text style={styles.BtnInnerText}>{btnText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const Email: React.FC<EmailProps> = ({url}) => {
  const [email, setEmail] = useState('');
  const [certification, setCertification] = useState('');

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handleCertificationChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setCertification(numericValue);
  };

  return (
    <SafeAreaView>
      <View style={styles.title}>
        <Text style={styles.text}>사용하실 이메일을</Text>
        <Text style={styles.text}>입력해 주세요.</Text>
      </View>
      <InputArea
        type="email"
        text="이메일 입력"
        btnText="메일 발송"
        func={() => {}}
        setInput={handleEmailChange}
        input={email}
      />
      <InputArea
        type="number"
        text="인증번호 입력"
        btnText="인증하기"
        func={() => {}}
        setInput={handleCertificationChange}
        input={certification}
      />
    </SafeAreaView>
  );
};

export default Email;

const styles = StyleSheet.create({
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
  inputBtn: {
    backgroundColor: variables.line_2,
    borderWidth: 1,
    borderColor: variables.line_2,
    padding: 6,
    borderRadius: 4,
  },
  BtnInnerText: {
    fontFamily: variables.font_4,
    fontSize: 12,
    color: variables.text_3,
  },
  btn: {},
});
