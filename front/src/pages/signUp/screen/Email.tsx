import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {variables} from '../../../style/variables';

const Email: React.FC = () => {
  return (
    <View>
      <Text style={styles.text}>사용하실 이메일을</Text>
      <Text style={styles.text}>입력해 주세요.</Text>
    </View>
  );
};

export default Email;

const styles = StyleSheet.create({
  text: {
    fontFamily: variables.font_4,
    fontSize: 20,
    textAlign: 'left',
    marginBottom: 5,
  },
});
