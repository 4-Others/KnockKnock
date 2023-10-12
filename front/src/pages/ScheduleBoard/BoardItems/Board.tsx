import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Animated,
  Dimensions,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Swipeable, RectButton} from 'react-native-gesture-handler';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {variables} from '../../../style/variables';
import {deleteBoardData} from '../../../api/boardApi';
import {BoardItem} from '../../../util/dataConvert';
import Icon from 'react-native-vector-icons/AntDesign';

type BoardItems = BoardItem[];

interface BoardItemProps {
  boardId: number;
  title: string;
  number: number;
  color: string;
  active: number | null;
  items: any;
  setItems: (newItems: BoardItems) => void;
}

const deviceWidth = Dimensions.get('window').width;

const Board: React.FC<BoardItemProps> = ({
  boardId,
  title,
  number,
  color,
  active,
  items,
  setItems,
}) => {
  const url = Config.API_APP_KEY as string;
  const user = useSelector((state: any) => state.user);
  const swipeRef = useRef<Swipeable>(null);
  const navigation = useNavigation<any>();

  useEffect(() => {
    swipeRef.current?.close();
  }, [active]);

  const handleEditPress = () => {
    navigation.navigate('BoardEdit', {
      item: {
        tagId: boardId,
        name: title,
        color: color,
      },
    });
  };

  const handleDeletePress = async (boardId: number) => {
    const success = await deleteBoardData(url, user.token, boardId);
    if (success) {
      const updatedItems = items.filter((item: BoardItem) => item.tagId !== boardId);
      setItems(updatedItems);
    } else {
      console.error(`삭제 실패한 보드 ID: ${boardId}`);
    }
  };

  const handleBoardPress = () => {
    navigation.navigate('BoardDetail', {title, color, number});
  };

  const renderRightActions = (dragX: any) => {
    const translate = dragX.interpolate({
      inputRange: [-50, -10, 0],
      outputRange: [-50, 0, -((deviceWidth - 310) * 0.5)],
    });

    return (
      <Animated.View style={[styles.swipeContainer, {transform: [{translateX: translate}]}]}>
        <RectButton onPress={() => handleEditPress()}>
          <Icon name="edit" style={styles.buttonIcon} />
        </RectButton>
        <View style={styles.partition} />
        <RectButton onPress={() => handleDeletePress(boardId)}>
          <Icon name="delete" style={styles.buttonIcon} />
        </RectButton>
      </Animated.View>
    );
  };

  return (
    <View style={styles.fullWidth}>
      {title === '전체' && color === '#757575' ? (
        <TouchableOpacity onPress={handleBoardPress}>
          <ImageBackground
            source={require('../../../../assets/image/card_graphic.png')}
            style={[styles.container, {backgroundColor: color}]}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.textContainer}>
              <Text style={styles.total}>total list</Text>
              <Text style={styles.number}>{number}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      ) : (
        <Swipeable
          key={boardId}
          ref={swipeRef}
          friction={2}
          rightThreshold={10}
          overshootRight={false}
          renderRightActions={renderRightActions}>
          <TouchableOpacity onPress={handleBoardPress}>
            <ImageBackground
              source={require('../../../../assets/image/card_graphic.png')}
              style={[styles.container, {backgroundColor: color}]}>
              <Text style={styles.title}>{title}</Text>
              <View style={styles.textContainer}>
                <Text style={styles.total}>total list</Text>
                <Text style={styles.number}>{number}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </Swipeable>
      )}
    </View>
  );
};

export default Board;

const styles = StyleSheet.create({
  fullWidth: {
    width: deviceWidth,
    height: 209,
  },
  container: {
    marginLeft: (deviceWidth - 320) / 2,
    width: 320,
    height: 209,
    borderRadius: 14,
  },
  texture: {width: 320, height: 209},
  title: {
    marginTop: 50,
    marginLeft: 17,
    fontFamily: variables.font_3,
    fontSize: 36,
    color: variables.text_7,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    ...Platform.select({
      ios: {marginTop: 80},
      android: {marginTop: 70},
    }),
    marginLeft: 17,
  },
  total: {
    marginBottom: 1,
    fontFamily: variables.font_5,
    fontSize: 13,
    color: variables.text_7,
  },
  number: {
    marginLeft: 5,
    fontFamily: variables.font_1,
    fontSize: 16,
    color: variables.text_7,
  },
  swipeContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: (deviceWidth - 282) / 2,
    height: 209,
    backgroundColor: '#eeeeee',
    borderWidth: 0.6,
    borderColor: variables.line_1,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
  },
  buttonIcon: {
    paddingVertical: 40,
    color: variables.text_5,
    fontSize: (deviceWidth - 220) / 7,
    ...Platform.select({
      ios: {paddingHorizontal: (deviceWidth - 130) / 8},
      android: {paddingHorizontal: (deviceWidth - 300) / 8},
    }),
  },
  partition: {
    ...Platform.select({
      ios: {marginRight: (deviceWidth - 280) / 8},
      android: {marginRight: (deviceWidth - 270) / 8},
    }),
    width: (deviceWidth - 260) / 8,
    height: 1.2,
    backgroundColor: variables.text_6,
  },
});
