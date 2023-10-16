import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, SafeAreaView, Dimensions, View} from 'react-native';
import {useSelector} from 'react-redux';
import Header from '../../components/Header';
import {variables} from '../../style/variables';
import {AuthProps} from '../../navigations/StackNavigator';
import axios from 'axios';
import {ScheduleData} from '../../util/dataConvert';
import {format} from 'date-fns';
import ScheduleList from '../../components/ScheduleList';
import {useDispatch} from 'react-redux';
import {setScheduleReducer} from '../../util/redux/scheduleSlice';

const {width, height} = Dimensions.get('window');

type ScheduleItems = Record<string, ScheduleData[]>;

const SearchResult: React.FC<AuthProps> = ({url, navigation, route}) => {
  const user = useSelector((state: any) => state.user);
  const items = useSelector((state: any) => state.schedule.items);
  const dispatch = useDispatch();
  const setItems = (newItems: ScheduleItems) => {
    dispatch(setScheduleReducer(newItems));
  };
  const [scheduleCount, setScheduleCount] = useState(0);

  const fetchSearchData = async () => {
    try {
      const res = await axios.get(`${url}api/v1/schedule/search`, {
        headers: {Authorization: `Bearer ${user.token}`},
        params: route.params,
      });
      const fetchedData = res.data.body.data;

      const newItems: ScheduleItems = {};

      fetchedData.forEach((item: ScheduleData) => {
        if (item.tag === null) {
          item.tag = {
            name: '전체',
            color: '#757575',
            tagId: 0,
          };
        }
        const dateKey = format(new Date(item.startAt), 'yyyy-MM-dd');
        if (!newItems[dateKey]) {
          newItems[dateKey] = [];
        }
        newItems[dateKey].push(item);
      });
      let count = 0;
      Object.keys(newItems).forEach(key => {
        count += newItems[key].length;
      });
      setScheduleCount(count);
      setItems(newItems);
    } catch (error: any) {
      console.log('search 실패', error);
    }
  };

  useEffect(() => {
    fetchSearchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="검색" type="none" nextFunc={() => navigation.navigate('BoardEdit')} />
      <View style={styles.contentInfo}>
        <Text style={styles.title}>{`${route.params.keyword}에 대한 검색 결과입니다.`}</Text>
      </View>
      <View style={styles.itemNumContainer}>
        <Text style={styles.countText}>{`total memo: ${scheduleCount}`}</Text>
      </View>
      <View style={styles.listContainer}>
        {Object.keys(items).length > 0 ? (
          <ScheduleList items={items} setItems={setItems} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyViewText: {
    fontSize: 16,
    fontFamily: variables.font_4,
    color: variables.text_3,
  },
});
