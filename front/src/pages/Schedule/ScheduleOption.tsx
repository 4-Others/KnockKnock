import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {variables} from '../../style/variables';
import {SetScheduleData} from '../../util/dataConvert';
import ScheduleOptionSelect from '../../components/ScheduleOptionSelect';
import ScheduleOptionToggle from '../../components/ScheduleOptionToggle';
import Selector from '../../components/BottomSheet';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';

interface ScheduleOptionProps {
  scheduleWillAdd: SetScheduleData;
  setScheduleWillAdd: React.Dispatch<React.SetStateAction<SetScheduleData>>;
  url?: string;
  getCurrentDateStartAndEnd: any;
}

const ScheduleOption: React.FC<ScheduleOptionProps> = ({
  url,
  scheduleWillAdd,
  setScheduleWillAdd,
  getCurrentDateStartAndEnd,
}) => {
  const [boardIsOpen, setBoardIsOpen] = useState(false);
  const [notificationIsOpen, setNotificationIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [timeType, setTimeType] = useState('');

  const handleTogglePeriod = (value: boolean) => {
    const {start, end} = getCurrentDateStartAndEnd();
    setScheduleWillAdd(prevData => ({
      ...prevData,
      period: value ? 'ALL_DAY' : 'SPECIFIC_TIME',
      startAt: value ? start : prevData.startAt,
      endAt: value ? end : prevData.endAt,
    }));
  };

  const onCancel = () => {
    setVisible(false);
  };

  const handleConfirm = (date: Date) => {
    onCancel();
    const formattedDate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
    if (timeType === 'start') {
      setScheduleWillAdd(prevData => ({
        ...prevData,
        startAt: formattedDate,
      }));
    } else if (timeType === 'end') {
      setScheduleWillAdd(prevData => ({
        ...prevData,
        endAt: formattedDate,
      }));
    }
  };

  const toggleStartAt = () => {
    setVisible(prevState => !prevState);
    setTimeType('start');
  };

  const toggleEndAt = () => {
    setVisible(prevState => !prevState);
    setTimeType('end');
  };

  const parseDate = (dateString: string) => {
    const [year, month, day, hours, minutes] = dateString.split(/[- :]/).map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  };

  let date = new Date();

  scheduleWillAdd.startAt.length !== 0 && timeType === 'start'
    ? parseDate(scheduleWillAdd.startAt)
    : parseDate(scheduleWillAdd.endAt);

  const onTagState = (value: {color: string; name: string}) => {
    setScheduleWillAdd(prevData => ({
      ...prevData,
      tag: value,
    }));
  };

  const onNotificationState = (value: number) => {
    setScheduleWillAdd((prevData: SetScheduleData) => {
      return {
        ...prevData,
        alerts: [value],
      };
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.contentLayout}>
      <TextInput
        defaultValue={scheduleWillAdd.title}
        placeholder="스케줄을 입력해 주세요."
        style={styles.contentTitleInput}
        onChangeText={text => setScheduleWillAdd(prevData => ({...prevData, title: text}))}
      />
      <ScheduleOptionSelect
        type="보드"
        state={scheduleWillAdd.tag}
        event={() => setBoardIsOpen(prevState => !prevState)}
        iconName="pricetag-outline"
      />
      <ScheduleOptionSelect
        type="알림 시간"
        state={scheduleWillAdd.alerts.join()}
        event={() => setNotificationIsOpen(prevState => !prevState)}
        iconName="notifications-outline"
      />
      <ScheduleOptionToggle
        type="하루 종일"
        value={scheduleWillAdd.period === 'ALL_DAY'}
        onToggle={handleTogglePeriod}
        iconName="sunny-outline"
      />
      <ScheduleOptionSelect
        type="일정 시작 시간"
        state={scheduleWillAdd.startAt}
        event={toggleStartAt}
        iconName="time-outline"
        period={scheduleWillAdd.period}
      />
      <ScheduleOptionSelect
        type="일정 종료 시간"
        state={scheduleWillAdd.endAt}
        event={toggleEndAt}
        iconName="time-outline"
        period={scheduleWillAdd.period}
      />
      <KeyboardAvoidingView
        style={styles.contentInput}
        behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'android' ? 64 : 0}>
        <Icon name="create-outline" style={styles.icon} />
        <View style={styles.inputContainer}>
          <Text style={styles.inputTitle}>메모</Text>
          <TextInput
            style={styles.contentText}
            defaultValue={scheduleWillAdd.content}
            placeholder="메모를 입력하세요"
            onChangeText={text => setScheduleWillAdd(prevData => ({...prevData, content: text}))}
          />
        </View>
      </KeyboardAvoidingView>
      <Selector
        modalVisible={boardIsOpen}
        setModalVisible={setBoardIsOpen}
        onData={onTagState}
        type="board" // 타입을 전달
      />
      <Selector
        modalVisible={notificationIsOpen}
        setModalVisible={setNotificationIsOpen}
        onData={onNotificationState}
        type="notification" // 타입을 전달
      />
      <DateTimePickerModal
        isVisible={visible && scheduleWillAdd.period === 'SPECIFIC_TIME'}
        mode={'datetime'}
        onConfirm={handleConfirm}
        onCancel={onCancel}
        date={date}
      />
    </ScrollView>
  );
};

export default ScheduleOption;

const styles = StyleSheet.create({
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
    padding: 0,
    paddingTop: 10,
    marginBottom: 10,
    height: 30,
    fontFamily: variables.font_4,
    color: variables.text_3,
    fontSize: 14,
    ...Platform.select({
      ios: {marginTop: 10},
      android: {marginTop: 0},
    }),
  },
  icon: {
    fontSize: 24,
    marginRight: 30,
    color: variables.main,
  },
});
