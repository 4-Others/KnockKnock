import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {variables} from '../../style/variables';
import {SetBoardData, SetScheduleData} from '../../util/dataConvert';
import ScheduleOptionSelect from '../../components/ScheduleOptionSelect';
import ScheduleOptionToggle from '../../components/ScheduleOptionToggle';
import Selector from '../../components/BottomSheet';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';

interface ScheduleOptionProps {
  url?: string;
  postSchedule: SetScheduleData;
  setPostSchedule: React.Dispatch<React.SetStateAction<SetScheduleData>>;
  postTag: SetBoardData;
  setPostTag: React.Dispatch<React.SetStateAction<SetBoardData>>;
  getCurrentDateStartAndEnd?: any;
}

const ScheduleAddOption: React.FC<ScheduleOptionProps> = ({
  url,
  postSchedule,
  setPostSchedule,
  postTag,
  setPostTag,
  getCurrentDateStartAndEnd,
}) => {
  const [boardIsOpen, setBoardIsOpen] = useState(false);
  const [notificationIsOpen, setNotificationIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [timeType, setTimeType] = useState('');

  const handleTogglePeriod = (value: boolean) => {
    const {start, end} = getCurrentDateStartAndEnd();
    let newStartAt = start;
    let newEndAt = end;

    if (!value) {
      const currentDate = new Date();
      newStartAt = `${start} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
      newEndAt = `${end} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
    }

    setPostSchedule(prevData => ({
      ...prevData,
      period: value ? 'ALL_DAY' : 'SPECIFIC_TIME',
      startAt: newStartAt,
      endAt: newEndAt,
    }));
  };

  const onCancel = () => {
    setVisible(false);
  };

  const handleConfirm = (date: Date) => {
    onCancel();
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0',
    )}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(
      2,
      '0',
    )}:${String(date.getMinutes()).padStart(2, '0')}`;

    if (timeType === 'start') {
      setPostSchedule(prevData => ({
        ...prevData,
        startAt: formattedDate,
      }));
    } else if (timeType === 'end') {
      if (new Date(formattedDate) < new Date(postSchedule.startAt)) {
        Alert.alert('시작과 종료를 시간순서에\n맞게 설정해주세요.');
        return;
      }
      setPostSchedule(prevData => ({
        ...prevData,
        endAt: formattedDate,
      }));
    }
  };

  const toggleStartAt = () => {
    setTimeType('start');
    setVisible(prevVisible => !prevVisible);
  };

  const toggleEndAt = () => {
    setTimeType('end');
    setVisible(prevVisible => !prevVisible);
  };

  const parseDate = (dateString: string) => {
    const [year, month, day, hours, minutes] = dateString.split(/[- :]/).map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  };

  let date = new Date();

  postSchedule.startAt.length !== 0 && timeType === 'start'
    ? parseDate(postSchedule.startAt)
    : parseDate(postSchedule.endAt);

  const onTagState = (value: {color: string; name: string}) => {
    setPostTag(value);
  };

  const onNotificationState = (value: number) => {
    setPostSchedule((prevData: SetScheduleData) => {
      return {
        ...prevData,
        alerts: [value],
      };
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.contentLayout}>
      <TextInput
        defaultValue={postSchedule.title}
        placeholder="스케줄을 입력해 주세요."
        style={styles.contentTitleInput}
        onChangeText={text => setPostSchedule(prevData => ({...prevData, title: text}))}
      />
      <ScheduleOptionSelect
        type="스케줄 보드"
        state={postTag}
        event={() => setBoardIsOpen(prevState => !prevState)}
        iconName="pricetag-outline"
      />
      <ScheduleOptionSelect
        type="알림 시간"
        state={postSchedule.alerts.join()}
        event={() => setNotificationIsOpen(prevState => !prevState)}
        iconName="notifications-outline"
      />
      <ScheduleOptionToggle
        type="하루 종일"
        value={postSchedule.period === 'ALL_DAY'}
        onToggle={handleTogglePeriod}
        iconName="sunny-outline"
      />
      <ScheduleOptionSelect
        type="일정 시작 시간"
        state={postSchedule.startAt}
        event={toggleStartAt}
        iconName="time-outline"
        period={postSchedule.period}
      />
      <ScheduleOptionSelect
        type="일정 종료 시간"
        state={postSchedule.endAt}
        event={toggleEndAt}
        iconName="time-outline"
        period={postSchedule.period}
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
            defaultValue={postSchedule.content}
            placeholder="자세한 내용을 기록하려면 입력하세요"
            onChangeText={text => setPostSchedule(prevData => ({...prevData, content: text}))}
          />
        </View>
      </KeyboardAvoidingView>
      <Selector
        modalVisible={boardIsOpen}
        setModalVisible={setBoardIsOpen}
        onData={onTagState}
        type="board"
      />
      <Selector
        modalVisible={notificationIsOpen}
        setModalVisible={setNotificationIsOpen}
        onData={onNotificationState}
        type="notification"
      />
      <DateTimePickerModal
        isVisible={visible && postSchedule.period === 'SPECIFIC_TIME'}
        mode={'datetime'}
        onConfirm={handleConfirm}
        onCancel={onCancel}
        date={date}
      />
    </ScrollView>
  );
};

export default ScheduleAddOption;

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
