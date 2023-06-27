import {Platform, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import React from 'react';
import {variables} from '../../../style/variables';
import BoardAll from './BoardAll';
import BoardCustom from './BoardCustom';

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

  const cardOffset = Platform.select({
    ios: -46,
    android: 26,
  });
  const sliderHeight = Platform.select({
    ios: (deviceHeight - 510) * 4,
    android: (deviceHeight - 590) * 4,
  });
  const itemHeight = Platform.select({
    ios: (deviceHeight - 630) * 8,
    android: (deviceHeight - 740) * 8,
  });

  return (
    <Carousel
      data={boardDatas}
      renderItem={renderItem}
      layout={'stack'}
      layoutCardOffset={cardOffset}
      sliderHeight={sliderHeight}
      itemHeight={itemHeight}
      vertical={true}
      loop={true}
      inactiveSlideOpacity={1}
    />
  );
};

export default BoardPack;
