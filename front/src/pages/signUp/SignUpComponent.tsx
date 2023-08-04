import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Linking} from 'react-native';
import {variables} from '../../style/variables';

interface PasswordInputAreaProps {
  text: string;
  input: string;
  setInput: (text: string) => void;
}

interface EmailInputAreaProps {
  text: string;
  btnText: string;
  setInput: (text: string) => void;
  input: string;
  func?: () => void;
  disabled?: boolean;
  defaultValue?: string;
}

interface CheckBtnProps {
  text: string;
  link: string;
  on: boolean;
  onPress: () => void;
}

const PasswordInputArea: React.FC<PasswordInputAreaProps> = ({text, input, setInput}) => {
  const [masking, setMasking] = React.useState(true);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputContainer}
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
    <View style={styles.container}>
      <TextInput
        value={input}
        onChangeText={setInput}
        style={styles.inputContainer}
        placeholder={text}
        keyboardType={'email-address'}
        defaultValue={defaultValue}
      />
      {func ? (
        <TouchableOpacity
          style={disabled ? styles.disableInputBtn : styles.inputBtn}
          onPress={func}
          disabled={disabled}>
          <Text style={disabled ? styles.disableBtnInnerText : styles.BtnInnerText}>{btnText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
interface EmailRenderAreaProps {
  value: string;
}
const EmailRenderArea: React.FC<EmailRenderAreaProps> = ({value}) => {
  return (
    <View style={[styles.container, styles.marginBottomAdd]}>
      <Text style={styles.renderEmailText}>{value}</Text>
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
      <Text style={styles.linkText} onPress={() => Linking.openURL(link)}>
        보기
      </Text>
    </TouchableOpacity>
  );
};

export {PasswordInputArea, EmailInputArea, EmailRenderArea, CheckBtn};

const styles = StyleSheet.create({
  container: {
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
  inputContainer: {
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
