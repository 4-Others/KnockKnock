import {CalendarTheme as OriginalCalendarTheme} from 'react-native-calendars';

declare module 'react-native-calendars' {
  interface Theme extends OriginalCalendarTheme {}
}
