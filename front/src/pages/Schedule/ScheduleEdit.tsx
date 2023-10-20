import React, {useCallback, useState} from 'react';
import {SafeAreaView, Alert} from 'react-native';
import Config from 'react-native-config';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../util/redux/store';
import {setScheduleReducer} from '../../util/redux/scheduleSlice';
import {postBoardReducer, setBoardReducer} from '../../util/redux/boardSlice';
import {patchScheduleItem} from '../../api/scheduleApi';
import {fetchBoardData, postBoardData} from '../../api/boardApi';
import {SetBoardData} from '../../util/dataConvert';
import Header from '../../components/Header';
import ScheduleEditOption from './ScheduleEditOption';

//? 스케줄 편집하는 스크린
const ScheduleEdit = ({route}: any) => {
  const url = Config.API_APP_KEY as string;
  const user = useSelector((state: any) => state.user);
  const boardData = useSelector((state: RootState) => state.board);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const initialData = route.params.item;

  const [updateData, setUpdateData] = useState(() => {
    if (initialData.period === 'SPECIFIC_TIME') {
      return {
        ...initialData,
        startAt: initialData.startAt.substring(0, 16),
        endAt: initialData.endAt.substring(0, 16),
      };
    }
    return initialData;
  });

  const handleNotificationChange = (selectedAlerts: number[] | null) => {
    setUpdateData((prevState: number[]) => ({
      ...prevState,
      alerts: selectedAlerts ? [...selectedAlerts] : [],
    }));
  };

  const handleEditSchedule = async () => {
    if (!updateData.title || !updateData.tag) {
      Alert.alert('일정과 보드를 작성해주세요.');
      return;
    }

    let formattedStartAt;
    let formattedEndAt;
    if (updateData.period === 'ALL_DAY') {
      formattedStartAt = `${updateData.startAt.split(' ')[0]} 00:00:00`;
      formattedEndAt = `${updateData.endAt.split(' ')[0]} 23:59:59`;
    } else if (updateData.period === 'SPECIFIC_TIME') {
      formattedStartAt = `${updateData.startAt}:00`;
      formattedEndAt = `${updateData.endAt}:00`;
    } else {
      formattedStartAt = updateData.startAt;
      formattedEndAt = updateData.endAt;
    }

    const finalUpdateData = {
      title: updateData.title,
      startAt: formattedStartAt,
      endAt: formattedEndAt,
      period: updateData.period,
      alerts: updateData.alerts,
      complete: updateData.complete,
      content: updateData.content,
      tagId: updateData.tagId,
    };

    if (url) {
      try {
        let boardResponse;

        if (updateData.tag.name !== '전체') {
          const tagExists = boardData.find(
            (tag: any) => tag.name === updateData.tag.name && tag.color === updateData.tag.color,
          );

          if (!tagExists && updateData.tag.name && updateData.tag.color) {
            boardResponse = await postBoardData(url, user.token, updateData.tag);
            dispatch(postBoardReducer(boardResponse.body.data));
            const newBoardId = boardResponse.body.data.tagId;
            finalUpdateData.tagId = newBoardId;
          } else if (tagExists) {
            finalUpdateData.tagId = tagExists.tagId;
          }
        }
        console.log('scheduleId:', updateData.scheduleId); //!
        console.log('finalUpdateData:', JSON.stringify(finalUpdateData, null, 2)); //!
        const result = await patchScheduleItem(
          url,
          user.token,
          updateData.scheduleId,
          finalUpdateData,
        );
        if (typeof result !== 'boolean' && result !== undefined) {
          dispatch(setScheduleReducer(result));
          const tagResponse: SetBoardData[] = await fetchBoardData(url, user.token);
          dispatch(setBoardReducer(tagResponse));

          console.log('스케줄 수정 성공!');
          navigation.goBack();
        }
      } catch (error) {
        Alert.alert(
          'Error',
          '예상치 못한 에러가 발생했습니다.\n프로그램 종료 후 다시 시도해 주세요.',
        );
        console.log('Error editing data', error);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setUpdateData(updateData);
      };
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="스케줄 편집" nextFunc={handleEditSchedule} />
      <ScheduleEditOption
        url={url}
        updateData={updateData}
        setUpdateData={setUpdateData}
        onNotificationChange={handleNotificationChange}
      />
    </SafeAreaView>
  );
};

export default ScheduleEdit;
