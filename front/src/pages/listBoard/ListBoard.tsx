import {StyleSheet, SafeAreaView, StatusBar, Platform, Dimensions} from 'react-native';
import {View} from 'react-native-animatable';
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
    ...Platform.select({
      ios: {top: (deviceWidth - 30) / 8},
      android: {top: (deviceWidth - 180) / 8},
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  drawer: {
    position: 'absolute',
    fontFamily: 'Pretendard-Medium',
    color: variables.text_1,
    fontSize: 18,
    top: 18,
    right: 22,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
  },
  symbolLogo: {
    width: 140,
    height: 60,
  },
});

export default ListBoard;
