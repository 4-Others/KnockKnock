import React, {useState, useRef} from 'react';
import {Agenda} from 'react-native-calendars';
import {StyleSheet, TouchableOpacity, View, Text, StatusBar, ScrollView} from 'react-native';
import events from './calendarData.json';
import {variables} from '../../style/variables';
import LogoMark from '../../../assets/image/LogoMark';
import {loadItems, dateFormat, timeToString} from './CalendarUtil';
import {theme, markedDates} from './style.calendar';
import {MarkedDate, ItemsData, ItemProps} from './style';
import ScheduleItem from '../../components/ScheduleItem';

const Calendar: React.FC = () => {
  const [items, setItems] = useState<ItemsData>({}); // 랜더링 할 아이템 state로 저장 & 업데이트
  const [selected, setSelected] = useState(() => new Date()); // 선택한 날짜 state로 저장 & 업데이트

  const today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .split('T')[0];

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

  const RenderItem = (items: any) => {
    const renderItemsData = items.items;
    const itemsKeyArray = Object.keys(renderItemsData)
      .filter(date => renderItemsData[date].length > 0) // 빈 배열을 제거하는 필터링 추가
      .sort();

    const handleToggleComplete = (day: string, itemId: number) => {
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

    return (
      <ScrollView style={styles.scheduleListContainer}>
        {itemsKeyArray.map((date, i) => {
          const renderDateItem = renderItemsData[date];
          console.log(renderDateItem);
          return (
            <View key={i}>
              <Text style={styles.listDateTitle}>{date.replace(/-/g, '.')}</Text>
              {renderDateItem.map((item: any, j: number) => (
                <ScheduleItem
                  item={item}
                  key={j}
                  onPress={() => handleToggleComplete(date, item.id)}
                />
              ))}
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
        }}
        items={items}
        renderList={items => RenderItem(items)}
        markingType={'multi-dot'}
        loadItemsForMonth={day => loadItems(day, setItems, items, events)}
        selected={today}
        showClosingKnob={false}
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
