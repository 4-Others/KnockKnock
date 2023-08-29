import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {variables} from '../style/variables';
import {StyleProp, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface ComponentType {
  text: string;
  onPress?: () => any;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const GradientButton_S: React.FC<ComponentType> = ({text, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={onPress}>
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

const GradientButton_L: React.FC<ComponentType> = ({text, onPress, disabled, style}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, style]}
      onPress={onPress}
      disabled={disabled}>
      <LinearGradient
        style={styles.button_L}
        start={{x: -0.1, y: 0}}
        end={{x: 0.9, y: 0.5}}
        colors={disabled ? ['#eee', '#f1f1f1'] : ['#FEA97A', '#FF5789']}>
        <Text style={styles.text}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    height: 44,
    borderRadius: 6,
  },
  text: {
    fontFamily: variables.font_3,
    color: variables.text_7,
    fontSize: 16,
  },
});

export {GradientButton_S, GradientButton_L};
