import React, {useState, useEffect, useRef, useCallback} from 'react';
import {StyleSheet, SafeAreaView, StatusBar, Platform, Dimensions} from 'react-native';
import {View} from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useSelector} from 'react-redux';
import BoardPack from './BoardItems/BoardPack';
import BoardTab from './BoardItems/BoardTab';
import ProfileHeader from '../../components/ProfileHeader';
import {AuthProps} from '../../navigations/StackNavigator';
import {BoardDataItem} from '../../util/dataConvert';

const deviceWidth = Dimensions.get('window').width;

const ScheduleBoard: React.FC<AuthProps> = ({url}) => {
  const [boardData, setBoardData] = useState<BoardDataItem[]>([]);
  const [active, setActive] = useState<number | null>(boardData[0] ? boardData[0].tagId : null);
  const carouselRef = useRef<any>(null);
  const navigation = useNavigation();
  const token = useSelector((state: any) => state.user.token);

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${url}api/v1/tags`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('API Response:', response.data.body.data);
          setBoardData(response.data.body.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [token]);

  useEffect(() => {
    if (boardData.length > 0) {
      setActive(boardData[0].tagId);
    }
  }, [boardData]);

  useEffect(() => {
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
        <BoardPack
          url={url}
          active={active}
          onActiveChange={handleActiveChange}
          carouselRef={carouselRef}
          boardData={boardData}
        />
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
