import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native/types';

interface ComponentType {
  text: string;
}

const GradientButton: React.FC<ComponentType> = ({text}) => {
  return (
    <LinearGradient
      style={{}}
      start={{x: 0, y: 0}}
      end={{x: 0.6, y: 0.6}}
      colors={['#FEA97A', '#FF5789']}
    />
  );
};

const Styled = StyleSheet.create({});

export default GradientButton;
