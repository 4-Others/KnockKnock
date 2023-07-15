import {StyleSheet, SafeAreaView, Dimensions} from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import {SearchOption} from '../../components/ScheduleSelectOption';

const {width, height} = Dimensions.get('window');

const Search = () => {
  const itemData = {
    name: '',
    board: '',
    content: '',
    day: '',
    startAt: '',
    endAt: '',
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="검색" type="search" />
      <SearchOption itemData={itemData} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
});

export default Search;
