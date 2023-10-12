import React, {useState, useEffect, useRef, useCallback} from 'react';
import {StyleSheet, SafeAreaView, StatusBar, Platform, Dimensions} from 'react-native';
import {View} from 'react-native-animatable';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setBoardReducer} from '../../util/redux/boardSlice';
import {RootState} from '../../util/redux/store';
import {fetchBoardData} from '../../api/boardApi';
import {AuthProps} from '../../navigations/StackNavigator';
import {BoardItem} from '../../util/dataConvert';
import ProfileHeader from '../../components/ProfileHeader';
import BoardPack from './BoardItems/BoardPack';
import BoardTab from './BoardItems/BoardTab';

const deviceWidth = Dimensions.get('window').width;

const ScheduleBoard: React.FC<AuthProps> = ({url}) => {
  const carouselRef = useRef<Carousel<BoardItem>>(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const boardData = useSelector((state: RootState) => state.board);
  const token = useSelector((state: any) => state.user.token);
  const [active, setActive] = useState<number | null>(boardData[0] ? boardData[0].tagId : null);
  console.log('boardData:', boardData); //!
  useEffect(() => {
    if (url) {
      const fetchData = async () => {
        try {
          const data = await fetchBoardData(url, token);
          console.log('Fetched board data:', data); //!
          dispatch(setBoardReducer(data));
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [url, token, dispatch]);

  useEffect(() => {
    if (boardData.length > 0) {
      setActive(boardData[0].tagId);
    }
  }, [boardData]);

  useEffect(() => {
    console.log('Checking boardData type:', Array.isArray(boardData), boardData); //!
    const activeIndex = boardData.findIndex(data => data.tagId === active);
    if (activeIndex !== -1) {
      carouselRef.current?.snapToItem(activeIndex, false);
    }
  }, [active, boardData]);
  const handleActiveChange = useCallback((newValue: React.SetStateAction<number | null>) => {
    setActive(newValue);
  }, []);

  if (!url) {
    navigation.goBack();
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <ProfileHeader />
      <BoardTab active={active} onActiveChange={handleActiveChange} />
      <View style={styles.body}>
        <BoardPack active={active} onActiveChange={handleActiveChange} carouselRef={carouselRef} />
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
