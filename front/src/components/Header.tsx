import {StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import React from 'react';
import {variables} from '../style/variables';
import {useNavigation, TabActions} from '@react-navigation/native';

interface HeaderProps {
  title: string;
  type?: string;
  nextFunc?: () => void;
}

const Header = ({title, type, nextFunc}: HeaderProps) => {
  const navigation = useNavigation();
  const prevBtnIconHandller = () => {
    if (type === 'search') return require('front/assets/image/search_icon.png');
    if (type === 'edit') return require('front/assets/image/edit_icon.png');
    return require('front/assets/image/check_btn.png');
  };

  return (
    <SafeAreaView>
      <View style={[styles.container, type === 'signUp' ? null : styles.bottomLine]}>
        <View style={styles.left}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('front/assets/image/back-btn.png')}
              style={[styles.icon, {marginLeft: 24}]}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity onPress={nextFunc}>
          {type === 'alarm' || type === 'signUp' ? null : (
            <Image source={prevBtnIconHandller()} style={[styles.icon, {marginRight: 24}]} />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  },
  bottomLine: {
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
