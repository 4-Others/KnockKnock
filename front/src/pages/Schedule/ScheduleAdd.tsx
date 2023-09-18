import React, {useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {addScheduleItem} from '../../util/redux/scheduleSlice';
import {AuthProps} from '../../navigations/StackNavigator';
import {ScheduleOption} from '../../components/ScheduleSelectOption';
import {SetScheduleData} from '../../util/dataConvert';
import Header from '../../components/Header';
import Config from 'react-native-config';

//? 스케줄 추가하는 스크린
const ScheduleAdd: React.FC<AuthProps> = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const url = Config.API_APP_KEY;
  const data: SetScheduleData = {
    title: '',
    content: '',
    period: 'ALL_DAY',
    startAt: '',
    endAt: '',
    alerts: [],
    complete: false,
    tag: {
      name: '',
      color: '',
    },
  };
  const [scheduleWillAdd, setScheduleWillAdd] = useState(data);
  const handleAddSchedule = async () => {
    if (url) {
      try {
        console.log(`${url}api/v1/schedule`, scheduleWillAdd);
        const response = await axios.post(`${url}api/v1/schedule`, scheduleWillAdd, {
          headers: {Authorization: `Bearer ${user.token}`},
        });

        if (response.status === 200 || response.status === 201) {
          dispatch(addScheduleItem(response.data));
          console.log('Success', 'Schedule add success!');
        }
      } catch (error: any) {
        console.error('Error saving data', error.request);
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="스케줄 등록" nextFunc={handleAddSchedule} />
      <ScheduleOption scheduleWillAdd={scheduleWillAdd} setScheduleWillAdd={setScheduleWillAdd} />
    </SafeAreaView>
  );
};
export default ScheduleAdd;
