import {StyleSheet, SafeAreaView, Text} from 'react-native';
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
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 30,
    paddingRight: 22,
    paddingBottom: 20,
    paddingLeft: 22,
  },
  drawer: {
    position: 'absolute',
    fontFamily: 'Pretendard-Medium',
    color: variables.text_1,
    fontSize: 18,
    top: 15,
    right: 22,
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
  },
});

export default ListBoard;
