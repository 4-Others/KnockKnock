import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, SafeAreaView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ScheduleItems, setScheduleReducer} from '../../util/redux/scheduleSlice';
import {AuthProps} from '../../navigations/StackNavigator';
import Header from '../../components/Header';
import ScheduleList from '../../components/ScheduleList';
import {variables} from '../../style/variables';

const SearchResult: React.FC<AuthProps> = ({navigation, route}) => {
  const items = useSelector((state: any) => state.schedule.items);
  const dispatch = useDispatch();
  const setItems = (newItems: ScheduleItems) => {
    dispatch(setScheduleReducer(newItems));
  };
  const [count, setCount] = useState(0);

  const itemCount = (items: ScheduleItems) => {
    let count = 0;
    Object.keys(items).forEach(key => {
      count += items[key].length;
    });
    setCount(count);
  };

  useEffect(() => {
    itemCount(items);
  }, [items]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="검색" type="none" nextFunc={() => navigation.navigate('BoardEdit')} />
      <View style={styles.contentInfo}>
        <Text style={styles.title}>
          {route.keyword ? `${route.keyword}에 대한 검색 결과입니다.` : '기간 검색 결과입니다.'}
        </Text>
      </View>
      <View style={styles.itemNumContainer}>
        <Text style={styles.countText}>{`total memo: ${count}`}</Text>
      </View>
      <View style={styles.listContainer}>
        {Object.keys(items).length > 0 ? (
          <ScheduleList items={items} setItems={(newItems: ScheduleItems) => setItems(newItems)} />
        ) : (
          <EmptySearch />
        )}
      </View>
    </SafeAreaView>
  );
};

const EmptySearch = () => {
  return (
    <View style={styles.emptyViewLayout}>
      <Text style={styles.emptyViewText}>검색 결과를 찾을 수 없습니다.</Text>
    </View>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 5,
    borderBottomColor: variables.line_2,
    padding: 20,
  },
  title: {
    fontFamily: variables.font_2,
    fontSize: 20,
    color: variables.text_3,
  },
  itemNumContainer: {
    paddingBottom: 12,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: variables.back_1,
    borderBottomColor: variables.line_1,
    borderBottomWidth: 1,
  },
  countText: {
    fontFamily: variables.font_5,
    fontSize: 16,
    color: variables.text_3,
    marginTop: 5,
  },
  listContainer: {
    height: '100%',
    paddingBottom: 150,
  },
  emptyViewLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyViewText: {
    fontSize: 16,
    fontFamily: variables.font_4,
    color: variables.text_3,
  },
});
