import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {variables} from '../style/variables';
import {useNavigation} from '@react-navigation/native';

interface HeaderProps {
  title: string;
  type?: string;
  nextNavigation?: () => void;
}

const Header = ({title, type, nextNavigation}: HeaderProps) => {
  const navigation = useNavigation();

  const prevBtnIconHandller = () => {
    if (type === 'search') return require('front/assets/image/search_icon.png');
    if (type === 'edit') return require('front/assets/image/edit_icon.png');
    return require('front/assets/image/check_btn.png');
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('front/assets/image/back-btn.png')}
            style={[styles.icon, {marginLeft: 24}]}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity onPress={nextNavigation}>
        {type === 'alarm' ? null : (
          <Image source={prevBtnIconHandller()} style={[styles.icon, {marginRight: 24}]} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 72,
    borderBottomWidth: 2,
    borderBottomColor: variables.line_2,
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {
    fontFamily: variables.font_2,
    color: variables.text_2,
    fontSize: 18,
    marginLeft: 10,
  },
  left: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
