import {StyleSheet, SafeAreaView, StatusBar, Platform, Dimensions} from 'react-native';
import {View} from 'react-native-animatable';
import React, {useCallback, useState} from 'react';
import {variables} from '../../style/variables';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import BoardPack from './listBoardItems/BoardPack';
import BoardTab from './listBoardItems/BoardTab';
import LogoMark from '../../../assets/image/LogoMark';
import boardData from './listBoardItems/boardData.json';

const deviceWidth = Dimensions.get('window').width;

const ListBoard = () => {
  const [active, setActive] = useState(boardData[0].listBoardId);

  const handleActiveChange = useCallback((newValue: React.SetStateAction<number>) => {
    setActive(newValue);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <LogoMark darkMode={false} />
        <Icon name="menu" style={styles.drawer} />
      </View>
      <BoardTab active={active} onActiveChange={handleActiveChange} />
      <View></View>
      <View style={styles.body}>
        <BoardPack active={active} onActiveChange={handleActiveChange} />
      </View>
    </SafeAreaView>
  );
};

export default ListBoard;

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
    right: 22,
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
  },
});
