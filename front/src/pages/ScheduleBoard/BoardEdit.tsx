import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Dimensions,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Config from 'react-native-config';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {patchBoardData} from '../../api/boardApi';
import {setBoardReducer} from '../../util/redux/boardSlice';
import {variables} from '../../style/variables';
import {VariablesKeys} from '../../style/variables';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../components/Header';

const {width, height} = Dimensions.get('window');

const BoardEdit = ({route}: any) => {
  const url = Config.API_APP_KEY as string;
  const user = useSelector((state: any) => state.user);
  const initialData = route.params.item;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [updateBoard, setUpdateBoard] = useState(initialData);

  const handleBoardValue = (type: string, value: string) => {
    setUpdateBoard((prevState: any) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const handleEditBoard = async () => {
    try {
      const {tagId, ...finalUpdateBoard} = updateBoard;
      const response = await patchBoardData(url, user.token, updateBoard.tagId, finalUpdateBoard);
      if (response) {
        dispatch(setBoardReducer(response));
        console.log('보드 수정 성공!');
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert(
        'Error',
        '예상치 못한 에러가 발생했습니다.\n프로그램 종료 후 다시 시도해 주세요.',
      );
      console.log('Error editing data', error);
    }
  };

  const boardColors: string[] = Object.keys(variables)
    .filter(key => key.startsWith('board_') || key.startsWith('Mater_'))
    .map(key => variables[key as VariablesKeys] as string);

  const currentColorIndex = boardColors.indexOf(initialData.color);
  const [selectedColorIndex, setSelectedColorIndex] = useState(currentColorIndex);
  const [contentTitle, setContentTitle] = useState(initialData.name);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="스케줄 보드 수정" nextFunc={handleEditBoard} />
      <View style={styles.contentLayout}>
        <TextInput
          placeholder="보드 이름을 입력해 주세요."
          style={styles.contentTitleInput}
          onChangeText={text => {
            setContentTitle(text);
            handleBoardValue('name', text);
          }}
          value={contentTitle}
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
