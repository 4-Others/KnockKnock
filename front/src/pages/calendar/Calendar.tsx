import React, {useState} from 'react';
import {Agenda} from 'react-native-calendars';
import {StyleSheet, View, Platform, Dimensions} from 'react-native';
import calendarData from '../../util/PracticeScheduleData.json';
import {variables} from '../../style/variables';
import ProfileHeader from '../../components/ProfileHeader';
import {AuthProps} from '../../navigations/StackNavigator';
import ScheduleList from '../../components/ScheduleList';
import {convertResponseData, dateFormat, CalendarData} from '../../util/dataConvert';

interface DayData {
  dateString: string;
  day: number;
  month: number;
  timestamp: number;
  year: number;
}

interface MarkedDate {
  selected: boolean;
  selectedColor: string;
  selectedTextColor: string;
  marked: boolean;
  dots: {key: string; color: string; selectedDotColor?: string}[];
}

const {width} = Dimensions.get('window');

const Calendar: React.FC<AuthProps> = ({navigation}) => {
  const today = dateFormat(String(new Date()));
  const [items, setItems] = useState<{[key: string]: CalendarData[]}>({}); // 랜더링 할 아이템 state로 저장 & 업데이트
  const [selected, setSelected] = useState(() => today); // 선택한 날짜 state로 저장 & 업데이트

  const markedDates = (selectedDate: string, today: string) => {
    return {
      [selectedDate]: {
        selected: true,
        selectedColor: 'white',
        selectedTextColor: variables.main,
        customContainerStyle: {
          borderWidth: 1,
          borderColor: '#fff',
        },
      },
      [today]: {
        selectedColor: 'white',
        selectedTextColor: variables.main,
        color: 'yellow',
        customContainerStyle: {
          borderWidth: 1,
          borderColor: '#fff',
        },
      },
    };
  };

  const multiDotProps = (): Record<string, MarkedDate> => {
    const markedDates: Record<string, MarkedDate> = {};

    calendarData.forEach((data, index) => {
      const date = data.startAt.split(' ')[0];
      const tag = data.tag;

      if (!markedDates[date]) {
        markedDates[date] = {
          selected: selected === date,
          selectedColor: 'white',
          selectedTextColor: variables.main,
          marked: true,
          dots: [],
        };
      }

      if (tag) {
        const dot = {
          key: String(index),
          color: tag.color,
          selectedDotColor: tag.color,
        };
        markedDates[date].dots.push(dot);
      }
    });

    return markedDates;
  };

  const loadItems = (day: DayData): void => {
    const {timestamp, year, month} = day;
    const newItems: {[key: string]: CalendarData[]} = {};

    const startDate = new Date(timestamp);
    const endDate = new Date(timestamp + 10 * 24 * 60 * 60 * 1000);

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      const time = dateFormat(String(date));

      if (!newItems[time]) {
        newItems[time] = [];
        const renderData = calendarData.filter((item: any) => dateFormat(item.startAt) === time);
        renderData.forEach((item: any) => {
          newItems[time].push(convertResponseData(item));
        });
      }
    }

    function formatDate(year: number, month: number) {
      const yyyy = year.toString();
      const mm = month < 10 ? `0${month}` : month.toString();
      return `${yyyy}-${mm}`;
    }

    if (selected.slice(0, 7) === formatDate(year, month)) setItems(newItems);
  };

  return (
    <View style={styles.container}>
      <ProfileHeader />
      <Agenda
        style={styles.calendar}
        onDayPress={day => setSelected(day.dateString)}
        items={items}
        renderList={items => ScheduleList(items, setItems)}
        markingType={'multi-dot'}
        loadItemsForMonth={(day: DayData) => loadItems(day)}
        selected={selected}
        showSixWeeks={true}
        theme={theme}
        markedDates={{...markedDates(selected, today), ...multiDotProps()}}
        pagingEnabled={true} // 페이지 단위로 스냅하도록 설정
        initialNumToRender={5}
        windowSize={3}
        maxToRenderPerBatch={3}
        updateCellsBatchingPeriod={20}
        removeClippedSubviews={false}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    ...Platform.select({
      ios: {top: (width - 67) / 8},
      android: {top: (width - 150) / 8},
    }),
  },
  calendar: {
    marginTop: 5,
    height: 360,
  },
  scheduleListContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 24,
    paddingRight: 24,
  },
  listDateTitle: {
    fontFamily: variables.font_3,
    color: variables.text_5,
    fontSize: 14,
    marginTop: 20,
    marginBottom: 20,
  },
});

const theme = {
  calendarBackground: variables.main, // 캘린더 배경
  monthTextColor: 'white',
  textDayFontWeight: 'bold' as any, // 날짜 서체
  dayTextColor: 'white', // 캘린더 날짜 색상
  textDayFontSize: 14, // 캘린더 날짜 글씨 크기
  textSectionTitleColor: 'white', // 요일 날짜 글씨 크기
  todayTextColor: 'yellow',
  agendaDayTextColor: variables.text_3, // 날짜 글씨 색상
  agendaDayNumColor: variables.text_4, // 요일 글씨 색상
  agendaTodayColor: variables.main, // 당일 글씨 색상
  agendaKnobColor: '#ffffff60', // Knob => 문고리 / 캘린더 접었다폈다 하는 아이콘 색상
  indicatorColor: 'red',
  selectedDayBackgroundColor: 'white',
  selectedDayTextColor: variables.main,
  'stylesheet.calendar.header': {
    week: {marginTop: 0, flexDirection: 'row', justifyContent: 'space-between'},
  },
};

export default Calendar;
