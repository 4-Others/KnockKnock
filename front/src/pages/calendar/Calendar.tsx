import React, {useEffect, useState, useMemo} from 'react';
import {SafeAreaView, Platform, Dimensions, StyleSheet, View, Text} from 'react-native';
import {ExpandableCalendar, CalendarProvider} from 'react-native-calendars';
import {Positions} from 'react-native-calendars/src/expandableCalendar';
import format from 'date-fns/format';
import {AuthProps} from '../../navigations/StackNavigator';
import {useSelector, useDispatch} from 'react-redux';
import {ScheduleItems, setScheduleReducer} from '../../util/redux/scheduleSlice';
import ProfileHeader from '../../components/ProfileHeader';
import ScheduleList from '../../components/ScheduleList';
import {scheduleAPI} from '../../api/commonApi';
import {variables} from '../../style/variables';

const deviceWidth = Dimensions.get('window').width;

const Calendar: React.FC<AuthProps> = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: any) => state.schedule.items);
  const token = useSelector((state: any) => state.user.token);
  const [calendarItems, setCalendarItems] = useState<ScheduleItems>({});
  const [selectDate, setSelectDate] = useState<string[]>([format(new Date(), 'yyyy-MM-dd')]);
  const selectedDateHandller = (dateString: string) => {
    const dates = selectDate.length;
    if (dates <= 1) {
      let currentDate = selectDate[0];
      const dateArr = [];
      let startDate = new Date(currentDate);
      let endDate = new Date(dateString);

      if (startDate.getMonth() !== endDate.getMonth()) {
        setSelectDate([dateString]);
      } else {
        if (startDate > endDate) {
          [startDate, endDate] = [endDate, startDate]; // startDate와 endDate를 교환
        }

        while (startDate <= endDate) {
          dateArr.push(format(startDate, 'yyyy-MM-dd'));
          startDate.setDate(startDate.getDate() + 1);
        }

        const newSelectDate = Array.from(new Set([...selectDate, ...dateArr])).sort();
        setSelectDate(newSelectDate);
      }
    } else {
      setSelectDate([dateString]);
    }
  };

  const setNewCalendarItems = (items: ScheduleItems, selectDate: string[]) => {
    let newCalendarItems = {};
    selectDate.forEach(date => {
      let calendarItem = items[date];
      if (calendarItem) {
        newCalendarItems = {...newCalendarItems, ...{[date]: calendarItem}};
      }
    });
    setCalendarItems(newCalendarItems);
  };

  interface MarkedDate {
    selected: boolean;
    selectedColor: string;
    selectedTextColor: string;
    marked: boolean;
    dots: {key: string; color: string; selectedDotColor?: string}[];
  }

  const getMarkedDates = useMemo(() => {
    const markedDates: Record<string, MarkedDate> = {};
    selectDate.forEach(dateKey => {
      const date = dateKey;
      if (!markedDates[date]) {
        markedDates[date] = {
          selected: true,
          selectedColor: 'white',
          selectedTextColor: variables.main,
          marked: true,
          dots: [],
        };
      }
    });
    Object.keys(items).forEach(dateKey => {
      const date = dateKey;
      if (!markedDates[date]) {
        markedDates[date] = {
          selected: selectDate.includes(date),
          selectedColor: 'white',
          selectedTextColor: variables.main,
          marked: true,
          dots: [],
        };
      }
      const item = items[date];
      const existingColors = new Set();
      item.forEach((data: any, index: number) => {
        const tag = data.tag;
        if (tag && !existingColors.has(tag.color)) {
          const dot = {
            key: String(index),
            color: tag.color,
            selectedDotColor: tag.color,
          };
          markedDates[date].dots.push(dot);
          existingColors.add(tag.color);
        }
      });
    });
    return markedDates;
  }, [calendarItems]);

  const fetchData = async () => {
    try {
      let newItems = await scheduleAPI.scheduleGet(token);
      dispatch(setScheduleReducer(newItems));
      setNewCalendarItems(newItems, selectDate);
    } catch (error) {
      console.error('Failed to load calendar in ScheduleItems:', error);
      return null;
    }
    return null;
  };

  useEffect(() => {
    fetchData();
  }, [selectDate]);

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader />
      <CalendarProvider style={styles.calendarBackground} date={selectDate[0]}>
        <ExpandableCalendar
          theme={them}
          initialPosition={Positions.OPEN}
          onDayPress={({dateString}) => selectedDateHandller(dateString)}
          markingType={'multi-dot'}
          markedDates={getMarkedDates}
        />
        {Object.keys(calendarItems).length !== 0 ? (
          <ScheduleList
            items={calendarItems}
            setItems={(newItems: ScheduleItems) => dispatch(setScheduleReducer(newItems))}
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
  textDisabledColor: variables.text_6,
  selectedDayBackgroundColor: 'white',
  selectedDayTextColor: variables.main,
};
