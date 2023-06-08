import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {variables} from '../../../style/variables';

const Success: React.FC = () => {
  return (
    <View>
      <Text style={styles.text}>회원가입이</Text>
      <Text style={styles.text}>정상적으로 완료됐습니다!</Text>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({
  text: {
    fontFamily: variables.font_4,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5,
  },
});
