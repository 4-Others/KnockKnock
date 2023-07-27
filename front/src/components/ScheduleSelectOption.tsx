import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {variables} from '../style/variables';
import BottomSheetSelectBoard from './BottomSheetSelectBoard';
import BottomSheetSelectPeriod from './BottomSheetSelectPeriod';
import {scheduleOptionStyles} from '../pages/Schedule/ScheduleAdd';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';

export interface inputProps {
  state: string;
  event: () => void;
}

const SelectBoard = ({state, event}: inputProps) => {
  return (
    <View style={styles.contentInput}>
      <Icon name="pricetag-outline" style={styles.icon} />
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>스케줄 보드</Text>
        <TouchableOpacity style={styles.selectContainer} onPress={event}>
          <TextInput
            value={state}
            placeholder="보드를 선택하세요."
            style={styles.contentText}
            editable={false}
          />
          <Image source={require('front/assets/image/back-btn.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SelectPeriod = ({state, event}: inputProps) => {
  return (
    <View style={styles.contentInput}>
      <Icon name="alarm-outline" style={styles.icon} />
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>알림</Text>
        <TouchableOpacity style={styles.selectContainer} onPress={event}>
          <TextInput
            value={state}
            placeholder="알림받을 시간을 선택하세요."
            style={styles.contentText}
            editable={false}
          />
          <Image source={require('front/assets/image/back-btn.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SelectStartTime = ({state, event}: inputProps) => {
  return (
    <View key={state} style={styles.contentInput}>
      <Icon name="time-outline" style={styles.icon} />
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>스케줄 시작</Text>
        <TouchableOpacity style={styles.selectContainer} onPress={event}>
          <TextInput
            value={state.length > 1 ? state : ''}
            placeholder="시작하는 날짜와 시간을 선택하세요."
            style={styles.contentText}
            editable={false}
          />
          <Image source={require('front/assets/image/back-btn.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SelectEndTime = ({state, event}: inputProps) => {
  return (
    <View key={state} style={styles.contentInput}>
      <Icon name="timer-outline" style={styles.icon} />
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>스케줄 종료</Text>
        <TouchableOpacity style={styles.selectContainer} onPress={event}>
          <TextInput
            value={state.length > 1 ? state : ''}
            placeholder="종료하는 날짜와 시간을 선택하세요."
            style={styles.contentText}
            editable={false}
          />
          <Image source={require('front/assets/image/back-btn.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const ScheduleOption: React.FC<any> = ({itemData}) => {
  const [scheduleData, setScheduleData] = useState({
    id: itemData.calendarId,
    complete: itemData.complete || '',
    startAt: itemData.startAt || '',
    endAt: itemData.endAt || '',
    name: itemData.name || '',
    board: itemData.board || '',
    content: itemData.content || '',
    day: itemData.day || '',
    period: itemData.period || '',
    alerts: itemData.alerts || [],
  });
  const [boardIsOpen, setBoardIsOpen] = useState(false);
  const [periodIsOpen, setPeriodIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [timeType, setTimeType] = useState('');
  const onCancel = () => {
    setVisible(false);
  };

  const handleConfirm = (date: Date) => {
    onCancel();
    const dateString = new Date(date);
    const day = `${dateString.getFullYear()}-${String(dateString.getMonth() + 1).padStart(
      2,
      '0',
    )}-${String(dateString.getDate()).padStart(2, '0')}`;

    const time = `${String(dateString.getHours()).padStart(2, '0')}:${String(
      dateString.getMinutes(),
    ).padStart(2, '0')}`;

    if (timeType === 'start') {
      setScheduleData(prevData => ({
        ...prevData,
        day: day,
        startAt: time,
      }));
    } else if (timeType === 'end') {
      setScheduleData(prevData => ({
        ...prevData,
        day: day,
        endAt: time,
      }));
    }
  };

  const toggleIsOpenStartAt = () => {
    setVisible(prevState => !prevState);
    0;
    setTimeType('start');
  };

  const toggleIsOpenEndAt = () => {
    setVisible(prevState => !prevState);
    setTimeType('end');
  };

  const parseDate = (dateString: any) => {
    const [year, month, day, hours, minutes] = dateString.split(/[- :]/);
    return new Date(year, month - 1, day, hours, minutes);
  };

  let date = new Date();

  scheduleData.startAt.length !== 0 && timeType === 'start'
    ? parseDate(scheduleData.day + scheduleData.startAt)
    : parseDate(scheduleData.day + scheduleData.endAt);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={scheduleOptionStyles.contentLayout}>
      <TextInput
        defaultValue={scheduleData.name}
        placeholder="스케줄을 입력해 주세요."
        style={scheduleOptionStyles.contentTitleInput}
        onChangeText={text => setScheduleData(prevData => ({...prevData, contentTitle: text}))}
      />
      <SelectBoard
        state={scheduleData.board}
        event={() => setBoardIsOpen(prevState => !prevState)}
      />
      <SelectPeriod
        state={scheduleData.period}
        event={() => setPeriodIsOpen(prevState => !prevState)}
      />
      <SelectStartTime
        state={`${scheduleData.day} ${scheduleData.startAt}`}
        event={toggleIsOpenStartAt}
      />
      <SelectEndTime
        state={`${scheduleData.day} ${scheduleData.endAt}`}
        event={toggleIsOpenEndAt}
      />
      <KeyboardAvoidingView
        style={scheduleOptionStyles.contentInput}
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'android' ? 64 : 0}>
        <Icon name="create-outline" style={styles.icon} />
        <View style={scheduleOptionStyles.inputContainer}>
          <Text style={scheduleOptionStyles.inputTitle}>메모</Text>
          <TextInput
            defaultValue={scheduleData.content}
            placeholder="메모를 입력하세요"
            onChangeText={text => setScheduleData(prevData => ({...prevData, contentText: text}))}
          />
        </View>
      </KeyboardAvoidingView>
      <BottomSheetSelectBoard
        modalVisible={boardIsOpen}
        setModalVisible={setBoardIsOpen}
        setScheduleData={setScheduleData}
      />
      <BottomSheetSelectPeriod
        modalVisible={periodIsOpen}
        setModalVisible={setPeriodIsOpen}
        setScheduleData={setScheduleData}
      />
      <DateTimePickerModal
        isVisible={visible}
        mode={'datetime'}
        onConfirm={handleConfirm}
        onCancel={onCancel}
        date={date}
      />
    </ScrollView>
  );
};

export const SearchOption: React.FC<any> = ({itemData}) => {
  const [scheduleData, setScheduleData] = useState({
    id: itemData.calendarId,
    complete: itemData.complete || '',
    startAt: itemData.startAt || '',
    endAt: itemData.endAt || '',
    name: itemData.name || '',
    board: itemData.board || '',
    content: itemData.content || '',
    day: itemData.day || '',
    period: itemData.period || '', // period 속성 추가
    alerts: itemData.alerts || [],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [timeType, setTimeType] = useState('');
  const onCancel = () => {
    setVisible(false);
  };

  const handleConfirm = (date: Date) => {
    onCancel();
    const dateString = new Date(date);
    const day = `${dateString.getFullYear()}-${String(dateString.getMonth() + 1).padStart(
      2,
      '0',
    )}-${String(dateString.getDate()).padStart(2, '0')}`;

    const time = `${String(dateString.getHours()).padStart(2, '0')}:${String(
      dateString.getMinutes(),
    ).padStart(2, '0')}`;

    if (timeType === 'start') {
      setScheduleData(prevData => ({
        ...prevData,
        day: day,
        startAt: time,
      }));
    } else if (timeType === 'end') {
      setScheduleData(prevData => ({
        ...prevData,
        day: day,
        endAt: time,
      }));
    }
  };

  const toggleIsOpen = () => {
    setIsOpen(prevState => !prevState);
  };

  const toggleIsOpenStartAt = () => {
    setVisible(prevState => !prevState);
    setTimeType('start');
  };

  const toggleIsOpenEndAt = () => {
    setVisible(prevState => !prevState);
    setTimeType('end');
  };

  const parseDate = (dateString: any) => {
    const [year, month, day, hours, minutes] = dateString.split(/[- :]/);
    return new Date(year, month - 1, day, hours, minutes);
  };

  let date = new Date();

  scheduleData.startAt.length !== 0 && timeType === 'start'
    ? parseDate(scheduleData.day + scheduleData.startAt)
    : parseDate(scheduleData.day + scheduleData.endAt);

  return (
    <View style={scheduleOptionStyles.contentLayout}>
      <TextInput
        style={styles.searchBar}
        onChangeText={text => setScheduleData(prevData => ({...prevData, contentTitle: text}))}
        placeholder="검색어를 입력해 주세요"
      />
      <SelectBoard state={scheduleData.board} event={toggleIsOpen} />
      <SelectStartTime
        state={`${scheduleData.day} ${scheduleData.startAt}`}
        event={toggleIsOpenStartAt}
      />
      <SelectEndTime
        state={`${scheduleData.day} ${scheduleData.endAt}`}
        event={toggleIsOpenEndAt}
      />
      <BottomSheetSelectBoard
        modalVisible={isOpen}
        setModalVisible={setIsOpen}
        setScheduleData={setScheduleData}
      />
      <DateTimePickerModal
        isVisible={visible}
        mode={'datetime'}
        onConfirm={handleConfirm}
        onCancel={onCancel}
        date={date}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentInput: {
    marginTop: 20,
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: variables.line_1,
    ...Platform.select({
      ios: {paddingBottom: 16},
      android: {paddingBottom: 0},
    }),
  },
  inputTitle: {
    fontFamily: variables.font_3,
    color: variables.text_2,
    fontSize: 14,
  },
  contentText: {
    fontFamily: variables.font_4,
    color: variables.text_3,
    ...Platform.select({
      ios: {marginTop: 10},
      android: {marginTop: 0},
    }),
  },
  arrowIcon: {
    width: 16,
    height: 16,
    marginRight: 10,
    transform: [{scaleX: -1}],
  },
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBar: {
    fontFamily: variables.font_3,
    color: variables.text_2,
    fontSize: 14,
    backgroundColor: variables.back_1,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    height: 44,
    borderRadius: 60,
  },
  icon: {
    fontSize: 24,
    marginRight: 30,
    color: variables.main,
  },
});
