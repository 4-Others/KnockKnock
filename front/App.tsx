import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {variables} from './src/style/variables';
import {GradientButton_S, GradientButton_L} from './src/components/GradientButton';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>윙가디움 레비오사</Text>
        <GradientButton_S text="확  인" />
        <GradientButton_L text="로그인" />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontFamily: 'Pretendard-Black',
    color: variables.main,
  },
});
