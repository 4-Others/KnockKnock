import React from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, View, Text, Image} from 'react-native';
import {variables} from '../style/variables';
import {Shadow} from 'react-native-shadow-2';
import {useNavigation, StackActions} from '@react-navigation/native';
import {CalendarData} from '../util/dataConvert';

const ScheduleList = (
  {items}: any,
  setItems: React.Dispatch<React.SetStateAction<{[key: string]: CalendarData[]}>>,
) => {
  const itemsKeyArray = Object.keys(items)
    .filter((date: string) => items[date].length > 0) // 빈 배열을 제거하는 필터링 추가
    .sort();

  const handleToggleComplete = (day: string, itemId: number) => {
    setItems(prevItems => {
      const updatedItems = prevItems[day].map(item => {
        console.log(item, itemId);
        if (item.calendarId === itemId) {
          return {...item, complete: !item.complete};
        }
        return item;
      });
      return {...prevItems, [day]: updatedItems};
    });
  };

  return (
    <ScrollView style={styles.scheduleListContainer}>
      {itemsKeyArray.map((date, i) => {
        const renderDateItem = items[date];
        return (
          <View key={i}>
            <Text style={styles.listDateTitle}>{date.replace(/-/g, '.')}</Text>
            {renderDateItem.map((item: any, j: number) => (
              <ScheduleItem
                item={item}
                key={j}
                onPress={() => handleToggleComplete(date, item.calendarId)}
              />
            ))}
          </View>
        );
      })}
    </ScrollView>
  );
};

const ScheduleItem = ({item, onPress}: any) => {
  const navigation = useNavigation();
  const goToScheduleEdit = () => {
    navigation.dispatch(StackActions.push('ScheduleEdit', {item}));
  };
  return (
    <TouchableOpacity style={styles.item} onPress={goToScheduleEdit}>
      <Shadow
        style={styles.todo}
        distance={8}
        startColor={'#00000010'}
        endColor={'#ffffff05'}
        offset={[0, 1]}>
        <View style={styles.content}>
          <View style={[styles.colorChip, {backgroundColor: item.tag.color}]}></View>
          <View>
            <Text style={[styles.title, item.complete ? styles.check : styles.unCheck]}>
              {item.name}
            </Text>
            <Text style={styles.time}>{`${item.startAt.split(' ')[1]} ~ ${
              item.endAt.split(' ')[1]
            }`}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={item.complete ? styles.checkState : styles.unCheckState}
          onPress={onPress}>
          <Image style={styles.checkIcon} source={require('front/assets/image/check.png')} />
        </TouchableOpacity>
      </Shadow>
    </TouchableOpacity>
  );
};

export default ScheduleList;

export const styles = StyleSheet.create({
  scheduleListContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 24,
  },
  listDateTitle: {
    fontFamily: variables.font_3,
    color: variables.text_5,
    fontSize: 14,
    marginTop: 20,
    marginBottom: 20,
  },
  item: {marginBottom: 10},
  todo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  colorChip: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: variables.line_1,
    borderRadius: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 12,
    fontFamily: variables.font_4,
  },
  check: {
    color: variables.text_4,
    textDecorationLine: 'line-through',
  },
  unCheck: {
    color: variables.text_2,
  },
  time: {
    fontSize: 12,
    color: variables.text_4,
    fontFamily: variables.font_4,
    marginTop: 4,
  },

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
