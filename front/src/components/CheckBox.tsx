import React, {useState} from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {variables} from '../style/variables';

interface CheckProps {
  func: () => void;
}

export const CheckBox: React.FC<CheckProps> = ({func}) => {
  const [on, setOn] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => {
        setOn(on => !on);
        func();
      }}
      style={on ? styles.checkState : styles.unCheckState}>
      <Image style={styles.checkIcon} source={require('front/assets/image/check.png')} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkState: {
    width: 18,
    height: 18,
    backgroundColor: '#FF5789',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  unCheckState: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: variables.line_1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  checkIcon: {
    width: 10,
    height: 6,
  },
});
