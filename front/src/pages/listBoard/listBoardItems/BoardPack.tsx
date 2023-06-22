import {StyleSheet, Platform, Dimensions} from 'react-native';
import {View} from 'react-native-animatable';
import React, {useRef, useEffect} from 'react';
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {variables, VariablesKeys} from '../../../style/variables';
import boardData from './boardData.json';
import BoardAll from './BoardAll';
import BoardCustom from './BoardCustom';

const deviceHeight = Dimensions.get('window').height;

type BoardPackProps = {
  active: number;
  onActiveChange: (newValue: number) => void;
};

const BoardPack = ({active, onActiveChange}: BoardPackProps) => {
  const carouselRef = useRef<any>(null);

  useEffect(() => {
    const activeIndex = boardData.findIndex(data => data.listBoardId === active);
    if (activeIndex !== -1) {
      carouselRef.current?.snapToItem(activeIndex, false);
    }
  }, [active]);

  const renderItem = ({item}: {item: any}) => {
    if (item.type === 'BoardAll') {
      return (
        <BoardAll
          key={item.listBoardId.toString()}
          listBoardId={item.listBoardId}
          number={item.number}
        />
      );
    } else if (item.type === 'BoardCustom') {
      let colorValue = item.color;
      if (colorValue.startsWith('variables.')) {
        let colorKey = colorValue.substring('variables.'.length) as VariablesKeys;
        colorValue = variables[colorKey];
      }
      return (
        <BoardCustom
          key={item.listBoardId.toString()}
          listBoardId={item.listBoardId}
          title={item.title}
          number={item.number}
          color={colorValue}
        />
      );
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
        ref={carouselRef}
        data={boardData}
        renderItem={renderItem}
        layout={'default'}
        sliderHeight={sliderHeight}
        itemHeight={210}
        vertical={true}
        loop={true}
        inactiveSlideOpacity={0.8}
        onSnapToItem={index => onActiveChange(boardData[index].listBoardId)}
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
