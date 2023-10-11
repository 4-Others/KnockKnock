import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {variables} from '../../style/variables';
import {VariablesKeys} from '../../style/variables';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';

const {width, height} = Dimensions.get('window');

const BoardEdit = () => {
  const [contentTitle, setContentTitle] = useState('');
  const [selectedColorIndex, setSelectedColorIndex] = useState(-1);
  const [updateBoard, setUpdateBoard] = useState({name: '', color: ''});

  const handleBoardValue = (type: string, value: string) => {
    setUpdateBoard({
      ...updateBoard,
      [type]: value,
    });
  };

  const boardColors: string[] = Object.keys(variables)
    .filter(key => key.startsWith('board_') || key.startsWith('Mater_'))
    .map(key => variables[key as VariablesKeys] as string);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="스케줄 보드 수정" />
      <View style={styles.contentLayout}>
        <TextInput
          placeholder="보드 이름을 입력해 주세요."
          style={styles.contentTitleInput}
          onChangeText={text => setContentTitle(text)}
        />
        <View style={styles.boardColorContainer}>
          <Text style={styles.subTitle}>보드 컬러</Text>
          <View style={styles.colorChipContainer}>
            {boardColors.map((color, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  style={[styles.colorChip, {backgroundColor: color}]}
                  onPress={() => {
                    handleBoardValue('color', color);
                    setSelectedColorIndex(i);
                  }}>
                  {i === selectedColorIndex ? <Icon name="check" style={styles.icon} /> : null}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BoardEdit;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
  contentLayout: {
    marginTop: 24,
    marginRight: 24,
    marginLeft: 24,
  },
  contentTitleInput: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: variables.line_1,
    fontSize: 16,
    fontFamily: variables.font_3,
    color: variables.text_2,
  },
  boardColorContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 20,
    paddingBottom: 16,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: variables.line_1,
  },
  subTitle: {
    marginBottom: 10,
    paddingLeft: 6,
    fontSize: 16,
    fontFamily: variables.font_3,
    color: variables.text_2,
  },
  colorChipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    paddingLeft: 2,
  },
  colorChip: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    marginBottom: 14,
    width: 24,
    height: 24,
    borderRadius: 30,
  },
  icon: {
    fontSize: 14,
    color: 'white',
  },
});
