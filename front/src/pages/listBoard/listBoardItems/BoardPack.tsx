import {Animated, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {variables} from '../../../style/variables';
import BoardAll from './BoardAll';
import BoardCustom from './BoardCustom';

const BoardPack = () => {
  return (
    <Animated.View style={styles.container}>
      <BoardAll number={'29'} />
      <BoardCustom title={'공부'} number={'12'} color={variables.Mater_6} />
      <BoardCustom title={'운동'} number={'17'} color={variables.Mater_13} />
    </Animated.View>
  );
};

export default BoardPack;

const styles = StyleSheet.create({
  container: {},
});
