import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
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
    period: '',
    startAt: start,
    endAt: end,
    alerts: [],
    complete: false,
    tag: {
      name: '전체',
      color: '#757575',
    },
  };
  const [scheduleWillAdd, setScheduleWillAdd] = useState(data);
  const handleAddSchedule = async () => {
    if (!scheduleWillAdd.title) {
      console.error('Title is required.');
      return;
    }

    if (scheduleWillAdd.startAt !== start && scheduleWillAdd.endAt !== end) {
      scheduleWillAdd.period = 'SPECIFIC_TIME';
    } else {
      scheduleWillAdd.period = 'ALL_DAY';
      scheduleWillAdd.startAt = start;
      scheduleWillAdd.endAt = end;
    }

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
