import {View, Animated, StyleSheet, Platform, Dimensions} from 'react-native';
import Swiper from 'react-native-swiper';
import React from 'react';
import {variables} from '../../../style/variables';
import BoardAll from './BoardAll';
import BoardCustom from './BoardCustom';

const deviceWidth = Dimensions.get('window').width;

const BoardPack = () => {
  return (
    <Animated.View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsPagination={false}
        showsButtons={false}
        loop={true}
        horizontal={false}>
        <View>
          <BoardAll number={'29'} />
        </View>
        <View>
          <BoardCustom title={'공부'} number={'12'} color={variables.Mater_6} />
        </View>
        <View>
          <BoardCustom title={'운동'} number={'17'} color={variables.Mater_13} />
        </View>
      </Swiper>
    </Animated.View>
  );
};

export default BoardPack;

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {paddingVertical: (deviceWidth - 335) * 4},
      android: {paddingVertical: (deviceWidth - 342) * 4},
    }),
  },
  wrapper: {},
});
