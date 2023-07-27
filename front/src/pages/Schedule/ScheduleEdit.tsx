import {StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import React from 'react';
import {variables} from '../../style/variables';
import Header from '../../components/Header';
import {ScheduleOption} from '../../components/ScheduleSelectOption';
import {scheduleOptionStyles} from './ScheduleAdd';

//? 스케줄 편집하는 스크린
const ScheduleEdit = ({route}: any) => {
  const itemData = route.params.locate;

  return (
    <SafeAreaView style={scheduleOptionStyles.container}>
      <Header title="스케줄 편집" />
      <ScheduleOption itemData={itemData} />
    </SafeAreaView>
  );
};

export default ScheduleEdit;
