import React, {useState, useRef} from 'react';
import {Agenda} from 'react-native-calendars';
import {StyleSheet, TouchableOpacity, View, Text, StatusBar, Image, ScrollView} from 'react-native';
import events from './calendarData.json';
import {variables} from '../../style/variables';
import {Shadow} from 'react-native-shadow-2';
import LogoMark from '../../../assets/image/LogoMark';
import {dateFormat} from './CalendarUtil';

export interface MarkedDate {
  selected: boolean;
  selectedColor: string;
  selectedTextColor: string;
  marked: boolean;
  dots: {key: string; color: string; selectedDotColor?: string}[];
}

export interface Item {
  name: string;
  height: number;
  day: string;
  id?: number;
  complete?: boolean;
  color?: string;
  startAt?: string;
  endAt?: string;
}

const Calendar: React.FC = () => {
  const [items, setItems] = useState<{[key: string]: Item[]}>({}); // 랜더링 할 아이템 state로 저장 & 업데이트
  const [selected, setSelected] = useState(() => new Date()); // 선택한 날짜 state로 저장 & 업데이트
  const scrollViewRef = useRef<ScrollView>(null); // ScrollView에 대한 ref 생성

  const today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0]; // 오늘 날짜

  // 원하는 범위 만큼 아이템 리스트 랜더링
  const loadItems = (day: any) => {
    const newItems: {[key: string]: Item[]} = {...items};
    for (let i = 0; i < 19; i++) {
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
            startAt: item.startAt.split(' ')[1].slice(0, 5),
            endAt: item.endAt.split(' ')[1].slice(0, 5),
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

  // const scrollToSelectedDate = () => {
  //   if (scrollViewRef.current) {
  //     const selectedDateIndex = Object.keys(items).findIndex(
  //       date => date === dateFormat(timeToString(+selected)),
  //     );
  //     const yOffset = selectedDateIndex * 50; // 예시로 각 날짜의 높이를 80으로 가정
  //     scrollViewRef.current.scrollTo({y: yOffset, animated: true});
  //   }
  // };

  const RenderItem = (item: any) => {
    const renderItemsData = item.items; // props로 받은 전체 일정들과 리스트 속성 중 일정들만 할당
    const itemsKeyArray = Object.keys(renderItemsData).sort(); // 출력할 날짜들만 배열로 저장 후 오름차 순 정렬

    return (
      <ScrollView ref={scrollViewRef} style={styles.scheduleListContainer}>
        {itemsKeyArray.map((date, i) => {
          const renderDateItem = renderItemsData[date];
          return (
            <View key={i}>
              <Text style={styles.listDateTitle}>{date.replace(/-/g, '.')}</Text>
              {renderDateItem.length > 0
                ? renderDateItem.map((item: Item, i: number) => (
                    <TouchableOpacity style={styles.item} key={i}>
                      <Shadow
                        style={styles.todo}
                        distance={8}
                        startColor={'#00000010'}
                        endColor={'#ffffff05'}
                        offset={[0, 1]}>
                        <View style={styles.content}>
                          <View style={[styles.colorChip, {backgroundColor: item.color}]}></View>
                          <View style={styles.textBox}>
                            <Text
                              style={[styles.title, item.complete ? styles.check : styles.unCheck]}>
                              {item.name}
                            </Text>
                            <Text style={styles.time}>{`${item.startAt} ~ ${item.endAt}`}</Text>
                          </View>
                        </View>
                        <TouchableOpacity
                          style={item.complete ? styles.checkState : styles.unCheckState}
                          onPress={() => toggleComplete(item.day, item.id)}>
                          <Image
                            style={styles.checkIcon}
                            source={require('front/assets/image/check.png')}
                          />
                        </TouchableOpacity>
                      </Shadow>
                    </TouchableOpacity>
                  ))
                : null}
            </View>
          );
        })}
      </ScrollView>
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
        onDayPress={day => {
          setSelected(new Date(day.dateString));
          // scrollToSelectedDate(); // 날짜 선택 시 스크롤 이동
        }}
        items={items}
        renderList={items => RenderItem(items)}
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

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  scheduleListContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 20,
  },
  listDateTitle: {
    fontFamily: variables.font_3,
    color: variables.text_5,
    fontSize: 14,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Calendar;
