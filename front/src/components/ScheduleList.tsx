import React, {useRef} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, View, Text, Image} from 'react-native';
import {variables} from '../style/variables';
import {Shadow} from 'react-native-shadow-2';
import {useNavigation, StackActions} from '@react-navigation/native';
import {ScheduleData} from '../util/dataConvert';
import {Swipeable} from 'react-native-gesture-handler';

const ScheduleList = (
  {items}: any,
  setItems: (newItems: {[key: string]: ScheduleData[]}) => void,
) => {
  // 빈 배열을 제거하는 함수
  const itemsKeyArray = Object.keys(items)
    .filter((date: string) => items[date].length > 0)
    .sort();
  // 일정 완료 체크 토글 함수
  const handleToggleComplete = (day: string, itemId: number) => {
    const updatedItems = items[day].map((item: ScheduleData) => {
      console.log(item, itemId);
      if (item.calendarId === itemId) {
        return {...item, complete: !item.complete};
      }
      return item;
    });
    setItems({...items, [day]: updatedItems});
  };

  // 아이템 삭제 함수
  const handleDelete = (itemId: number) => {
    const updatedItems = {...items};

    for (const day of itemsKeyArray) {
      updatedItems[day] = updatedItems[day].filter(
        (item: ScheduleData) => item.calendarId !== itemId,
      );
    }
    setItems(updatedItems);
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
                onDelete={handleDelete}
              />
            ))}
          </View>
        );
      })}
    </ScrollView>
  );
};

const ScheduleItem = ({item, onPress, onDelete}: any) => {
  const swipeableRef = useRef<Swipeable | null>(null);
  const resetSwipeable = () => {
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  };
  const navigation = useNavigation();
  const goToScheduleEdit = () => {
    navigation.dispatch(StackActions.push('ScheduleEdit', {item}));
  };
  const renderRightActions = () => (
    <TouchableOpacity
      style={styles.deleteArea}
      onPress={() => {
        onDelete(item.calendarId);
        resetSwipeable();
      }}>
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <Swipeable ref={swipeableRef} renderRightActions={renderRightActions}>
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
    </Swipeable>
  );
};

export default ScheduleList;

export const styles = StyleSheet.create({
  scheduleListContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 30,
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
  deleteArea: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: variables.Mater_14,
    padding: 14,
    marginBottom: 10,
    marginLeft: 20,
    borderRadius: 6,
  },
  deleteText: {
    color: 'white',
    fontFamily: variables.font_4,
  },
});
