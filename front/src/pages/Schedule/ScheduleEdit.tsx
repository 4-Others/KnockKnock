import {SafeAreaView, Text, TextInput, View, Image} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/Header';
import {SelectBoard, SelectEndTime, SelectStartTime} from '../../components/SelectOption';
import {scheduleOptionStyles} from './ScheduleAdd';

const ScheduleEdit = () => {
  const [contentTitle, setContentTitle] = useState('');
  const [contentText, setContentText] = useState('');
  const [selectedBoard, setselectedBoard] = useState('');
  const [selectedStartTime, setselectedStartTime] = useState('');
  const [selectedEndTime, setselectedEndTime] = useState('');

  return (
    <SafeAreaView style={scheduleOptionStyles.container}>
      <Header title="스케줄 편집" />
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

export default ScheduleEdit;
