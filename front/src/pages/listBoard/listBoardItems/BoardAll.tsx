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

const deviceWidth = Dimensions.get('window').width;

const BoardAll = () => {
  const swipeRef = useRef(null);

  const renderRightActions = (dragX: any) => {
    const translate = dragX.interpolate({
      ...Platform.select({
        ios: {inputRange: [0, 8, 10, 10], outputRange: [-74, 0, 0, 0]},
        android: {inputRange: [0, 8, 10, 10], outputRange: [-80, 0, 0, 0]},
      }),
    });
    return (
      <Animated.View style={[styles.swipeContainer, {transform: [{translateX: translate}]}]}>
        <View style={styles.innerShadow}>
          <RectButton>
            <Text style={styles.buttonIcon}>+</Text>
            <View style={styles.partition} />
            <Text style={styles.buttonIcon}>=</Text>
          </RectButton>
        </View>
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
            <Text style={styles.total}>total memo</Text>
            <Text style={styles.number}>94</Text>
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
    height: 178,
  },
  container: {
    ...Platform.select({
      ios: {marginLeft: '10%'},
      android: {marginLeft: '15%'},
    }),
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
    width: 50,
    height: 178,
    backgroundColor: '#eeeeee',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  innerShadow: {
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 50,
    height: 178,
    backgroundColor: 'transparent',
    borderColor: variables.line_1,
    ...Platform.select({
      ios: {
        borderRadius: 12,
        borderWidth: 0.1,
        overflow: 'hidden',
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#000',
        shadowOpacity: 0.15,
      },
      android: {borderTopRightRadius: 12, borderBottomRightRadius: 12, borderWidth: 0.4},
    }),
  },
  buttonIcon: {
    ...Platform.select({
      ios: {marginLeft: 12},
      android: {marginLeft: 10},
    }),
    marginVertical: 15,
    color: variables.text_5,
    fontSize: 40,
  },
  partition: {
    ...Platform.select({
      ios: {marginLeft: 16},
      android: {marginLeft: 13},
    }),
    width: 16,
    height: 1.2,
    backgroundColor: variables.text_6,
  },
});
