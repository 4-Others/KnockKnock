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
  Alert,
  Platform,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../util/redux/store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {variables, VariablesKeys} from '../style/variables';

type SelectorProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onData: (value: any) => void;
  type: 'board' | 'notification'; // 타입을 구분하기 위한 프로퍼티 추가
};

const Selector: React.FC<SelectorProps> = ({modalVisible, setModalVisible, onData, type}) => {
  const [newBoard, setNewBoard] = useState({name: '', color: ''});
  const [selectedColorIndex, setSelectedColorIndex] = useState(-1);
  const [selectedNotifications, setSelectedNotifications] = useState<number[] | null>([]);
  const [notificationsColor, setNotificationsColor] = useState<number[] | null>([]);
  const boardData = useSelector((state: RootState) => state.board);

  const handleBoardValue = (type: string, value: string) => {
    setNewBoard({
      ...newBoard,
      [type]: value,
    });
  };

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
    const boardColors: string[] = Object.keys(variables)
      .filter(key => key.startsWith('board_') || key.startsWith('Mater_'))
      .map(key => variables[key as VariablesKeys] as string);

    return (
      <View style={styles.boardContainer}>
        <Text style={styles.title}>스케줄 보드</Text>
        <ScrollView horizontal={true}>
          {boardData && boardData.length > 0 ? (
            boardData.map(data => {
              const {color, tagId, name} = data;
              let colorValue: any = color;
              if (colorValue.startsWith('variables.')) {
                let colorKey = colorValue.substring('variables.'.length) as VariablesKeys;
                colorValue = variables[colorKey];
              }
              const changBoard = {color, name: name};
              return (
                <TouchableOpacity
                  style={[styles.boardSeclector, {backgroundColor: colorValue}]}
                  key={tagId}
                  onPress={() => {
                    setModalVisible(false);
                    onData(changBoard);
                  }}>
                  <Text style={styles.menuText}>{name}</Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text style={styles.boardSeclector}>No Board Data</Text>
          )}
        </ScrollView>
        <Text style={styles.subTitle}>보드 명</Text>
        <TextInput
          style={styles.boardNameInput}
          placeholder="새로운 보드 이름을 입력하세요."
          placeholderTextColor={variables.text_4}
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
                {i === selectedColorIndex ? <Icon name="check" style={styles.check} /> : null}
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (newBoard.name && newBoard.color) {
              setModalVisible(false);
              onData(newBoard);
            } else {
              Alert.alert('보드 이름과 컬러를 모두 작성해주세요.');
            }
          }}>
          <Text>보드 생성</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const notificatioData = [5, 10, 30, 60, 90, 120];

  const handleSelectNotification = (alarmTimes: number) => {
    let updatedAlerts: number[] = [];
    if (selectedNotifications) {
      if (selectedNotifications.includes(alarmTimes)) {
        updatedAlerts = selectedNotifications.filter(item => item !== alarmTimes);
      } else {
        updatedAlerts = [...selectedNotifications, alarmTimes];
      }
    }
    setSelectedNotifications(updatedAlerts.sort((a, b) => a - b));
    onData(updatedAlerts.sort((a, b) => a - b));
  };

  useEffect(() => {
    setNotificationsColor(selectedNotifications);
  }, [selectedNotifications]);

  useEffect(() => {
    if (modalVisible) {
      setSelectedNotifications([]);
      setNotificationsColor([]);
    }
  }, [modalVisible]);

  const RenderNotificationList = () => {
    return (
      <View>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={() => {
              setSelectedNotifications([]);
              onData([]);
            }}>
            <Text>알림 초기화</Text>
            <Icon name={'refresh'} style={styles.refresh} />
          </TouchableOpacity>
        </View>
        {notificatioData.map((alarmTimes, index) => {
          let isSelected;
          if (notificationsColor) {
            isSelected = notificationsColor.includes(alarmTimes);
          }
          return (
            <TouchableOpacity
              style={[styles.itemSelectMenu, isSelected ? styles.selectedPeriod : {}]}
              key={index}
              onPress={() => {
                handleSelectNotification(alarmTimes);
              }}>
              <Text>{`${alarmTimes}분 전`}</Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={styles.alarmButton}
          onPress={() => {
            setModalVisible(false);
          }}>
          <Text>선택 완료</Text>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    if (modalVisible) {
      resetBottomSheet.start();
    }
  }, [modalVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
      if (type === 'board') {
        setNewBoard({name: '', color: ''});
        setSelectedColorIndex(-1);
      }
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
          {type === 'board' ? RenderBoardList() : RenderNotificationList()}
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
    paddingBottom: 20,
  },
  itemSelectMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingLeft: 28,
    paddingTop: 10,
    paddingBottom: 10,
  },
  boardContainer: {
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
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
    ...Platform.select({
      ios: {paddingBottom: 20},
      android: {paddingBottom: 0},
    }),
  },
  colorChipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: variables.line_1,
  },
  alarmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: variables.line_1,
    marginTop: 10,
    marginRight: 20,
    marginBottom: 10,
    marginLeft: 20,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 2,
    width: 120,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: variables.line_1,
    backgroundColor: variables.back_1,
    marginTop: 20,
    marginBottom: 10,
  },
  refresh: {
    marginLeft: 2,
    paddingTop: 4,
    fontSize: 18,
  },
  check: {
    color: 'white',
    fontSize: 14,
  },
  selectedPeriod: {
    backgroundColor: variables.line_2,
  },
});
