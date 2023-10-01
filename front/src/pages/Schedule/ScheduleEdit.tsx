import {SafeAreaView} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import ScheduleOption from './ScheduleOption';

//? 스케줄 편집하는 스크린
const ScheduleEdit = ({route}: any) => {
  const itemData = route.params.item;
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="스케줄 편집" />
      {/* <ScheduleOption itemData={itemData} /> */}
    </SafeAreaView>
  );
};

export default ScheduleEdit;
