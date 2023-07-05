import React, {useState} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import {variables} from '../style/variables';

export interface inputProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
  toggleIsOpen: () => void;
}

export const SelectBoard = ({setState, toggleIsOpen}: inputProps) => {
  const [board, setBoard] = useState('');
  const handleStateChange = () => {
    setState(board);
  };

  return (
    <View style={styles.contentInput}>
      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={require('front/assets/image/tag_icon.png')} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>스케줄 보드</Text>
        <TouchableOpacity style={styles.selectContainer} onPress={toggleIsOpen}>
          <Text
            style={[
              styles.placeHolder,
              {
                marginTop: 10,
              },
            ]}>
            보드를 선택하세요.
          </Text>
          <Image source={require('front/assets/image/back-btn.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const SelectStartTime = ({setState, toggleIsOpen}: inputProps) => {
  const [board, setBoard] = useState('');
  const handleStateChange = () => {
    setState(board);
  };

  return (
    <View style={styles.contentInput}>
      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={require('front/assets/image/time_icon.png')} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>스케줄 시작</Text>
        <TouchableOpacity style={styles.selectContainer} onPress={toggleIsOpen}>
          <Text
            style={[
              styles.placeHolder,
              {
                marginTop: 10,
              },
            ]}>
            시작 날짜와 시간을 선택하세요.
          </Text>
          <Image source={require('front/assets/image/back-btn.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const SelectEndTime = ({setState, toggleIsOpen}: inputProps) => {
  const [time, setSime] = useState('');
  const handleStateChange = () => {
    setState(time);
  };

  return (
    <View style={styles.contentInput}>
      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={require('front/assets/image/alarm_icon.png')} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>스케줄 종료</Text>
        <TouchableOpacity style={styles.selectContainer} onPress={toggleIsOpen}>
          <Text
            style={[
              styles.placeHolder,
              {
                marginTop: 10,
              },
            ]}>
            종료 날짜와 시간을 선택하세요.
          </Text>
          <Image source={require('front/assets/image/back-btn.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  placeHolder: {
    fontFamily: variables.font_3,
    color: variables.text_6,
    fontSize: 14,
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
