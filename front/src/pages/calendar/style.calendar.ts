import React from 'react';
import {variables} from '../../style/variables';
import {dateFormat} from './CalendarUtil';

export const theme = {
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

export const markedDates = (selected: Date, today: string) => {
  return {
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
};
