import React, {useState, useCallback} from 'react';
import {SafeAreaView, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {postBoardReducer, setBoardReducer} from '../../util/redux/boardSlice';
import {postScheduleReducer} from '../../util/redux/scheduleSlice';
import {RootState} from '../../util/redux/store';
import {AuthProps} from '../../navigations/StackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {SetBoardData, SetScheduleData} from '../../util/dataConvert';
import Header from '../../components/Header';
import ScheduleAddOption from './ScheduleAddOption';
import {scheduleAPI} from '../../api/commonApi';

type RootStackParamList = {
  BoardDetail: {name: string; color: string; scheduleCount: number; tagId: number};
};
type ScheduleAddNavigationProp = StackNavigationProp<RootStackParamList>;

const ScheduleAdd: React.FC<AuthProps> = () => {
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
    alerts: [],
    complete: false,
  };
  const tagData: SetBoardData = {
    name: '전체',
    color: '#757575',
    scheduleCount: 0,
    tagId: 0,
  };
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [postSchedule, setPostSchedule] = useState(scheduleData);
  const [postTag, setPostTag] = useState(tagData);

  const handleNotificationChange = (selectedAlerts: number[] | null) => {
    setPostSchedule(prevState => ({
      ...prevState,
      alerts: selectedAlerts ? [...selectedAlerts] : [],
    }));
  };

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

    try {
      let boardResponse;

      if (postTag.name !== '전체') {
        const tagExists = boardData.find(
          (tag: any) => tag.name === postTag.name && tag.color === postTag.color,
        );
        if (!tagExists && postTag.name && postTag.color) {
          boardResponse = await scheduleAPI.tagPost(user.token, postTag);
          dispatch(postBoardReducer(boardResponse.body.data));
          const newBoardId = boardResponse.body.data.tagId;
          finalPostData.tagId = newBoardId;
        } else if (tagExists) {
          finalPostData.tagId = tagExists.tagId;
        }
      }

      const response = await scheduleAPI.schedulePost(user.token, finalPostData);
      dispatch(postScheduleReducer(response));
      const tagResponse: SetBoardData[] = await scheduleAPI.tagGet(user.token);
      dispatch(setBoardReducer(tagResponse));

      const selectedTag = tagResponse.find(
        tag => tag.name === postTag.name && tag.color === postTag.color,
      );
      if (!selectedTag) {
        console.error('보드 정보를 찾을 수 없습니다!');
        return;
      }

      navigation.navigate('BoardDetail', {
        name: selectedTag.name,
        color: selectedTag.color,
        tagId: selectedTag.tagId ?? 0,
        scheduleCount: selectedTag.scheduleCount ?? 0,
      });
    } catch (error) {
      Alert.alert(
        'Error',
        '예상치 못한 에러가 발생했습니다.\n프로그램 종료 후 다시 시도해 주세요.',
      );
      console.log('Error saving data', error);
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
        postSchedule={postSchedule}
        setPostSchedule={setPostSchedule}
        postTag={postTag}
        setPostTag={setPostTag}
        getCurrentDateStartAndEnd={getCurrentDateStartAndEnd}
        onNotificationChange={handleNotificationChange}
      />
    </SafeAreaView>
  );
};
export default ScheduleAdd;
