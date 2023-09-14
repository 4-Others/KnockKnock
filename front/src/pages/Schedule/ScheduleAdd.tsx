import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, Alert} from 'react-native';
import axios from 'axios';
import {variables} from '../../style/variables';
import {useDispatch, useSelector} from 'react-redux';
import {addScheduleItem} from '../../util/redux/scheduleSlice';
import {AuthProps} from '../../navigations/StackNavigator';
import {ScheduleOption} from '../../components/ScheduleSelectOption';
import {ScheduleData} from '../../util/dataConvert';
import Header from '../../components/Header';

//? 스케줄 추가하는 스크린
const ScheduleAdd: React.FC<AuthProps> = ({url}) => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const initialScheduleData: ScheduleData = {
    calendarId: 0,
    name: '',
    height: 0,
    day: '',
    complete: false,
    startAt: '',
    endAt: '',
    content: '',
    period: 'ALL_DAY',
    alerts: [],
    modifiedAt: '',
    tag: {
      name: '',
      color: '',
    },
  };
  const [scheduleWillAdd, setScheduleWillAdd] = useState(initialScheduleData);

  const handleAddSchedule = async () => {
    if (scheduleWillAdd !== initialScheduleData) {
      try {
        console.log(scheduleWillAdd);
        const response = await axios.post(
          `${url}api/v1/schedule`,
          {
            schedule: scheduleWillAdd,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        );
        if (response.status === 200 || response.status === 201) {
          dispatch(addScheduleItem(response.data));
          console.log('Success', '스케줄 등록에 성공했습니다.');
        }
      } catch (error: any) {
        console.error('Error saving data', error);
        Alert.alert('Error', '스케줄 등록에 실패했습니다.');
      }
    } else {
      Alert.alert('Warning', '스케줄 정보를 입력해주세요.');
    }
  };

  return (
    <SafeAreaView style={scheduleOptionStyles.container}>
      <Header title="스케줄 등록" nextFunc={handleAddSchedule} />
      <ScheduleOption scheduleWillAdd={scheduleWillAdd} setScheduleWillAdd={setScheduleWillAdd} />
    </SafeAreaView>
  );
};
export default ScheduleAdd;

export const scheduleOptionStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentLayout: {
    marginRight: 24,
    marginLeft: 24,
    marginTop: 24,
  },
  contentTitleInput: {
    fontFamily: variables.font_3,
    color: variables.text_2,
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: variables.line_1,
    paddingBottom: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  contentInput: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginRight: 30,
  },
  inputContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: variables.line_1,
    paddingBottom: 16,
  },
  inputTitle: {
    fontFamily: variables.font_3,
    color: variables.text_2,
    fontSize: 14,
  },
});
