import {StyleSheet, SafeAreaView, StatusBar, Platform, Dimensions} from 'react-native';
import {View} from 'react-native-animatable';
import React, {useCallback, useState} from 'react';
import BoardPack from './BoardItems/BoardPack';
import BoardTab from './BoardItems/BoardTab';
import ProfileHeader from '../../components/ProfileHeader';
import boardData from './BoardItems/boardData.json';

const deviceWidth = Dimensions.get('window').width;

const ScheduleBoard = () => {
  const [active, setActive] = useState(boardData[0].boardId);

  const handleActiveChange = useCallback((newValue: React.SetStateAction<number>) => {
    setActive(newValue);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <ProfileHeader />
      <BoardTab active={active} onActiveChange={handleActiveChange} />
      <View style={styles.body}>
        <BoardPack active={active} onActiveChange={handleActiveChange} />
      </View>
    </SafeAreaView>
  );
};

export default ScheduleBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    ...Platform.select({
      ios: {top: (deviceWidth - 30) / 5},
      android: {top: (deviceWidth - 80) / 5},
    }),
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eeeeee',
  },
});
