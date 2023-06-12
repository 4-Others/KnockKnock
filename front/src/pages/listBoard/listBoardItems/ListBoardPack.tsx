import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import BoardAll from './BoardAll';

const ListBoardPack = () => {
  return (
    <Animated.View style={styles.container}>
      <BoardAll />
    </Animated.View>
  );
};

export default ListBoardPack;

const styles = StyleSheet.create({
  container: {},
});
