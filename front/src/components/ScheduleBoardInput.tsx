import {StyleSheet, View, Dimensions, Image, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {variables} from '../style/variables';

const {width, height} = Dimensions.get('window');

type ChildState = string; // 자식 컴포넌트의 상태 타입

export interface inputProps {
  setState: React.Dispatch<React.SetStateAction<ChildState>>;
}

export const ScheduleBoardInput = ({setState}: inputProps) => {
  const [board, setBoard] = useState('');
  const handleStateChange = () => {
    setState(board); // 콜백 함수를 호출하여 부모 컴포넌트에 state 전달
  };
  return (
    <View style={styles.contentInput}>
      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={require('front/assets/image/tag_icon.png')} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>스케줄 보드</Text>
        <TouchableOpacity style={styles.selectContainer}>
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

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
  contentContainer: {
    marginRight: 24,
    marginLeft: 24,
    marginTop: 24,
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
