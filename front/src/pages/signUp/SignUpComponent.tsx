import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Linking,
  KeyboardTypeOptions,
} from 'react-native';
import {variables} from '../../style/variables';
import {isPasswordValid, isEmaildValid} from '../../util/authUtil';

interface InputAreaProps {
  type: string;
  input: string;
  setInput: (text: string) => void;
  btnText?: string;
  compare?: string;
  func?: () => void;
  disabled?: boolean;
  errorMessage?: string;
  keyType?: KeyboardTypeOptions;
}

interface PasswordVisibleIcon {
  masking: boolean;
  setMasking: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CheckBtnProps {
  text: string;
  on: boolean;
  onPress: () => void;
  link?: string;
}

// 체크박스 UI
const CheckBtn: React.FC<CheckBtnProps> = ({text, link, on, onPress}) => {
  return (
    <TouchableOpacity style={styles.essential} onPress={onPress}>
      <Image
        style={on ? [styles.checkImg, styles.largeCheck] : [styles.unCheckImg, styles.largeCheck]}
        source={require('front/assets/image/check.png')}
      />
      <Text style={styles.unCheckText}>{text}</Text>
      {link ? (
        <Text style={styles.linkText} onPress={() => Linking.openURL(link)}>
          보기
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};
const InputArea: React.FC<InputAreaProps> = props => {
  const [masking, setMasking] = useState(true);
  const {type, input, setInput, compare, errorMessage, keyType} = props;
  const isPasswordInput = type.includes('비밀번호');

  const validationError = (value: string) => {
    if (value.length > 0) {
      if (type === '비밀번호' && !isPasswordValid(value)) {
        return (
          <Text style={styles.alertText}>
            8자리 이상 영문, 숫자, 특수문자 1개를 포함한 비밀번호를 입력하세요.
          </Text>
        );
      }
      if (type === '비밀번호 다시' && compare !== value) {
        return <Text style={styles.alertText}>비밀번호가 일치하지 않습니다.</Text>;
      }
    }
  };

  const ErrorMessage = (value: string) => {};

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputBoxLayout}>
        <TextInput
          style={styles.inputBoxStyle}
          value={input}
          placeholder={`${type} 입력`}
          onChangeText={setInput}
          secureTextEntry={isPasswordInput ? masking : false}
          keyboardType={keyType}
        />
        <RenderBtn {...{...props, masking, setMasking}} />
      </View>
      <Text style={styles.alertText}>{errorMessage}</Text>
    </View>
  );
};

const RenderBtn: React.FC<InputAreaProps & PasswordVisibleIcon> = props => {
  if (props.func) {
    return (
      <TouchableOpacity
        style={props.disabled === true ? styles.disableInputBtn : styles.inputBtn}
        onPress={props.func}
        disabled={props.disabled}>
        <Text style={props.disabled ? styles.disableBtnInnerText : styles.BtnInnerText}>
          {props.btnText}
        </Text>
      </TouchableOpacity>
    );
  }
  // 비번 눈 아이콘
  else if (props.type.includes('비밀번호')) {
    return (
      <TouchableOpacity onPress={() => props.setMasking(open => !open)}>
        <Image
          style={styles.swmIcon}
          source={
            props.masking
              ? require('front/assets/image/swm_close_btn.png')
              : require('front/assets/image/swm_open_btn.png')
          }
        />
      </TouchableOpacity>
    );
  }
};

export {InputArea, CheckBtn};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  inputBoxLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    paddingBottom: 10,
    marginBottom: 10,
  },
  marginBottomAdd: {
    marginTop: 10,
  },
  inputBoxStyle: {
    fontFamily: variables.font_4,
    fontSize: 14,
    color: variables.text_3,
    paddingTop: 0,
  },
  swmIcon: {
    width: 20,
    height: 20,
  },
  bottomButton: {
    bottom: 0,
    marginBottom: 60,
  },
  alertText: {
    fontFamily: variables.font_4,
    color: variables.board_8,
    lineHeight: 20,
  },
  inputBtn: {
    backgroundColor: variables.line_1,
    borderWidth: 1,
    borderColor: variables.line_2,
    padding: 6,
    borderRadius: 4,
    marginBottom: 8,
  },
  disableInputBtn: {
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
  disableBtnInnerText: {
    fontFamily: variables.font_4,
    fontSize: 12,
    color: variables.text_7,
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
  smallCheck: {width: 10, height: 6},
  largeCheck: {width: 12, height: 12},
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
  renderEmailText: {
    fontFamily: variables.font_4,
    fontSize: 14,
    color: variables.text_6,
    marginBottom: 10,
  },
});
