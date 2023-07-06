import React, {useState} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import {variables} from '../style/variables';
import BottomSheet from './BottomSheetBoard';
import {scheduleOptionStyles} from '../pages/Schedule/ScheduleAdd';
import Data from '../pages/ScheduleBoard/BoardItems/boardData.json';

export interface inputProps {
  state: string;
  toggleIsOpen: () => void;
}

export const SelectBoard = ({state, toggleIsOpen}: inputProps) => {
  return (
    <View style={styles.contentInput}>
      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={require('front/assets/image/tag_icon.png')} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>스케줄 보드</Text>
        <TouchableOpacity style={styles.selectContainer} onPress={toggleIsOpen}>
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

export const SelectStartTime = ({state, toggleIsOpen}: inputProps) => {
  return (
    <View style={styles.contentInput}>
      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={require('front/assets/image/time_icon.png')} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>스케줄 시작</Text>
        <TouchableOpacity style={styles.selectContainer} onPress={toggleIsOpen}>
          <TextInput
            value={state}
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

export const SelectEndTime = ({state, toggleIsOpen}: inputProps) => {
  return (
    <View style={styles.contentInput}>
      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={require('front/assets/image/alarm_icon.png')} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>스케줄 종료</Text>
        <TouchableOpacity style={styles.selectContainer} onPress={toggleIsOpen}>
          <TextInput
            value={state}
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

const ScheduleEditor: React.FC<any> = ({itemData}) => {
  const startAt =
    `${itemData.day} ${itemData.startAt}`.length > 0 ? `${itemData.day} ${itemData.startAt}` : '';
  const endAt =
    `${itemData.day} ${itemData.endAt}`.length > 0 ? `${itemData.day} ${itemData.endAt}` : '';

  const [isOpen, setIsOpen] = useState(false);
  const [contentTitle, setContentTitle] = useState(itemData.name || '');
  const [selectedBoard, setselectedBoard] = useState(itemData.board || '');
  const [contentText, setContentText] = useState(itemData.content || '');
  const [selectedStartTime, setselectedStartTime] = useState(startAt);
  const [selectedEndTime, setselectedEndTime] = useState(endAt);
  const toggleIsOpen = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <View style={scheduleOptionStyles.contentLayout}>
      <TextInput
        placeholder="스케줄을 입력해 주세요."
        style={scheduleOptionStyles.contentTitleInput}
        onChangeText={text => setContentTitle(text)}
        value={contentTitle}
      />
      <SelectBoard toggleIsOpen={toggleIsOpen} state={selectedBoard} />
      <SelectStartTime toggleIsOpen={toggleIsOpen} state={selectedStartTime} />
      <SelectEndTime toggleIsOpen={toggleIsOpen} state={selectedEndTime} />
      <View style={scheduleOptionStyles.contentInput}>
        <View style={scheduleOptionStyles.iconContainer}>
          <Image
            style={scheduleOptionStyles.icon}
            source={require('front/assets/image/edit_icon.png')}
          />
        </View>
        <View style={scheduleOptionStyles.inputContainer}>
          <Text style={scheduleOptionStyles.inputTitle}>메모</Text>
          <TextInput
            value={contentText}
            placeholder="메모를 입력하세요"
            style={styles.contentText}
            onChangeText={text => setContentText(text)}
          />
        </View>
      </View>
      <BottomSheet
        modalVisible={isOpen}
        setModalVisible={setIsOpen}
        BoardData={Data}
        setBoardState={setselectedBoard}
        setStartTime={setselectedStartTime}
        setEndTime={setselectedEndTime}
      />
    </View>
  );
};

export default ScheduleEditor;

const styles = StyleSheet.create({
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
  contentText: {
    fontFamily: variables.font_4,
    color: variables.text_3,
    fontSize: 14,
    marginTop: 10,
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
    alignItems: 'flex-start',
  },
});
