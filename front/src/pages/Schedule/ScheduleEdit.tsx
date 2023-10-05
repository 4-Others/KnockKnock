import {SafeAreaView, Alert} from 'react-native';
import React, {useState} from 'react';
import Config from 'react-native-config';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setScheduleItems} from '../../util/redux/scheduleSlice';
import Header from '../../components/Header';
import ScheduleOption from './ScheduleOption';

//? 스케줄 편집하는 스크린
const ScheduleEdit = ({route}: any) => {
  const url = Config.API_APP_KEY as string;
  const token = useSelector((state: any) => state.user.token);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const initialData = route.params.item;
  const [scheduleToEdit, setScheduleToEdit] = useState(initialData);

  const handleEditSchedule = async () => {
    try {
      const response = await axios.patch(
        `${url}/api/v1/schedule/${initialData.calendarId}`,
        scheduleToEdit,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      );

      if (response.status === 200) {
        dispatch(setScheduleItems(response.data));
        navigation.goBack();
      } else {
        throw new Error('스케줄 수정 실패.');
      }
    } catch (error) {
      Alert.alert('Error', '스케줄 수정을 실패했습니다.', [{text: 'OK'}]);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="스케줄 편집" />
      <ScheduleOption
        url={url}
        scheduleWillAdd={scheduleToEdit}
        setScheduleWillAdd={setScheduleToEdit}
      />
    </SafeAreaView>
  );
};

export default ScheduleEdit;
