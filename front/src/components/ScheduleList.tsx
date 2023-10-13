import React, {useRef} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, View, Text, Image} from 'react-native';
import {variables} from '../style/variables';
import {Shadow} from 'react-native-shadow-2';
import {useNavigation, StackActions} from '@react-navigation/native';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {deleteScheduleItem, patchScheduleItem} from '../api/scheduleApi';
import {deleteBoardData} from '../api/boardApi';
import {ScheduleData} from '../util/dataConvert';
import {ScheduleItems} from '../util/redux/scheduleSlice';
import {Swipeable} from 'react-native-gesture-handler';

interface ScheduleItemProps {
  items: any;
  setItems: (newItems: ScheduleItems) => void;
  tagId?: number;
}

const ScheduleList: React.FC<ScheduleItemProps> = ({items, setItems, tagId}) => {
  const url = Config.API_APP_KEY as string;
  const token = useSelector((state: any) => state.user.token);
  const navigation = useNavigation();

  const itemsKeyArray = Object.keys(items)
    .filter((date: string) => items[date].length > 0)
    .sort();

  const handleToggleComplete = async (scheduleId: number) => {
    try {
      let updatedItem: ScheduleData | null = null;
      for (let date in items) {
        const item = items[date].find((item: ScheduleData) => item.scheduleId === scheduleId);
        if (item) {
          updatedItem = {...item, complete: !item.complete};
          break;
        }
      }
      if (!updatedItem) {
        console.error(`완료여부 변경 실패한 스케줄 ID: ${scheduleId}`);
        return;
      }

      const result = await patchScheduleItem(url, token, scheduleId, updatedItem);
      if (typeof result !== 'boolean' && result !== undefined) {
        const updatedItems: ScheduleItems = {...items};
        for (let date in updatedItems) {
          updatedItems[date] = updatedItems[date].map((item: ScheduleData) =>
            item.scheduleId === scheduleId ? updatedItem || item : item,
          );
        }
        setItems(updatedItems);
        console.log('완료여부 변경 성공!');
      }
    } catch (error) {
      console.error('Error toggling schedule item:', error);
    }
  };

  const handleDelete = async (scheduleId: number, tagId: number) => {
    const success = await deleteScheduleItem(url, token, scheduleId);
    if (success) {
      const updatedItems: ScheduleItems = {...items};
      let isEmptyBoard = true;
      for (let date in updatedItems) {
        updatedItems[date] = updatedItems[date].filter(
          (item: ScheduleData) => item.scheduleId !== scheduleId,
        );
        if (updatedItems[date].some(item => item.tag.tagId)) {
          isEmptyBoard = false;
        }
      }
      setItems(updatedItems);
      if (isEmptyBoard) {
        const success = await deleteBoardData(url, token, tagId);
        if (success) {
          const updatedItems: ScheduleItems = {...items};
          for (let date in items) {
            updatedItems[date] = items[date].filter(
              (item: ScheduleData) => item.tag.tagId !== tagId,
            );
          }
          navigation.goBack();
          setItems(updatedItems);
        } else {
          console.error(`자동 삭제 실패한 보드 ID: ${tagId}`);
        }
      }
    } else {
      console.error(`삭제 실패한 스케줄 ID: ${scheduleId}`);
    }
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
                onPress={handleToggleComplete}
                onDelete={handleDelete}
                tagId={tagId}
              />
            ))}
          </View>
        );
      })}
    </ScrollView>
  );
};
const ScheduleItem = ({item, onPress, onDelete, tagId}: any) => {
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
        onDelete(item.scheduleId, tagId);
        resetSwipeable();
      }}>
      <Text style={styles.deleteText}>Delete</Text>
    </TouchableOpacity>
  );

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    return dateStr.split(' ')[0];
  };

  const formatDateTime = (dateTimeStr: string) => {
    if (!dateTimeStr) return '';
    const [date, time] = dateTimeStr.split(' ');
    return `${date} ${time.split(':')[0]}:${time.split(':')[1]}`;
  };

  const tagColor = item.tag && item.tag.color ? item.tag.color : '#757575';

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
            <View style={[styles.colorChip, {backgroundColor: tagColor}]}></View>
            <View>
              <Text style={[styles.title, item.complete ? styles.check : styles.unCheck]}>
                {item.title}
              </Text>
              {item.period === 'ALL_DAY' ? (
                <Text style={styles.time}>{formatDate(item.startAt)}</Text>
              ) : (
                <Text style={styles.time}>
                  {formatDateTime(item.startAt)} ~ {formatDateTime(item.endAt)}
                </Text>
              )}
            </View>
          </View>
          <TouchableOpacity
            style={item.complete ? styles.checkState : styles.unCheckState}
            onPress={() => onPress(item.scheduleId)}>
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
