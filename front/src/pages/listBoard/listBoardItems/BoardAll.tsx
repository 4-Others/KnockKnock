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

interface BoardAllProps {
  number: number;
}

const deviceWidth = Dimensions.get('window').width;

const BoardAll: React.FC<BoardAllProps> = ({number}) => {
  const swipeRef = useRef<Swipeable>(null);

  const renderRightActions = (dragX: any) => {
    const translate = dragX.interpolate({
      inputRange: [-100, -50, 0],
      outputRange: [-50, 0, -((deviceWidth - 300) * 0.5)],
    });
    return (
      <Animated.View style={[styles.swipeContainer, {transform: [{translateX: translate}]}]}>
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
          style={styles.container}>
          <Text style={styles.title}>전체</Text>
          <View style={styles.textContainer}>
            <Text style={styles.total}>total list</Text>
            <Text style={styles.number}>{number}</Text>
          </View>
        </ImageBackground>
      </Swipeable>
    </View>
  );
};

export default BoardAll;

const styles = StyleSheet.create({
  fullWidth: {
    width: deviceWidth,
    height: 209,
  },
  container: {
    marginLeft: (deviceWidth - 320) / 2,
    width: 320,
    height: 209,
    backgroundColor: variables.Mater_15,
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
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 18,
    width: (deviceWidth - 272) / 2,
    height: 209,
    backgroundColor: '#eeeeee',
    borderWidth: 0.6,
    borderColor: variables.line_1,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
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
