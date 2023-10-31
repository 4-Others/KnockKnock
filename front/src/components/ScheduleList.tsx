import React, {useRef} from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, View, Text, Image} from 'react-native';
import {variables} from '../style/variables';
import {useNavigation, StackActions} from '@react-navigation/native';
import Config from 'react-native-config';
import {useDispatch, useSelector} from 'react-redux';
import {deleteScheduleItem, patchScheduleItem} from '../api/scheduleApi';
import {deleteBoardData, fetchBoardData} from '../api/boardApi';
import {ScheduleData} from '../util/dataConvert';
import {ScheduleItems} from '../util/redux/scheduleSlice';
import {setBoardReducer} from '../util/redux/boardSlice';
import {Swipeable} from 'react-native-gesture-handler';

interface ScheduleItemProps {
  items: any;
  setItems: (newItems: ScheduleItems) => void;
  tagId?: number;
}

const ScheduleList: React.FC<ScheduleItemProps> = ({items, setItems, tagId}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const url = Config.API_APP_KEY as string;
  const token = useSelector((state: any) => state.user.token);
  const [openSwipeable, setOpenSwipeable] = React.useState<Swipeable | null>(null);
  console.log('items:', JSON.stringify(items, null, 2)); //!
  const handleCloseSwipeable = () => {
    if (openSwipeable) {
      openSwipeable.close();
    }
  };

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

  const handleDelete = async (scheduleId: number) => {
    const success = await deleteScheduleItem(url, token, scheduleId);
    if (success) {
      const updatedItems: ScheduleItems = {...items};
      for (let date in updatedItems) {
        updatedItems[date] = updatedItems[date].filter(
          (item: ScheduleData) => item.scheduleId !== scheduleId,
        );
      }
      setItems(updatedItems);

      try {
        const tagResponse = await fetchBoardData(url, token);
        dispatch(setBoardReducer(tagResponse));
        const boardToDelete = tagResponse.find(
          (board: {scheduleCount: number; name: string}) =>
            board.scheduleCount === 0 && board.name !== '전체',
        );

        if (boardToDelete) {
          const deleteSuccess = await deleteBoardData(url, token, boardToDelete.tagId);
          if (deleteSuccess) {
            const updatedTagResponse = await fetchBoardData(url, token);
            dispatch(setBoardReducer(updatedTagResponse));
            navigation.goBack();
          } else {
            console.error(`보드 삭제 실패: ${boardToDelete.tagId}`);
          }
        }
      } catch (error) {
        console.error('보드 데이터 갱신 중 에러 발생:', error);
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
                onOpenSwipeable={setOpenSwipeable}
                onCloseSwipeable={handleCloseSwipeable}
              />
            ))}
          </View>
        );
      })}
    </ScrollView>
  );
};
const ScheduleItem = ({item, onPress, onDelete, tagId, onOpenSwipeable, onCloseSwipeable}: any) => {
  const navigation = useNavigation();
  const swipeableRef = useRef<Swipeable | null>(null);

  const goToScheduleEdit = () => {
    navigation.dispatch(StackActions.push('ScheduleEdit', {item}));
  };

  const renderRightActions = () => (
    <TouchableOpacity
      style={styles.deleteArea}
      onPress={() => {
        onDelete(item.scheduleId, tagId);
        onCloseSwipeable();
      }}>
      <Text style={styles.deleteText}>삭제</Text>
    </TouchableOpacity>
  );

  const handleSwipeableOpen = () => {
    onOpenSwipeable(swipeableRef.current);
    onCloseSwipeable();
  };

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
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      onSwipeableOpen={handleSwipeableOpen}>
      <TouchableOpacity style={styles.item} onPress={goToScheduleEdit}>
        <View style={styles.content}>
          <View style={[styles.colorChip, {backgroundColor: tagColor}]}></View>
          <View>
            <Text style={[styles.title, item.complete ? styles.check : styles.unCheck]}>
              {item.title}
            </Text>
            {item.period === 'ALL_DAY' && formatDate(item.startAt) === formatDate(item.endAt) ? (
              <Text style={styles.time}>{formatDate(item.startAt)}</Text>
            ) : item.period === 'ALL_DAY' ? (
              <Text style={styles.time}>
                {formatDate(item.startAt)} ~ {formatDate(item.endAt)}
              </Text>
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
      </TouchableOpacity>
    </Swipeable>
  );
};

export default ScheduleList;

export const styles = StyleSheet.create({
  scheduleListContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 30,
  },
  listDateTitle: {
    fontFamily: variables.font_2,
    color: variables.text_4,
    fontSize: 14,
    marginTop: 26,
    paddingBottom: 5,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: variables.line_2,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingRight: 24,
    paddingBottom: 10,
    paddingLeft: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: variables.line_2,
  },
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
    marginRight: 10,
    marginLeft: 4,
    paddingHorizontal: 16,
    height: '100%',
    borderRadius: 5,
  },
  deleteText: {
    color: 'white',
    fontFamily: variables.font_4,
  },
});
