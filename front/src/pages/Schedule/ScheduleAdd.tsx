import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, Alert} from 'react-native';
import {variables} from '../../style/variables';
import axios from 'axios';
import {RouteProps} from '../../navigations/StackNavigator';
import Header from '../../components/Header';
import {ScheduleOption} from '../../components/ScheduleSelectOption';
import {useSelector} from 'react-redux';

//? 스케줄 추가하는 스크린
const ScheduleAdd: React.FC<RouteProps> = ({url}) => {
  const user = useSelector((state: any) => state.user);
  console.log(user);
  const [scheduleData, setScheduleData] = useState(null);

  const handleAddSchedule = async () => {
    if (scheduleData) {
      try {
        const response = await axios.post(`${url}api/v1/schedule`, {
          user,
          schedule: scheduleData,
        });
        Alert.alert('Success', '스케줄이 성공적으로 등록되었습니다.');
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
      <ScheduleOption setScheduleData={setScheduleData} />
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
