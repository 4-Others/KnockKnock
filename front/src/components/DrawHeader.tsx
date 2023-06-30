import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import LogoMark from '../../assets/image/LogoMark';
import {variables} from '../style/variables';

const DrawHeader = () => {
  return (
    <View style={styles.header}>
      <LogoMark darkMode={false} />
      <Icon name="menu" style={styles.drawer} />
    </View>
  );
};

export default DrawHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  drawer: {
    position: 'absolute',
    fontFamily: 'Pretendard-Medium',
    color: variables.text_1,
    fontSize: 18,
    right: 22,
  },
});
