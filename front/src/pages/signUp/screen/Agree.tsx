import * as React from 'react';
import {SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, Linking} from 'react-native';
import {variables} from '../../../style/variables';
import {CheckBox} from '../../login/Login';

interface CheckBtn {
  text: string;
  link: string;
}

export const CheckBtn: React.FC<CheckBtn> = ({text, link}) => {
  const [on, setOn] = React.useState(false);
  return (
    <TouchableOpacity style={styles.essential} onPress={() => setOn(!on)}>
      <Image
        style={on ? styles.checkImg : styles.unCheckImg}
        source={require('front/assets/image/check.png')}
      />
      <Text style={styles.unCheckText}>{text}</Text>
      <Text style={styles.linkText} onPress={() => Linking.openURL(link)}>
        보기
      </Text>
    </TouchableOpacity>
  );
};

const Agree: React.FC = () => {
  return (
    <SafeAreaView>
      <View style={styles.title}>
        <Text style={styles.text}>서비스 이용약관에</Text>
        <Text style={styles.text}>동의해 주세요.</Text>
      </View>
      <View style={styles.allAgree}>
        <CheckBox />
        <Text style={styles.unCheckText}>모두 동의하십니까?</Text>
      </View>
      <View style={styles.essentials}>
        <CheckBtn text="[필수] 만 14세 이상입니다." link="www.m.naver.com" />
        <CheckBtn text="[필수] 이용약관 동의" link="www.m.naver.com" />
        <CheckBtn text="[필수] 개인정보 수집 및 이용 동의" link="www.m.naver.com" />
      </View>
    </SafeAreaView>
  );
};

export default Agree;

const styles = StyleSheet.create({
  title: {
    marginBottom: 24,
  },
  text: {
    fontFamily: variables.font_4,
    fontSize: 24,
    textAlign: 'left',
    marginBottom: 5,
  },
  allAgree: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  unCheckText: {
    fontFamily: variables.font_4,
    fontSize: 14,
    color: variables.text_3,
    marginLeft: 10,
  },
  checkText: {
    fontFamily: variables.font_4,
    fontSize: 14,
    color: variables.text_3,
    marginLeft: 10,
  },
  essentials: {
    borderTopColor: variables.line_1,
    borderTopWidth: 1,
    paddingTop: 16,
  },
  unCheckImg: {
    width: 12,
    height: 12,
    tintColor: '#ddd',
  },
  checkImg: {
    width: 12,
    height: 12,
    tintColor: variables.main,
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
});
