import {Animated, Dimensions, StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import Board from './Board';

const ListBoardPack = () => {
  return (
    <Animated.View>
      <Board />
    </Animated.View>
  );
};

export default ListBoardPack;
