import {StyleSheet, Platform, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {variables} from '../../../style/variables';
import BoardAll from './BoardAll';
import BoardCustom from './BoardCustom';
import {View} from 'react-native-animatable';

const deviceHeight = Dimensions.get('window').height;

const boardDatas = [
  {type: 'BoardAll', number: 65},
  {type: 'BoardCustom', title: '공부', number: 6, color: variables.Mater_6},
  {type: 'BoardCustom', title: '운동', number: 13, color: variables.Mater_13},
  {type: 'BoardCustom', title: '루틴', number: 10, color: variables.Mater_3},
  {type: 'BoardCustom', title: '모임', number: 9, color: variables.Mater_8},
  {type: 'BoardCustom', title: '업무', number: 27, color: variables.Mater_1},
];

const BoardPack = () => {
  const renderItem = ({item}: {item: any}) => {
    if (item.type === 'BoardAll') {
      return <BoardAll number={item.number} />;
    } else if (item.type === 'BoardCustom') {
      return <BoardCustom title={item.title} number={item.number} color={item.color} />;
    }
    return null;
  };

  const sliderHeight = Platform.select({
    ios: deviceHeight / 1.38,
    android: deviceHeight / 1.31,
  });

  return (
    <View>
      <LinearGradient
        style={[styles.linearGradient, {top: 0}]}
        start={{x: 0, y: 0.1}}
        end={{x: 0, y: 0.9}}
        colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']}
      />
      <Carousel
        data={boardDatas}
        renderItem={renderItem}
        layout={'default'}
        sliderHeight={sliderHeight}
        itemHeight={210}
        vertical={true}
        loop={true}
        inactiveSlideOpacity={0.8}
      />
      <LinearGradient
        style={[styles.linearGradient]}
        start={{x: 0, y: 0.1}}
        end={{x: 0, y: 0.9}}
        colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
      />
    </View>
  );
};

export default BoardPack;

const styles = StyleSheet.create({
  linearGradient: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    ...Platform.select({
      ios: {height: '15%', bottom: 42},
      android: {height: '18%', bottom: 25},
    }),
  },
});
