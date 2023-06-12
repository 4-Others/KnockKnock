import {View, Text, ImageBackground, Animated, Dimensions, StyleSheet} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {Swipeable} from 'react-native-gesture-handler';
import {variables} from '../../../style/variables';

const window = Dimensions.get('window');

const BoardAll = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const translateX = animatedValue.interpolate({
    inputRange: [0, 50],
    outputRange: [-1, 0],
    extrapolate: 'clamp',
  });
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: window.width * 2 - 100,
      duration: 1000,
      delay: 3000,
      useNativeDriver: true,
    }).start();
  }, []);
  const renderRightActions = () => {
    return (
      <Animated.View style={[styles.swipeContainer, {transform: [{translateX: translateX}]}]}>
        <Text>INVITE</Text>
        <Text>DELETE</Text>
      </Animated.View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../../../assets/image/card_graphic.png')}
          style={styles.container}>
          <Text style={styles.title}>전체</Text>
          <View style={styles.totalContainer}>
            <Text style={styles.total}>total memo</Text>
            <Text style={styles.number}>94</Text>
          </View>
        </ImageBackground>
      </View>
    </Swipeable>
  );
};

export default BoardAll;

const styles = StyleSheet.create({
  container: {
    width: 272,
    height: 178,
    backgroundColor: variables.Mater_15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  texture: {width: 272, height: 178},
  title: {
    marginTop: 45,
    marginLeft: 15,
    fontFamily: variables.font_3,
    fontSize: 32,
    color: variables.text_7,
  },
  totalContainer: {
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
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: 272,
    height: 178,
    backgroundColor: '#f5f5f5',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
});
