import {StyleSheet, SafeAreaView, Text, TextInput, Dimensions, View, Image} from 'react-native';
import React, {useState} from 'react';
import {variables} from '../../style/variables';
import Header from '../../components/Header';
import {SelectBoard, SelectEndTime, SelectStartTime} from '../../components/SelectOption';

const {width, height} = Dimensions.get('window');

const ScheduleAdd = () => {
  const [contentTitle, setContentTitle] = useState('');
  const [contentText, setContentText] = useState('');
  const [selectedBoard, setselectedBoard] = useState('');
  const [selectedStartTime, setselectedStartTime] = useState('');
  const [selectedEndTime, setselectedEndTime] = useState('');

  return (
    <SafeAreaView style={scheduleOptionStyles.container}>
      <Header title="스케줄 등록" />
      <View style={scheduleOptionStyles.contentLayout}>
        <TextInput
          placeholder="스케줄을 입력해 주세요."
          style={scheduleOptionStyles.contentTitleInput}
          onChangeText={text => setContentTitle(text)}
        />
        <SelectBoard setState={setContentTitle} />
        <SelectStartTime setState={setselectedStartTime} />
        <SelectEndTime setState={setselectedEndTime} />
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
              placeholder="메모를 입력하세요"
              style={[scheduleOptionStyles.inputTitle, {marginTop: 10}]}
              onChangeText={text => setContentText(text)}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export const scheduleOptionStyles = StyleSheet.create({
  container: {
    width: width,
    height: height,
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
