import {StyleSheet, SafeAreaView, Text} from 'react-native';
import React from 'react';
import {variables} from '../../style/variables';
import LogoMark from '../../../assets/image/LogoMark';

const ListBoard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>응애, 나 애기 ListBoard</Text>
      <LogoMark darkMode={false} />
    </SafeAreaView>
  );
};

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
  symbolLogo: {
    width: 140,
    height: 60,
  },
});

export default ListBoard;
