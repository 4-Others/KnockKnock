import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {variables} from '../style/variables';
import {VariablesKeys} from '../style/variables';
import BoardData from '../pages/ScheduleBoard/BoardItems/boardData.json';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type SelectorProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onData: (value: any) => void;
  type: 'board' | 'notification'; // 타입을 구분하기 위한 프로퍼티 추가
};

type BoardData = {
  boardId: number;
  type: string;
  title: string;
  number: number;
  color: string;
};

//? modalBottomSheet 레이아웃
const Selector: React.FC<SelectorProps> = props => {
  const [newBoard, setNewBoard] = useState({name: '', color: ''});
  const [selectedColorIndex, setSelectedColorIndex] = useState(-1);

  const handleBoardValue = (type: string, value: string) => {
    setNewBoard({
      ...newBoard,
      [type]: value,
    });
  };

  const {
    modalVisible,
    setModalVisible,
    onData,
    type, // 타입을 받아옴
  } = props;

  const periodData = [30, 60, 90, 120, 1440];

  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });
  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  const RenderBoardList = () => {
    //? board 컬러 리스트 배열 생성
    const boardColors: string[] = Object.keys(variables)
      .filter(key => key.startsWith('board_') || key.startsWith('Mater_'))
      .map(key => variables[key as VariablesKeys] as string);

    return (
      <View style={styles.renderBoardContainer}>
        <Text style={styles.title}>스케줄 보드</Text>
        <ScrollView horizontal={true}>
          {BoardData.map(data => {
            const {color, boardId, title} = data;
            let colorValue: any = color;
            if (colorValue.startsWith('variables.')) {
              let colorKey = colorValue.substring('variables.'.length) as VariablesKeys;
              colorValue = variables[colorKey];
            }
            const changBoard = {color, name: title};
            return (
              <TouchableOpacity
                style={[styles.boardSeclector, {backgroundColor: colorValue}]}
                key={boardId}
                onPress={() => {
                  setModalVisible(false);
                  onData(changBoard);
                }}>
                <Text style={styles.menuText}>{title}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <Text style={styles.subTitle}>보드 명</Text>
        <TextInput
          style={styles.boardNameInput}
          placeholder="새로운 보드 이름을 입력하세요."
          onChangeText={text => handleBoardValue('name', text)}
          value={newBoard.name}
        />
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setModalVisible(false);
            onData(newBoard);
          }}>
          <Text>보드 생성</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const RenderNotificationList = () => {
    return periodData.map((data, index) => {
      return (
        <TouchableOpacity style={styles.itemSelectMenu} key={index} onPress={() => onData(data)}>
          <Text>{`${data}분 전`}</Text>
        </TouchableOpacity>
      );
    });
  };

  useEffect(() => {
    if (props.modalVisible) {
      resetBottomSheet.start();
    }
  }, [props.modalVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };

  return (
    <Modal visible={modalVisible} animationType={'fade'} transparent statusBarTranslucent>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{...styles.bottomSheetContainer, transform: [{translateY: translateY}]}}
          {...panResponders.panHandlers}>
          {type === 'board' // 타입에 따라 다른 데이터 표시
            ? RenderBoardList()
            : RenderNotificationList()}
        </Animated.View>
      </View>
    </Modal>
  );
};
export default Selector;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  background: {
    flex: 1,
  },
  bottomSheetContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
  itemSelectMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  renderBoardContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontFamily: variables.font_2,
    fontSize: 18,
    color: variables.text_1,
    marginBottom: 20,
  },
  boardSeclector: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 26,
    paddingLeft: 12,
    paddingRight: 12,
    marginRight: 6,
    borderRadius: 30,
    marginBottom: 30,
  },
  menuText: {
    fontFamily: variables.font_3,
    fontSize: 14,
    lineHeight: 16,
    color: 'white',
  },
  subTitle: {
    fontFamily: variables.font_4,
    fontSize: 14,
    color: variables.text_2,
    marginBottom: 10,
  },
  boardNameInput: {
    borderBottomWidth: 1,
    borderBottomColor: variables.line_1,
    marginBottom: 20,
  },
  colorChipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // 텍스트를 다음 줄로 넘기기 위해 필요한 속성
    marginTop: 10,
  },
  colorChip: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
    borderRadius: 30,
    marginRight: 14,
    marginBottom: 14,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: variables.line_1,
    marginTop: 20,
    marginBottom: 10,
  },
  icon: {
    color: 'white',
    fontSize: 14,
  },
});
