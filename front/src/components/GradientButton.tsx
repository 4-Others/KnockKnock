import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {variables} from '../style/variables';
import LinearGradient from 'react-native-linear-gradient';

interface ComponentType {
  text: string;
}

const GradientButton_S: React.FC<ComponentType> = ({text}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container}>
      <LinearGradient
        style={styles.button_S}
        start={{x: 0, y: 0}}
        end={{x: 0.6, y: 0.6}}
        colors={['#FEA97A', '#FF5789']}>
        <Text style={styles.text}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const GradientButton_L: React.FC<ComponentType> = ({text}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container}>
      <LinearGradient
        style={styles.button_L}
        start={{x: 0, y: 0}}
        end={{x: 0.6, y: 0.6}}
        colors={['#FEA97A', '#FF5789']}>
        <Text style={styles.text}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  button_S: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 107,
    height: 32,
    borderRadius: 6,
  },
  button_L: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    height: 38,
    borderRadius: 6,
  },
  text: {
    fontFamily: 'Pretendard-Medium',
    color: variables.text_7,
    fontSize: 16,
  },
});

export {GradientButton_S, GradientButton_L};
