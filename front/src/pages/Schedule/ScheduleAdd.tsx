import React, {useState, useCallback} from 'react';
import {SafeAreaView, Alert} from 'react-native';
import Config from 'react-native-config';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {addScheduleItem} from '../../util/redux/scheduleSlice';
import {RootState} from '../../util/redux/store';
import {AuthProps} from '../../navigations/StackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import ScheduleOption from './ScheduleOption';
import {SetScheduleData} from '../../util/dataConvert';
import Header from '../../components/Header';

type RootStackParamList = {
  BoardDetail: {title: string; color: string};
};
type ScheduleAddNavigationProp = StackNavigationProp<RootStackParamList>;

//? 스케줄 추가하는 스크린
const ScheduleAdd: React.FC<AuthProps> = () => {
  const url = Config.API_APP_KEY;
  const navigation = useNavigation<ScheduleAddNavigationProp>();
  const boardData = useSelector((state: RootState) => state.board);

  const getCurrentDateStartAndEnd = () => {
    const date = new Date();
    const startAt = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    const endAt = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

    const formatDateTime = (date: Date) => {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
        date.getDate(),
      ).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(
        date.getMinutes(),
      ).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    };
    return {
      start: formatDateTime(startAt),
      end: formatDateTime(endAt),
    };
  };

  const {start, end} = getCurrentDateStartAndEnd();

  const data: SetScheduleData = {
    title: '',
    content: '',
    period: 'ALL_DAY',
    startAt: start,
    endAt: end,
    alerts: [],
    complete: false,
    tag: {
      name: '전체',
      color: '#757575',
    },
  };
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [scheduleWillAdd, setScheduleWillAdd] = useState(data);

  const handleAddSchedule = async () => {
    if (!scheduleWillAdd.title || !scheduleWillAdd.tag) {
      Alert.alert('일정과 보드를 작성해주세요.');
      return;
    }

    if (url) {
      try {
        if (scheduleWillAdd.tag.name !== '전체') {
          const tagExists = boardData.some(
            (tag: any) =>
              tag.name === scheduleWillAdd.tag.name && tag.color === scheduleWillAdd.tag.color,
          );

          if (!tagExists && scheduleWillAdd.tag.name && scheduleWillAdd.tag.color) {
            const allTagIds = boardData.map((tag: any) => tag.tagId);
            let newTagId = 1;
            while (allTagIds.includes(newTagId)) {
              newTagId++;
            }
            scheduleWillAdd.tag.tagId = newTagId;

            await axios.post(`${url}api/v1/tags`, scheduleWillAdd.tag, {
              headers: {Authorization: `Bearer ${user.token}`},
            });
          } else if (tagExists) {
            const existingTag = boardData.find(
              (tag: any) =>
                tag.name === scheduleWillAdd.tag.name && tag.color === scheduleWillAdd.tag.color,
            );
            if (existingTag) {
              scheduleWillAdd.tag.tagId = existingTag.tagId;
            }
          }
        }
        console.log('scheduleWillAdd: ', scheduleWillAdd);
        const response = await axios.post(`${url}api/v1/schedule`, scheduleWillAdd, {
          headers: {Authorization: `Bearer ${user.token}`},
        });
        if (response.status === 200 || response.status === 201) {
          dispatch(addScheduleItem(response.data));
          console.log('스케줄 등록 성공!');
          navigation.navigate('BoardDetail', {
            title: scheduleWillAdd.tag.name,
            color: scheduleWillAdd.tag.color,
          });
        }
      } catch (error) {
        Alert.alert(
          'Error',
          '예상치 못한 에러가 발생했습니다.\n프로그램 종료 후 다시 시도해 주세요.',
        );
        console.log('Error saving data', error);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setScheduleWillAdd(data);
      };
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="스케줄 등록" nextFunc={handleAddSchedule} />
      <ScheduleOption
        url={url}
        scheduleWillAdd={scheduleWillAdd}
        setScheduleWillAdd={setScheduleWillAdd}
        getCurrentDateStartAndEnd={getCurrentDateStartAndEnd}
      />
    </SafeAreaView>
  );
};
export default ScheduleAdd;
