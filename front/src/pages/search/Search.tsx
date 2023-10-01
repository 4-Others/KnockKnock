import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, View, TextInput} from 'react-native';
import axios from 'axios';
import {useSelector} from 'react-redux';
import Config from 'react-native-config';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {variables} from '../../style/variables';
import {SearchData} from '../../util/dataConvert';
import Header from '../../components/Header';
import ScheduleOptionSelect from '../../components/ScheduleOptionSelect';

const Search = () => {
  const url = Config.API_APP_KEY;
  const user = useSelector((state: any) => state.user);

  const getCurrentDateStartAndEnd = () => {
    const date = new Date();
    const startAt = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const endAt = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const formatDateTime = (date: Date) => {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
        date.getDate(),
      ).padStart(2, '0')}`;
    };
    return {
      start: formatDateTime(startAt),
      end: formatDateTime(endAt),
    };
  };

  const {start, end} = getCurrentDateStartAndEnd();

  const data: SearchData = {
    keyword: '',
    startAt: start,
    endAt: end,
  };

  const [visible, setVisible] = useState(false);
  const [timeType, setTimeType] = useState('');
  const [searchData, setSearchData] = useState(data);

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
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0',
    )}-${String(date.getDate()).padStart(2, '0')}`;

    setSearchData(prevState => ({
      ...prevState,
      [timeType === 'start' ? 'startAt' : 'endAt']: formattedDate,
    }));
  };

  const searchSchedule = async () => {
    try {
      const response = await axios.get(`${url}api/v1/schedule/search`, {
        headers: {Authorization: `Bearer ${user.token}`},
        params: {
          keyword: searchData.keyword,
          startAt: `${searchData.startAt} 00:00:00`,
          endAt: `${searchData.endAt} 00:00:00`,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
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
