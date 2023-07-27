import {StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import React from 'react';
import {variables} from '../../style/variables';
import Header from '../../components/Header';
import {ScheduleOption} from '../../components/ScheduleSelectOption';

//? 스케줄 추가하는 스크린
const ScheduleAdd = () => {
  const itemData = {
    name: '',
    board: '',
    content: '',
    day: '',
    startAt: '',
    endAt: '',
  };
  return (
    <SafeAreaView style={scheduleOptionStyles.container}>
      <Header title="스케줄 등록" />
      <ScheduleOption itemData={itemData} />
    </SafeAreaView>
  );
};

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

export default ScheduleAdd;
