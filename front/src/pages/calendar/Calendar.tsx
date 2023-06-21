import React, {useState} from 'react';
import {Agenda} from 'react-native-calendars';
import {StyleSheet, TouchableOpacity, View, Text, StatusBar, Dimensions} from 'react-native';
import events from './calendarData.json';
import {variables} from '../../style/variables';
import {Shadow} from 'react-native-shadow-2';
import {CheckBox} from '../../components/CheckBox';
import LogoMark from '../../../assets/image/LogoMark';

const timeToString = (time: number) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

interface Event {
  alerts: string;
  calendarId: number;
  content: string;
  createdAt: string;
  endAt: string;
  modifiedAt: string;
  period: string;
  startAt: string;
  tag: {
    color: string;
    title: string;
  };
}

interface MarkedDate {
  selected: boolean;
  selectedColor: string;
  selectedTextColor: string;
  marked: boolean;
  dots: {key: string; color: string; selectedDotColor?: string}[];
}

interface Item {
  name: string;
  height: number;
  day: string;
}

const Calendar: React.FC = () => {
  const dateFormat = (date?: string) =>
    date ? new Date(date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]; // YYYY-MM-DD 포멧

  const today = new Date().toISOString().split('T')[0]; // 오늘 날짜

  const [items, setItems] = useState<{[key: string]: Item[]}>({}); // 랜더링 할 아이템 state로 저장 & 업데이트

  const [selected, setSelected] = useState(''); // 선택한 날짜 state로 저장 & 업데이트

  const loadItems = (day: any) => {
    const newItems: {[key: string]: Item[]} = {...items};
    for (let i = -20; i < 19; i++) {
      const time = timeToString(day.timestamp + i * 24 * 60 * 60 * 1000); // YYYY-MM-DD
      if (!newItems[time]) {
        newItems[time] = [];
        const calendarData = events.filter(item => dateFormat(item.startAt) === time);
        calendarData.forEach(item => {
          console.log(item);
          newItems[time].push({
            name: item.title,
            height: 1,
            day: dateFormat(item.startAt),
          });
        });
      }
    }
    setItems(newItems); // 전달받은 데이터 중 렌더링할 아이템에 필요한 요소만 새로 생성
  };

  const multiDotProps = (): Record<string, MarkedDate> => {
    const markedDates: Record<string, MarkedDate> = {};

    events.forEach((data, index) => {
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

  const theme = {
    calendarBackground: variables.main, // 캘린더 배경
    monthTextColor: 'white',
    textDayFontWeight: 'bold' as any, // 날짜 서체
    dayTextColor: 'white', // 캘린더 날짜 색상
    textDayFontSize: 14, // 캘린더 날짜 글씨 크기
    textSectionTitleColor: 'white', // 요일 날짜 글씨 크기
    agendaDayTextColor: variables.text_3, // 날짜 글씨 색상
    agendaDayNumColor: variables.text_4, // 요일 글씨 색상
    agendaTodayColor: variables.main, // 당일 글씨 색상
    agendaKnobColor: '#ffffff60', // Knob => 문고리 / 캘린더 접었다폈다 하는 아이콘 색상
  };

  const HeaderComponent = () => {
    return (
      <View style={styles.headerContainer}>
        <LogoMark darkMode={false} />
        <TouchableOpacity>
          <Text style={{color: '#000'}}>icon</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const markedDates = {
    [selected]: {
      selected: true,
      selectedColor: 'white',
      selectedTextColor: variables.main,
      customContainerStyle: {
        borderWidth: 1,
        borderColor: '#fff',
      },
    },
    [today]: {
      selected: false,
      selectedColor: 'transparent',
      selectedTextColor: 'yellow',
      customContainerStyle: {
        borderWidth: 1,
        borderColor: '#fff',
      },
    },
  };

  const markedDatesWithDots = multiDotProps();

  const renderItem = (item: Item) => {
    return (
      <TouchableOpacity style={styles.item}>
        <Shadow
          style={styles.todo}
          distance={8}
          startColor={'#00000010'}
          endColor={'#ffffff05'}
          offset={[0, 1]}>
          <View style={styles.content}>
            <View style={styles.colorChip}></View>
            <View style={styles.textBox}>
              <Text style={[styles.title]}>{item.name}</Text>
              <Text style={styles.time}>{item.day}</Text>
            </View>
          </View>
          <CheckBox func={() => {}} />
        </Shadow>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <Agenda
        onDayPress={day => setSelected(day.dateString)}
        items={items}
        markingType={'multi-dot'}
        loadItemsForMonth={day => loadItems(day)}
        selected={today}
        showClosingKnob={true} // 날짜 미리보기
        renderItem={item => renderItem(item)}
        // horizontal={true} // 가로 스와이프 설정
        // hideKnob={true}
        calendarWidth={24}
        theme={theme}
        markedDates={{...markedDates, ...markedDatesWithDots}}
        // customHeader={(day: any) => HeaderComponent(day)}
        staticHeader={true}
        showScrollIndicator={true}
        animateScroll={true}
      />
      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  item: {
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
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
    backgroundColor: variables.Mater_1,
    marginRight: 10,
  },
  textBox: {},
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
  headerContainer: {
    marginTop: 43,
    marginLeft: 16,
    marginRight: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ffffff80',
    paddingBottom: 10,
  },
  headerTitle: {
    fontFamily: variables.font_3,
    fontSize: 26,
    color: '#000',
  },
  weekTexts: {
    fontFamily: variables.font_4,
    fontSize: 14,
    color: '#fff',
  },
});

export default Calendar;
