import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LogoMark from '../../assets/image/LogoMark';
import {variables} from '../style/variables';
import {useNavigation, StackActions} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type DrawerNavigatorParamList = {
  TabNavigator: undefined;
  Profile: undefined;
};

type NavigationProp = StackNavigationProp<DrawerNavigatorParamList>;

const ProfileHeader = () => {
  const navigation = useNavigation<NavigationProp>();

  const goToHome = () => {
    navigation.dispatch(StackActions.push('TabNavigator', {locate: undefined}));
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={{justifyContent: 'center'}} onPress={goToHome}>
        <LogoMark darkMode={false} />
      </TouchableOpacity>
      <TouchableOpacity style={{justifyContent: 'center'}} onPress={handleProfilePress}>
        <Icon name="account" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  icon: {
    position: 'absolute',
    fontFamily: 'Pretendard-Medium',
    color: variables.text_1,
    fontSize: 28,
    right: 1,
  },
});
