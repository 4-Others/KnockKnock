import React, {useState, useRef, useEffect} from 'react';
import {Agenda} from 'react-native-calendars';
import {StyleSheet, TouchableOpacity, View, Text, StatusBar, Image} from 'react-native';
import events from './calendarData.json';
import {variables} from '../../style/variables';
import {Shadow} from 'react-native-shadow-2';
import LogoMark from '../../../assets/image/LogoMark';

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
  id?: number;
  complete?: boolean;
  color?: string;
}

const Calendar: React.FC = () => {
  const [items, setItems] = useState<{[key: string]: Item[]}>({}); // 랜더링 할 아이템 state로 저장 & 업데이트
  const [selected, setSelected] = useState(() => new Date()); // 선택한 날짜 state로 저장 & 업데이트

  const timeToString = (time: number) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }; // YYYY-MM-DD

  const dateFormat = (date?: string) => {
    const currentDate = date
      ? new Date(date).getTime() - new Date().getTimezoneOffset() * 60000
      : new Date().getTime() - new Date().getTimezoneOffset() * 60000;
    return timeToString(currentDate);
  };

  const today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0]; // 오늘 날짜

  // 원하는 범위 만큼 아이템 리스트 랜더링
  const loadItems = (day: any) => {
    const newItems: {[key: string]: Item[]} = {...items};
    for (let i = -20; i < 19; i++) {
      // 선택된 날짜 기반 -20일부터 19일까지 출력
      const time = dateFormat(day.timestamp + i * 24 * 60 * 60 * 1000);
      if (!newItems[time]) {
        newItems[time] = [];
        const calendarData = events.filter(item => dateFormat(item.startAt) === time);
        calendarData.forEach(item => {
          newItems[time].push({
            id: item.calendarId,
            name: item.title,
            height: 0,
            day: dateFormat(item.startAt),
            complete: false,
            color: item.tag.color,
          });
        });
      }
    }
    setItems(newItems); // 전달받은 데이터 중 렌더링할 아이템에 필요한 요소만 새로 생성
  };
  // 이벤트가 있는 date 속성
  const markedDates = {
    [dateFormat(String(selected))]: {
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
  // 전달받은 데이터에서 dot에 필요한 값만 추출
  const multiDotProps = (): Record<string, MarkedDate> => {
    const markedDates: Record<string, MarkedDate> = {};

    events.forEach((data, index) => {
      const date = data.startAt.split(' ')[0];
      const tag = data.tag;

      if (!markedDates[date]) {
        markedDates[date] = {
          selected: selected === new Date(date),
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
  // 캘린더 전체 스타일 속성
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
  };

  const toggleComplete = (day: string, itemId?: number) => {
    setItems(prevItems => {
      const updatedItems = prevItems[day].map(item => {
        if (item.id === itemId) {
          return {...item, complete: !item.complete};
        }
        return item;
      });
      return {...prevItems, [day]: updatedItems};
    });
  };

  const RenderItem = (item: Item) => {
    return (
      <TouchableOpacity style={styles.item}>
        <Shadow
          style={styles.todo}
          distance={8}
          startColor={'#00000010'}
          endColor={'#ffffff05'}
          offset={[0, 1]}>
          <View style={styles.content}>
            <View style={[styles.colorChip, {backgroundColor: item.color}]}></View>
            <View style={styles.textBox}>
              <Text style={[styles.title, item.complete ? styles.check : styles.unCheck]}>
                {item.name}
              </Text>
              <Text style={styles.time}>{item.day}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={item.complete ? styles.checkState : styles.unCheckState}
            onPress={() => toggleComplete(item.day, item.id)}>
            <Image style={styles.checkIcon} source={require('front/assets/image/check.png')} />
          </TouchableOpacity>
        </Shadow>
      </TouchableOpacity>
    );
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

  return (
    <View style={styles.container}>
      <HeaderComponent />
      <Agenda
        style={{height: 360, borderBottomLeftRadius: 12, borderBottomRightRadius: 12}}
        onDayPress={day => setSelected(new Date(day.dateString))}
        items={items}
        renderItem={item => RenderItem(item)}
        markingType={'multi-dot'}
        loadItemsForMonth={day => loadItems(day)}
        selected={today}
        showClosingKnob={false}
        showSixWeeks={true}
        theme={theme}
        markedDates={{...markedDates, ...multiDotProps()}}
        pagingEnabled={true} // 페이지 단위로 스냅하도록 설정
        initialNumToRender={5}
        windowSize={3}
        maxToRenderPerBatch={3}
        updateCellsBatchingPeriod={20}
        removeClippedSubviews={false}
        onEndReachedThreshold={0.1}
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
});

export default Calendar;
