import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import React from 'react';
import {Shadow} from 'react-native-shadow-2';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {variables} from '../style/variables';

type BoardData = {
  boardId: number;
  type: string;
  title: string;
  number: number;
  color: string;
};

type MyBoardProps = {
  data: BoardData;
};

const MyBoard: React.FC<MyBoardProps> = ({data}) => {
  const {title, number, color} = data;

  return (
    <Shadow
      style={styles.shadow}
      distance={5}
      startColor={'#00000010'}
      endColor={'#ffffff05'}
      offset={[0, 0.5]}>
      <View style={[styles.colorChip, {backgroundColor: color}]} />
      <View style={styles.container}>
        <View style={styles.containerInfo}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity style={styles.containerNav}>
          <Text style={styles.scheduleNum}>{number}</Text>
          <Icon name="chevron-right" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </Shadow>
  );
};

export default MyBoard;

const styles = StyleSheet.create({
  shadow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
    backgroundColor: variables.back_2,
    borderRadius: 6,
    borderWidth: 0.6,
    borderColor: variables.line_1,
  },
  colorChip: {
    width: 10,
    height: '100%',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  containerInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    paddingTop: 16,
    paddingBottom: 16,
    left: 0,
  },
  title: {
    fontFamily: variables.font_3,
    color: variables.text_1,
    fontSize: 20,
  },
  containerNav: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
  },
  scheduleNum: {
    marginBottom: 2,
    fontFamily: variables.font_3,
    color: variables.text_6,
    fontSize: 18,
  },
  icon: {
    marginLeft: 10,
    color: variables.text_6,
    fontSize: 15,
  },
});
