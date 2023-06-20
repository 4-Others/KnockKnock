import {StyleSheet, View, Dimensions, Platform, Text} from 'react-native';
import React from 'react';
import {variables} from '../../../style/variables';
import LinearGradient from 'react-native-linear-gradient';
import {Calendar} from 'react-native-calendars';
import TodoLists from '../Screen/TodoLists';

interface Example {
  key: string;
  color: string;
  selectedDotColor: string;
}

interface CalendarProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  events: any;
  setEvents: any;
}

const CalendarComponent: React.FC<CalendarProps> = ({selected, setSelected, events, setEvents}) => {
  const today = new Date().toISOString().split('T')[0];

  const example1: Example = {
    key: 'vacation',
    color: variables.Mater_1,
    selectedDotColor: variables.Mater_1,
  };
  const example2: Example = {
    key: 'massage',
    color: variables.Mater_2,
    selectedDotColor: variables.Mater_2,
  };
  const example3: Example = {
    key: 'workout',
    color: variables.Mater_3,
    selectedDotColor: variables.Mater_3,
  };
  const example4: Example = {
    key: 'asdfasd',
    color: variables.Mater_4,
    selectedDotColor: variables.Mater_4,
  };

  const markedDates = {
    [selected]: {
      selected: true,
      disableTouchEvent: false,
      selectedColor: 'white',
      selectedTextColor: variables.main,
    },
    [today]: {
      selected: true,
      selectedColor: 'transparent',
      selectedTextColor: 'yellow',
      customContainerStyle: {
        borderWidth: 1,
        borderColor: '#fff',
      },
    },
    '2023-06-10': {
      marked: true,
      dots: [example1, example2],
    },
    '2023-06-11': {
      marked: true,
      dots: [example3, example4],
    },
  };

  const theme = {
    calendarBackground: 'transparent',
    textDayFontWeight: 'bold' as any,
    monthTextColor: 'white',
    textMonthFontSize: 26,
    textMonthFontFamily: variables.font_1,
    dayTextColor: 'white',
    textDayFontSize: 12,
    textSectionTitleColor: 'white',
    todayTextColor: 'white',
    dotColor: 'white',
  };

  // 선택한 날짜에 해당하는 데이터 렌더링

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.linearGradient}
        start={{x: 1, y: 0}}
        end={{x: 1.5, y: 2}}
        colors={['#FF5789', '#FEA97A']}
      />
      <Calendar
        style={styles.calendar}
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={markedDates}
        theme={theme}
        hideArrows={true}
        markingType="multi-dot"
        showSixWeeks={true}
      />
      {selected && <TodoLists events={events} selected={selected} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {paddingTop: 20},
      android: {paddingTop: 0},
    }),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  calendar: {
    width: Dimensions.get('window').width,
    backgroundColor: 'transparent',
  },
  linearGradient: {
    position: 'absolute',
    top: 0,
    width: '100%',
    ...Platform.select({
      ios: {height: '66%'},
      android: {height: '54%'},
    }),
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
});

export default CalendarComponent;
