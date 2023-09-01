import React, {useState} from 'react';
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
import Selector from './BottomSheet';
import {scheduleOptionStyles} from '../pages/Schedule/ScheduleAdd';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScheduleData} from '../util/dataConvert';

export interface inputProps {
  type: string;
  state: string;
  event: () => void;
}

export const ScheduleOption: React.FC<{itemData?: ScheduleData}> = ({itemData}) => {
  const initialScheduleData: ScheduleData = {
    calendarId: 0,
    name: '',
    height: 0,
    day: '',
    complete: false,
    startAt: '',
    endAt: '',
    content: '',
    period: '',
    alerts: [],
    modifiedAt: '',
    tag: {
      name: '',
      color: '',
    },
  };

  const [scheduleData, setScheduleData] = useState<ScheduleData>(
    itemData ? {...itemData} : initialScheduleData,
  );
  const [boardIsOpen, setBoardIsOpen] = useState(false);
  const [notificationIsOpen, setNotificationIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [timeType, setTimeType] = useState('');
  const onCancel = () => {
    setVisible(false);
  };

  const handleConfirm = (date: Date) => {
    onCancel();
    const formattedDate = new Date(date).toISOString().slice(0, 19).replace('T', ' ');
    if (timeType === 'start') {
      setScheduleData(prevData => ({
        ...prevData,
        startAt: formattedDate,
      }));
    } else if (timeType === 'end') {
      setScheduleData(prevData => ({
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

  const parseDate = (dateString: any) => {
    const [year, month, day, hours, minutes] = dateString.split(/[- :]/);
    return new Date(year, month - 1, day, hours, minutes);
  };

  let date = new Date();

  scheduleData.startAt.length !== 0 && timeType === 'start'
    ? parseDate(scheduleData.day + scheduleData.startAt)
    : parseDate(scheduleData.day + scheduleData.endAt);

  const onTagState = (value: {color: string; name: string}) => {
    setScheduleData(prevData => ({
      ...prevData,
      tag: value,
    }));
  };

  const onNotificationState = (value: number) => {
    setScheduleData(prevData => {
      const updatedAlerts = prevData.alerts.includes(value)
        ? prevData.alerts.filter(item => item !== value)
        : [...prevData.alerts, value];

      return {
        ...prevData,
        alerts: updatedAlerts,
      };
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={scheduleOptionStyles.contentLayout}>
      <TextInput
        defaultValue={scheduleData.name}
        placeholder="스케줄을 입력해 주세요."
        style={scheduleOptionStyles.contentTitleInput}
        onChangeText={text => setScheduleData(prevData => ({...prevData, contentTitle: text}))}
      />
      <SelectComponent
        type="보드"
        state={scheduleData.tag.name}
        event={() => setBoardIsOpen(prevState => !prevState)}
      />
      <SelectComponent
        type="알림 시간"
        state={scheduleData.alerts.join(', ')}
        event={() => setNotificationIsOpen(prevState => !prevState)}
      />
      <SelectComponent type="일정 시작 시간" state={scheduleData.startAt} event={toggleStartAt} />
      <SelectComponent type="일정 종료 시간" state={scheduleData.endAt} event={toggleEndAt} />
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
      <Selector
        modalVisible={boardIsOpen}
        setModalVisible={setBoardIsOpen}
        onData={onTagState}
        type="tag" // 타입을 전달
      />
      <Selector
        modalVisible={notificationIsOpen}
        setModalVisible={setNotificationIsOpen}
        onData={onNotificationState}
        type="notification" // 타입을 전달
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

export const SelectComponent = ({type, state, event}: inputProps) => {
  return (
    <View style={styles.contentInput}>
      <Icon name="pricetag-outline" style={styles.icon} />
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>{type}</Text>
        <TouchableOpacity style={styles.selectContainer} onPress={event}>
          <TextInput
            value={state}
            placeholder={`${type}을 선택하세요.`}
            style={styles.contentText}
            editable={false}
          />
          <Image source={require('front/assets/image/back-btn.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
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
