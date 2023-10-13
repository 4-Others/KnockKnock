import React, {useEffect, useState} from 'react';
import {ExpandableCalendar, CalendarProvider} from 'react-native-calendars';
import {AuthProps} from '../../navigations/StackNavigator';
import {useSelector, useDispatch} from 'react-redux';
import ProfileHeader from '../../components/ProfileHeader';
import {SafeAreaView, Platform, Dimensions, StyleSheet, View, Text} from 'react-native';
import {variables} from '../../style/variables';
import {Positions} from 'react-native-calendars/src/expandableCalendar';
import axios from 'axios';
import {convertItemList} from '../../util/dataConvert';
import {ScheduleItems} from '../../util/redux/scheduleSlice';
import {setScheduleItems} from '../../util/redux/scheduleSlice';
import ScheduleList from '../../components/ScheduleList';
import format from 'date-fns/format';

const deviceWidth = Dimensions.get('window').width;

const Calendar: React.FC<AuthProps> = ({url}) => {
  const dispatch = useDispatch();
  const items = useSelector((state: any) => state.schedule.items);
  const token = useSelector((state: any) => state.user.token);
  const setItems = (newItems: ScheduleItems) => dispatch(setScheduleItems(newItems));
  const [calendarItems, setCalendarItems] = useState<ScheduleItems>({});
  console.log(Object.keys(calendarItems).length);

  const selectedDateHandller = (dateString: string) => {
    const newCalendarItems = items[dateString];
    if (newCalendarItems) {
      setCalendarItems({[dateString]: newCalendarItems});
    } else setCalendarItems({});
  };

  const fetchScheduleItems = async (year: number, month: number) => {
    try {
      const firstDay = format(new Date(year, month, 1), 'yyyy-MM-dd');
      const nextMonth = new Date(year, month + 1, 1);
      const lastDay = format(new Date(nextMonth.getTime() - 1), 'yyyy-MM-dd');
      const params = {
        keyword: '',
        startAt: `${firstDay} 00:00:00`,
        endAt: `${lastDay} 23:59:59`,
      };
      const res = await axios.get(`${url}api/v1/schedule/search`, {
        headers: {Authorization: `Bearer ${token}`},
        params,
      });
      const resData = res.data.body.data;
      setItems(convertItemList(resData));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    fetchScheduleItems(year, month);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader />
      <CalendarProvider style={styles.calendarBackground} date={format(new Date(), 'yyyy-MM-dd')}>
        <ExpandableCalendar
          theme={them}
          initialPosition={Positions.OPEN}
          onDayPress={({dateString}) => selectedDateHandller(dateString)}
          onMonthChange={({year, month}) => {
            fetchScheduleItems(year, month);
          }}
          initialNumToRender={5}
          windowSize={3}
          maxToRenderPerBatch={3}
          updateCellsBatchingPeriod={20}
          removeClippedSubviews={false}
          onEndReachedThreshold={0.1}
        />
        {Object.keys(calendarItems).length !== 0 ? (
          <ScheduleList
            items={calendarItems}
            setItems={(newItems: ScheduleItems) => setCalendarItems(newItems)}
          />
        ) : (
          <View style={styles.noneDataContainer}>
            <Text>일정이 없습니다.</Text>
          </View>
        )}
      </CalendarProvider>
    </SafeAreaView>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    ...Platform.select({
      ios: {top: (deviceWidth - 30) / 5},
      android: {top: (deviceWidth - 240) / 5},
    }),
  },
  calendarBackground: {
    marginTop: 20,
    flex: 1,
  },
  noneDataContainer: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const them = {
  calendarBackground: variables.main,
  arrowColor: variables.text_7,
  monthTextColor: variables.text_7,
  textDayFontWeight: 'bold' as any,
  dayTextColor: variables.text_7,
  todayTextColor: variables.board_6,
  selectedDayBackgroundColor: variables.text_7,
  selectedDayTextColor: variables.main,
  textDisabledColor: variables.text_6,
};
