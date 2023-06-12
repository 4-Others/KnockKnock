import {StyleSheet, SafeAreaView, StatusBar, Platform, Dimensions} from 'react-native';
import {View} from 'react-native-animatable';
import React from 'react';
import {variables} from '../../style/variables';
import ListBoardPack from './listBoardItems/ListBoardPack';
import ListTab from './listBoardItems/ListTab';
import LogoMark from '../../../assets/image/LogoMark';

const ListBoard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <LogoMark darkMode={false} />
        <Text style={styles.drawer}>icon</Text>
      </View>
      <ListTab />
      <View style={styles.body}>
        <ListBoardPack />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
  },
});

export default ListBoard;
