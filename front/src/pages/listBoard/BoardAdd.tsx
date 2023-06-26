import {StyleSheet, SafeAreaView, Text} from 'react-native';
import React from 'react';
import {variables} from '../../style/variables';

const BoardAdd = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>제목: 리스트 보드 추가</Text>
      <Text style={styles.text}>- 초대하기</Text>
      <Text style={styles.text}>- 카테고리 컬러</Text>
    </SafeAreaView>
  );
};

export default BoardAdd;

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
