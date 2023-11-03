import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, View, TextInput} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {variables} from '../../style/variables';
import {SearchData} from '../../util/dataConvert';
import Header from '../../components/Header';
import ScheduleOptionSelect from '../../components/ScheduleOptionSelect';
import {AuthProps} from '../../navigations/StackNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {ScheduleItems, setScheduleReducer} from '../../util/redux/scheduleSlice';
import {scheduleAPI} from '../../api/commonApi';

const Search: React.FC<AuthProps> = ({navigation}) => {
  const dateFormat = (date: Date) => date.toISOString().split('T')[0];
  const data: SearchData = {
    keyword: '',
    startAt: dateFormat(new Date()),
    endAt: dateFormat(new Date()),
  };
  const [visible, setVisible] = useState(false);
  const [timeType, setTimeType] = useState('');
  const [searchData, setSearchData] = useState(data);
  const {keyword, startAt, endAt} = searchData;
  const items = useSelector((state: any) => state.schedule.items);
  const dispatch = useDispatch();
  const setItems = (newItems: ScheduleItems) => {
    dispatch(setScheduleReducer(newItems));
  };
  const user = useSelector((state: any) => state.user);

  const toggleStartAt = () => {
    setVisible(!visible);
    setTimeType('start');
  };

  const toggleEndAt = () => {
    setVisible(!visible);
    setTimeType('end');
  };

  const onCancel = () => {
    setVisible(false);
  };

  const handleConfirm = (date: Date) => {
    onCancel();
    setSearchData(prevState => ({
      ...prevState,
      [timeType === 'start' ? 'startAt' : 'endAt']: dateFormat(date),
    }));
  };

  const searchSchedule = () => {
    fetchSearchData();
    navigation.navigate('SearchResult', {keyword});
  };

  const fetchSearchData = async () => {
    try {
      const newItems = await scheduleAPI.searchGet(user.token, {
        params: {keyword, startAt: `${startAt} 00:00:00`, endAt: `${endAt} 23:59:59`},
      });
      setItems(newItems);
    } catch (error: any) {
      console.error('search 실패', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="검색" type="search" nextFunc={searchSchedule} />
      <View style={styles.contentLayout}>
        <TextInput
          placeholder="검색어를 입력해 주세요."
          onChangeText={text => setSearchData(prevState => ({...prevState, keyword: text}))}
          style={styles.contentTitleInput}
        />
        <ScheduleOptionSelect
          type="검색 기간 시작"
          state={searchData.startAt}
          event={toggleStartAt}
          iconName="time-outline"
        />
        <ScheduleOptionSelect
          type="검색 기간 종료"
          state={searchData.endAt}
          event={toggleEndAt}
          iconName="time-outline"
        />
      </View>
      <DateTimePickerModal
        isVisible={visible}
        mode={'date'}
        onConfirm={handleConfirm}
        onCancel={onCancel}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentLayout: {
    marginRight: 24,
    marginLeft: 24,
  },
  contentTitleInput: {
    marginTop: 24,
    paddingBottom: 16,
    fontFamily: variables.font_3,
    color: variables.text_2,
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: variables.line_1,
  },
  toggleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue', // 원하는 색상으로 변경하세요.
  },
  icon: {
    fontSize: 24,
    marginRight: 30,
    color: variables.main,
  },
});

export default Search;
