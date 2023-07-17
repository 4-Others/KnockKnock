import React, {useEffect, useRef} from 'react';
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
} from 'react-native';
import {variables} from '../style/variables';
import {VariablesKeys} from '../style/variables';

type BottomSheetProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  BoardData: {
    boardId: number;
    type: string;
    title: string;
    number: number;
    color: string;
  }[];
  setScheduleData: React.Dispatch<
    React.SetStateAction<{
      id: number;
      complete: string;
      startAt: string;
      endAt: string;
      name: string;
      board: string;
      content: string;
      day: string;
    }>
  >;
};

//? modalBottomSheet 레이아웃
const BottomSheet: React.FC<BottomSheetProps> = props => {
  const {modalVisible, setModalVisible, BoardData, setScheduleData} = props;

  const handleBoardSelect = (value: string) => {
    setScheduleData(prevData => ({
      ...prevData,
      board: value,
    }));
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
          {BoardData.map(data => {
            let colorValue: any = data.color;
            if (colorValue.startsWith('variables.')) {
              let colorKey = colorValue.substring('variables.'.length) as VariablesKeys;
              colorValue = variables[colorKey];
            }
            return (
              <TouchableOpacity
                style={styles.itemSelectMenu}
                key={data.boardId}
                onPress={() => {
                  setModalVisible(false);
                  handleBoardSelect(data.title);
                }}>
                <View style={[styles.colorChip, {backgroundColor: colorValue}]}></View>
                <Text style={styles.menuText}>{data.title}</Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </View>
    </Modal>
  );
};

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
  menuText: {
    fontFamily: variables.font_3,
    fontSize: 16,
    color: variables.text_3,
  },
  colorChip: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: variables.line_1,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default BottomSheet;
