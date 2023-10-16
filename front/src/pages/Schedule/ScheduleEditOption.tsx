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
import {BoardData, SetScheduleData} from '../../util/dataConvert';
import ScheduleOptionSelect from '../../components/ScheduleOptionSelect';
import ScheduleOptionToggle from '../../components/ScheduleOptionToggle';
import Selector from '../../components/BottomSheet';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';

interface ScheduleOptionProps {
  url?: string;
  updateData: SetScheduleData & BoardData;
  setUpdateData: React.Dispatch<React.SetStateAction<SetScheduleData & BoardData>>;
}

const ScheduleOption: React.FC<ScheduleOptionProps> = ({url, updateData, setUpdateData}) => {
  const [boardIsOpen, setBoardIsOpen] = useState(false);
  const [notificationIsOpen, setNotificationIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [timeType, setTimeType] = useState('');
  const start = updateData.startAt.split(' ')[0];
  const end = updateData.endAt.split(' ')[0];

  const handleTogglePeriod = (value: boolean) => {
    if (value) {
      const formattedStart = updateData.startAt.split(' ')[0];
      const formattedEnd = updateData.endAt.split(' ')[0];
      setUpdateData(prevData => ({
        ...prevData,
        period: 'ALL_DAY',
        startAt: formattedStart,
        endAt: formattedEnd,
      }));
    } else {
      const formattedStart = `${updateData.startAt.split(' ')[0]} 00:00`;
      const formattedEnd = `${updateData.endAt.split(' ')[0]} 23:59`;
      setUpdateData(prevData => ({
        ...prevData,
        period: 'SPECIFIC_TIME',
        startAt: formattedStart,
        endAt: formattedEnd,
      }));
    }
  };

  const onCancel = () => {
    setVisible(false);
  };

  const handleConfirm = (date: Date) => {
    onCancel();
    const formattedDate =
      updateData.period === 'ALL_DAY'
        ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
            date.getDate(),
          ).padStart(2, '0')}`
        : `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
            date.getDate(),
          ).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(
            date.getMinutes(),
          ).padStart(2, '0')}`;

    if (timeType === 'start') {
      setUpdateData(prevData => ({
        ...prevData,
        startAt: formattedDate,
        endAt: formattedDate,
      }));
    } else if (timeType === 'end') {
      if (new Date(formattedDate) < new Date(updateData.startAt)) {
        Alert.alert('시작과 종료를 시간순서에\n맞게 설정해주세요.');
        return;
      }
      setUpdateData(prevData => ({
        ...prevData,
        endAt: formattedDate,
      }));
    }
  };

  const toggleStartAt = () => {
    setVisible(!visible);
    setTimeType('start');
  };

  const toggleEndAt = () => {
    setVisible(!visible);
    setTimeType('end');
  };

  const parseDate = (dateString: string) => {
    const [year, month, day, hours, minutes] = dateString.split(/[- :]/).map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  };

  let date = new Date();

  updateData.startAt.length !== 0 && timeType === 'start'
    ? parseDate(updateData.startAt)
    : parseDate(updateData.endAt);

  const onTagState = (value: {color: string; name: string; tagId: number}) => {
    setUpdateData(prevData => ({
      ...prevData,
      tag: value,
    }));
  };

  const onNotificationState = (value: number) => {
    setUpdateData((prevData: SetScheduleData & BoardData) => {
      return {
        ...prevData,
        alerts: [value],
      };
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.contentLayout}>
      <TextInput
        defaultValue={updateData.title}
        placeholder="스케줄을 입력해 주세요."
        style={styles.contentTitleInput}
        onChangeText={text => setUpdateData(prevData => ({...prevData, title: text}))}
      />
      <ScheduleOptionSelect
        type="스케줄 보드"
        state={updateData.tag}
        event={() => setBoardIsOpen(prevState => !prevState)}
        iconName="pricetag-outline"
      />
      <ScheduleOptionSelect
        type="알림 시간"
        state={updateData.alerts.join()}
        event={() => setNotificationIsOpen(prevState => !prevState)}
        iconName="notifications-outline"
      />
      <ScheduleOptionToggle
        type="하루 종일"
        value={updateData.period === 'ALL_DAY'}
        onToggle={handleTogglePeriod}
        iconName="sunny-outline"
      />
      <ScheduleOptionSelect
        type="일정 시작 시간"
        state={updateData.period === 'ALL_DAY' ? start : updateData.startAt}
        event={toggleStartAt}
        iconName="time-outline"
      />
      <ScheduleOptionSelect
        type="일정 종료 시간"
        state={updateData.period === 'ALL_DAY' ? end : updateData.endAt}
        event={toggleEndAt}
        iconName="time-outline"
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
            defaultValue={updateData.content}
            placeholder="자세한 내용을 기록하려면 입력하세요"
            onChangeText={text => setUpdateData(prevData => ({...prevData, content: text}))}
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
        isVisible={visible}
        mode={updateData.period === 'ALL_DAY' ? 'date' : 'datetime'}
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
