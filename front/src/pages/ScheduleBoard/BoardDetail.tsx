import {StyleSheet, SafeAreaView, Text} from 'react-native';
import React from 'react';
import {variables} from '../../style/variables';

const BoardDetail = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>1. 아침먹고 땡,</Text>
      <Text style={styles.text}>2. 점심먹고 땡,</Text>
      <Text style={styles.text}>3. 창문을 열어보니 비가 오네요~</Text>
    </SafeAreaView>
  );
};

export default BoardDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Pretendard-Medium',
    color: variables.main,
    fontSize: 30,
  },
});
