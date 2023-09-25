import {StyleSheet, SafeAreaView, View} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/Header';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ScheduleOption from '../Schedule/ScheduleOption';
import Selector from '../../components/BottomSheet';
import {variables} from '../../style/variables';

const Search = () => {
  let date = new Date();
  const formattedDate = (date: Date) => date.toISOString().slice(0, 7);
  const [startAt, setStartAt] = useState(formattedDate(date));
  const [board, setBoard] = useState<{
    name: string;
    color: string;
  }>({name: '', color: ''});
  const [boardIsOpen, setBoardIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleStartAt = () => {
    setVisible(prevState => !prevState);
  };

  const onCancel = () => {
    setVisible(false);
  };

  const handleConfirm = (date: Date) => {
    onCancel();
    setStartAt(formattedDate(date));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="검색" type="search" />
      {
        <View style={styles.contentLayout}>
          <ScheduleOption
            type="보드"
            state={board.name}
            event={() => setBoardIsOpen(prevState => !prevState)}
          />
          <ScheduleOption type="일정 시작 시간" state={startAt} event={toggleStartAt} />
        </View>
      }
      <Selector
        modalVisible={boardIsOpen}
        setModalVisible={setBoardIsOpen}
        onData={data => setBoard(data)}
        type="tag" // 타입을 전달
      />
      <DateTimePickerModal
        isVisible={visible}
        mode={'date'}
        onConfirm={handleConfirm}
        onCancel={onCancel}
        date={date}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentLayout: {
    marginRight: 24,
    marginLeft: 24,
  },
  toggleButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue', // 원하는 색상으로 변경하세요.
  },
  icon: {
    fontSize: 24,
    marginRight: 30,
    color: variables.main,
  },
});

export default Search;
