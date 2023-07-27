import {Text, StyleSheet, SafeAreaView, Dimensions, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, RouteProp, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Header from '../../components/Header';
import ScheduleItemlList from '../../components/ScheduleItemList';
import detailData from './detailData.json';
import {format} from 'date-fns';
import {variables} from '../../style/variables';
import {Shadow} from 'react-native-shadow-2';

const {width, height} = Dimensions.get('window');

type navigationProp = StackNavigationProp<RootStackParamList, 'BoardEdit'>;

type RootStackParamList = {
  BoardEdit: undefined;
  BoardDetail: {title: string; color: string};
};

type BoardDetailRouteProp = RouteProp<RootStackParamList, 'BoardDetail'>;

type ConvertProps = {
  [key: string]: Array<{
    scheduleId: number;
    title: string;
    content: string;
    period: string;
    startAt: string;
    endAt: string;
    alerts: never[];
    createdAt: string;
    modifiedAt: string;
    complete: boolean;
    tag: {
      name: string;
      color: string;
    };
  }>;
};

const BoardDetail = () => {
  const [items, setItems] = useState<ConvertProps>({});
  const [itemCount, setItemCount] = useState<number>(0);
  const navigation = useNavigation<navigationProp>();
  const route = useRoute<BoardDetailRouteProp>();
  const {title, color} = route.params;

  const loadItems = () => {
    const newItems: any = {};

    detailData.forEach(schedule => {
      const dateKey = format(new Date(schedule.startAt), 'yyyy-MM-dd');
      if (!newItems[dateKey]) {
        newItems[dateKey] = [];
      }
      newItems[dateKey].push({
        name: schedule.title,
        day: schedule.createdAt,
        complete: schedule.complete,
        color: schedule.tag.color,
        startAt: schedule.startAt.split(' ')[1].slice(0, 5),
        endAt: schedule.endAt.split(' ')[1].slice(0, 5),
        board: schedule.tag.name,
        content: schedule.content,
        period: schedule.period,
        alerts: schedule.alerts,
        tag: {},
      });
    });
    setItems(newItems);
  };

  useEffect(() => {
    let count = 0;
    for (let key in items) {
      count += items[key].length;
    }
    setItemCount(count);
  }, [items]);

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="리스트 보드"
        type="edit"
        nextNavigation={() => navigation.navigate('BoardEdit')}
      />
      <ScrollView style={styles.ScheduleItemList}>
        <Shadow
          style={styles.shadow}
          distance={8}
          startColor={'#00000010'}
          endColor={'#ffffff05'}
          offset={[0, 1]}>
          <View style={[styles.contentInfo, {backgroundColor: color}]}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.itemNumContainer}>
              <Text style={styles.textMemo}>total memo:</Text>
              <Text style={styles.textNum}> {itemCount}</Text>
            </View>
          </View>
        </Shadow>
        <View style={styles.listContainer}>
          <ScheduleItemlList items={items} setItems={setItems} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BoardDetail;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
  ScheduleItemList: {
    width: '100%',
    height: '100%',
  },
  contentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 12,
    paddingRight: 20,
    paddingBottom: 10,
    paddingLeft: 36,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  shadow: {
    width: '100%',
  },
  title: {
    fontFamily: variables.font_3,
    fontSize: 30,
    color: variables.text_7,
  },
  itemNumContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  textMemo: {
    fontFamily: variables.font_5,
    fontSize: 16,
    color: variables.text_7,
  },
  textNum: {
    fontFamily: variables.font_2,
    fontSize: 19,
    color: variables.text_7,
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
    marginRight: 12,
    marginLeft: 12,
    paddingBottom: 150,
  },
});
