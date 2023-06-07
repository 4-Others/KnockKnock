import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {variables} from '../../../style/variables';

const Password: React.FC = () => {
  return (
    <View>
      <Text style={styles.text}>사용하실 비밀번호를</Text>
      <Text style={styles.text}>입력해 주세요.</Text>
    </View>
  );
};

export default Password;

const styles = StyleSheet.create({
  text: {
    fontFamily: variables.font_4,
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 5,
  },
});
