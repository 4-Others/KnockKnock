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

interface PasswordInputAreaProps {
  text: string;
  input: string;
  setInput: (text: string) => void;
  compare?: string;
}

interface InputAreaProps {
  type: string;
  input: string;
  setInput: (text: string) => void;
  btnText?: string;
  compare?: string;
  func?: () => void;
  disabled?: boolean;
  defaultValue?: string;
  errorAlert?: () => void;
  masking?: boolean;
  keyType?: KeyboardTypeOptions;
}

interface PasswordVisibleIcon {
  masking: boolean;
  setMasking: React.Dispatch<React.SetStateAction<boolean>>;
}

interface EmailSendBtn {
  func: () => void;
  disabled: boolean;
  btnText: string;
}
interface EmailInputAreaProps {
  text: string;
  btnText: string;
  setInput: (text: string) => void;
  input: string;
  func?: () => void;
  disabled?: boolean;
  defaultValue?: string;
  masking?: boolean;
}

interface CheckBtnProps {
  text: string;
  on: boolean;
  onPress: () => void;
  link?: string;
}

const InputArea: React.FC<InputAreaProps> = props => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputBoxLayout}>
        <TextInput
          style={styles.inputBoxStyle}
          value={props.input}
          placeholder={`${props.type} 입력`}
          onChangeText={props.setInput}
          secureTextEntry={props.masking}
          keyboardType={props.keyType}
        />
      </View>
      {props.func && props.disabled && props.btnText && (
        <EmailSendBtn func={props.func} disabled={props.disabled} btnText={props.btnText} />
      )}
    </View>
  );
};

const PasswordInputArea: React.FC<PasswordInputAreaProps> = ({text, input, setInput, compare}) => {
  const [masking, setMasking] = React.useState(true);

  const passwordError = (value: string) => {
    if (value.length > 0) {
      if (text === '비밀번호 입력' && !isPasswordValid(value)) {
        return (
          <Text style={styles.alertText}>
            8자리 이상 영문, 숫자, 특수문자 1개를 포함한 비밀번호를 입력하세요.
          </Text>
        );
      }
      if (text === '비밀번호 재확인' && compare !== value) {
        return <Text style={styles.alertText}>비밀번호가 일치하지 않습니다.</Text>;
      } else return null;
    }
  };

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputBoxLayout}>
        <TextInput
          style={styles.inputBoxStyle}
          placeholder={text}
          value={input}
          onChangeText={setInput}
          keyboardType="ascii-capable"
          secureTextEntry={masking}
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
      {passwordError(input)}
    </View>
  );
};

const PasswordVisibleIcon: React.FC<PasswordVisibleIcon> = ({setMasking, masking}) => {
  return (
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
  );
};

const EmailSendBtn: React.FC<EmailSendBtn> = ({func, disabled, btnText}) => {
  return (
    <TouchableOpacity
      style={disabled ? styles.disableInputBtn : styles.inputBtn}
      onPress={func}
      disabled={disabled}>
      <Text style={disabled ? styles.disableBtnInnerText : styles.BtnInnerText}>{btnText}</Text>
    </TouchableOpacity>
  );
};

const EmailInputArea: React.FC<EmailInputAreaProps> = ({
  text,
  btnText,
  func,
  setInput,
  input,
  disabled,
  defaultValue,
}) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputBoxLayout}>
        <TextInput
          value={input}
          onChangeText={setInput}
          style={styles.inputBoxStyle}
          placeholder={text}
          keyboardType={'email-address'}
          defaultValue={defaultValue}
        />
        {func ? (
          <TouchableOpacity
            style={disabled ? styles.disableInputBtn : styles.inputBtn}
            onPress={func}
            disabled={disabled}>
            <Text style={disabled ? styles.disableBtnInnerText : styles.BtnInnerText}>
              {btnText}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {!isEmaildValid(input) && input.length > 0 ? (
        <Text style={styles.alertText}>올바른 이메일 주소를 입력하세요.</Text>
      ) : null}
    </View>
  );
};

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

export {InputArea, PasswordInputArea, EmailInputArea, CheckBtn};

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
    backgroundColor: variables.line_2,
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
