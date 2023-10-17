import React, {useState, useCallback} from 'react';
import {SafeAreaView, Alert} from 'react-native';
import Config from 'react-native-config';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {postBoardReducer} from '../../util/redux/boardSlice';
import {postScheduleReducer} from '../../util/redux/scheduleSlice';
import {RootState} from '../../util/redux/store';
import {AuthProps} from '../../navigations/StackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {postBoardData} from '../../api/boardApi';
import {postScheduleItem} from '../../api/scheduleApi';
import {SetBoardData, SetScheduleData} from '../../util/dataConvert';
import Header from '../../components/Header';
import ScheduleAddOption from './ScheduleAddOption';

type RootStackParamList = {
  BoardDetail: {name: string; color: string; scheduleCount: number};
};
type ScheduleAddNavigationProp = StackNavigationProp<RootStackParamList>;

const ScheduleAdd: React.FC<AuthProps> = () => {
  const url = Config.API_APP_KEY;
  const navigation = useNavigation<ScheduleAddNavigationProp>();
  const boardData = useSelector((state: RootState) => state.board);

  const getCurrentDateStartAndEnd = () => {
    const date = new Date();
    const startAt = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endAt = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const formatDate = (date: Date) => {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
        date.getDate(),
      ).padStart(2, '0')}`;
    };
    return {
      start: formatDate(startAt),
      end: formatDate(endAt),
    };
  };

  const {start, end} = getCurrentDateStartAndEnd();

  const scheduleData: SetScheduleData = {
    title: '',
    content: '',
    period: 'ALL_DAY',
    startAt: start,
    endAt: end,
    alerts: [0],
    complete: false,
  };
  const tagData: SetBoardData = {
    name: '전체',
    color: '#757575',
    scheduleCount: 1,
  };
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [postSchedule, setPostSchedule] = useState(scheduleData);
  const [postTag, setPostTag] = useState(tagData);

  const handleAddSchedule = async () => {
    if (!postSchedule.title || !postTag) {
      Alert.alert('일정과 보드를 작성해주세요.');
      return;
    }

    let formattedStartAt;
    let formattedEndAt;
    if (postSchedule.period === 'ALL_DAY') {
      formattedStartAt = `${postSchedule.startAt} 00:00:00`;
      formattedEndAt = `${postSchedule.endAt} 23:59:59`;
    } else {
      formattedStartAt = `${postSchedule.startAt}:00`;
      formattedEndAt = `${postSchedule.endAt}:00`;
    }

    const finalPostData = {
      ...postSchedule,
      startAt: formattedStartAt,
      endAt: formattedEndAt,
    };

    if (url) {
      try {
        if (postTag.name !== '전체') {
          const tagExists = boardData.find(
            (tag: any) => tag.name === postTag.name && tag.color === postTag.color,
          );

          if (!tagExists && postTag.name && postTag.color) {
            const boardResponse = await postBoardData(url, user.token, postTag);
            dispatch(postBoardReducer(boardResponse.body.data));
            const newBoardId = boardResponse.body.data.tagId;
            finalPostData.tagId = newBoardId;
          } else if (tagExists) {
            finalPostData.tagId = tagExists.tagId;
          }
        }
        const response = await postScheduleItem(url, user.token, finalPostData);
        dispatch(postScheduleReducer(response));
        console.log('스케줄 등록 성공!');
        navigation.navigate('BoardDetail', {
          name: postTag.name,
          color: postTag.color,
          scheduleCount: postTag.scheduleCount ?? 0,
        });
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
        setPostSchedule(scheduleData);
        setPostTag(tagData);
      };
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="스케줄 등록" nextFunc={handleAddSchedule} />
      <ScheduleAddOption
        url={url}
        postSchedule={postSchedule}
        setPostSchedule={setPostSchedule}
        postTag={postTag}
        setPostTag={setPostTag}
        getCurrentDateStartAndEnd={getCurrentDateStartAndEnd}
      />
    </SafeAreaView>
  );
};
export default ScheduleAdd;
