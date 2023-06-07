import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {variables} from '../../../style/variables';

const Agree: React.FC = () => {
  return (
    <View>
      <Text style={styles.text}>서비스 이용약관에</Text>
      <Text style={styles.text}>동의해 주세요.</Text>
    </View>
  );
};

export default Agree;

const styles = StyleSheet.create({
  text: {
    fontFamily: variables.font_4,
    fontSize: 24,
    textAlign: 'left',
    marginBottom: 5,
  },
});
