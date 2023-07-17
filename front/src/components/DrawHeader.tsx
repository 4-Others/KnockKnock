import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import LogoMark from '../../assets/image/LogoMark';
import {variables} from '../style/variables';
import {useNavigation, StackActions} from '@react-navigation/native';

const DrawHeader = () => {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.dispatch(StackActions.push('TabNavigator', {locate: undefined}));
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity style={{justifyContent: 'center'}} onPress={goToHome}>
        <LogoMark darkMode={false} />
      </TouchableOpacity>
      <TouchableOpacity style={{justifyContent: 'center'}}>
        <Icon name="menu" style={styles.drawer} />
      </TouchableOpacity>
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
