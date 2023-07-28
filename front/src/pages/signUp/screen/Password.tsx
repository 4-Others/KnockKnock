import * as React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {variables} from '../../../style/variables';

interface InputArea {
  text: string;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

export interface SignData {
  email: string;
  password: string;
}

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

const Password: React.FC = () => {
  const [password, setPassword] = React.useState('');
  const [passwordCheck, setPasswordCheck] = React.useState('');
  return (
    <SafeAreaView>
      <View style={styles.title}>
        <Text style={styles.text}>사용하실 비밀번호를</Text>
        <Text style={styles.text}>입력해 주세요.</Text>
      </View>
      <InputArea text="비밀번호 입력" input={password} setInput={setPassword} />
      <InputArea text="비밀번호 확인" input={passwordCheck} setInput={setPasswordCheck} />
    </SafeAreaView>
  );
};

export default Password;

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
  swmIcon: {
    width: 20,
    height: 20,
  },
});
