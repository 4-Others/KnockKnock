import {
  View,
  Text,
  ImageBackground,
  Animated,
  Dimensions,
  StyleSheet,
  Platform,
} from 'react-native';
import React, {useRef} from 'react';
import {Swipeable, RectButton} from 'react-native-gesture-handler';
import {variables} from '../../../style/variables';
import Icon from 'react-native-vector-icons/AntDesign';

interface BoardCustomProps {
  title: string;
  number: string;
  color: string;
}

const deviceWidth = Dimensions.get('window').width;

const BoardCustom: React.FC<BoardCustomProps> = ({title, number, color}) => {
  const swipeRef = useRef<Swipeable>(null);

  const renderRightActions = (dragX: any) => {
    const translate = dragX.interpolate({
      inputRange: [-100, -50, 0],
      outputRange: [-50, 0, -((deviceWidth - 255) * 0.5)],
    });
    return (
      <Animated.View style={[styles.swipeContainer, {transform: [{translateX: translate}]}]}>
        <RectButton>
          <Icon name="edit" style={styles.buttonIcon} />
        </RectButton>
        <View style={styles.partition} />
        <RectButton>
          <Icon name="adduser" style={styles.buttonIcon} />
        </RectButton>
        <View style={styles.partition} />
        <RectButton>
          <Icon name="delete" style={styles.buttonIcon} />
        </RectButton>
      </Animated.View>
    );
  };

  return (
    <View style={styles.fullWidth}>
      <Swipeable
        ref={swipeRef}
        friction={2}
        renderRightActions={renderRightActions}
        rightThreshold={15}
        overshootRight={false}>
        <ImageBackground
          source={require('../../../../assets/image/card_graphic.png')}
          style={[styles.container, {backgroundColor: color}]}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.textContainer}>
            <Text style={styles.total}>total memo</Text>
            <Text style={styles.number}>{number}</Text>
          </View>
        </ImageBackground>
      </Swipeable>
    </View>
  );
};

export default BoardCustom;

const styles = StyleSheet.create({
  fullWidth: {
    width: deviceWidth,
    height: 178,
  },
  container: {
    marginLeft: (deviceWidth - 272) / 2,
    width: 272,
    height: 178,
    backgroundColor: variables.Mater_15,
    borderRadius: 12,
  },
  texture: {width: 272, height: 178},
  title: {
    marginTop: 45,
    marginLeft: 15,
    fontFamily: variables.font_3,
    fontSize: 32,
    color: variables.text_7,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 55,
    marginLeft: 15,
  },
  total: {
    marginBottom: 2,
    fontFamily: variables.font_5,
    fontSize: 10,
    color: variables.text_7,
  },
  number: {
    marginLeft: 5,
    fontFamily: variables.font_1,
    fontSize: 14,
    color: variables.text_7,
  },
  swipeContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 7,
    width: (deviceWidth - 272) / 2,
    height: 178,
    backgroundColor: '#eeeeee',
    borderWidth: 0.6,
    borderColor: variables.line_1,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  buttonIcon: {
    ...Platform.select({
      ios: {marginLeft: (deviceWidth - 300) / 8},
      android: {marginLeft: (deviceWidth - 330) / 8},
    }),
    color: variables.text_5,
    fontSize: (deviceWidth - 220) / 7,
  },
  partition: {
    ...Platform.select({
      ios: {marginLeft: (deviceWidth - 320) / 8},
      android: {marginLeft: (deviceWidth - 330) / 8},
    }),
    width: (deviceWidth - 260) / 8,
    height: 1.2,
    backgroundColor: variables.text_6,
  },
});
