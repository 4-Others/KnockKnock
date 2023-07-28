import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {variables} from '../../style/variables';

const Oauth2 = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.partition} />
        <Text style={styles.text}>다음 계정으로 로그인 / 회원가입</Text>
        <View style={styles.partition} />
      </View>
      <View style={styles.wrapper}>
        <TouchableOpacity>
          <Image source={require('front/assets/image/google_login.png')} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require('front/assets/image/kakao_login.png')} style={styles.logo} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Oauth2;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  partition: {
    flex: 1,
    marginRight: 2,
    marginLeft: 2,
    height: 0.6,
    backgroundColor: variables.line_1,
  },
  text: {
    marginRight: 6,
    marginLeft: 6,
    fontFamily: variables.font_4,
    fontSize: 14,
    color: variables.text_4,
  },
  logo: {
    marginRight: 8,
    marginLeft: 8,
    width: 50,
    height: 50,
  },
});
