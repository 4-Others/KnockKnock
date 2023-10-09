import React, {useState, useCallback} from 'react';
import {SafeAreaView, Alert} from 'react-native';
import Config from 'react-native-config';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {addScheduleItem} from '../../util/redux/scheduleSlice';
import {RootState} from '../../util/redux/store';
import {AuthProps} from '../../navigations/StackNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {postScheduleItem} from '../../api/scheduleApi';
import {postBoardData} from '../../api/boardApi';
import {SetBoardData, SetScheduleData} from '../../util/dataConvert';
import Header from '../../components/Header';
import ScheduleAddOption from './ScheduleAddOption';

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
    tag: {
      name: '전체',
      color: '#757575',
    },
  };
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const [postSchedule, setPostSchedule] = useState(scheduleData);
  const [postTag, setPostTag] = useState(tagData);

  const handleAddSchedule = async () => {
    if (!postSchedule.title || !postTag.tag) {
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
        if (postTag.tag.name !== '전체') {
          const tagExists = boardData.find(
            (tag: any) => tag.name === postTag.tag.name && tag.color === postTag.tag.color,
          );

          if (!tagExists && postTag.tag.name && postTag.tag.color) {
            await postBoardData(url, user.token, {tag: postTag.tag});
          } else if (tagExists) {
            const existingTag = boardData.find(
              (tag: any) => tag.name === postTag.tag.name && tag.color === postTag.tag.color,
            );
            if (existingTag) {
              finalPostData.tagId = existingTag.tagId;
            }
          }
        }
        console.log('finalPostData: ', JSON.stringify(finalPostData, null, 2));
        const response = await postScheduleItem(url, user.token, finalPostData);
        dispatch(addScheduleItem(response));
        console.log('스케줄 등록 성공!');
        navigation.navigate('BoardDetail', {
          title: postTag.tag.name,
          color: postTag.tag.color,
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
