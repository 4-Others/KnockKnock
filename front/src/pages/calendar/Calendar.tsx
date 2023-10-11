import React, {useState} from 'react';
import {ExpandableCalendar, CalendarProvider} from 'react-native-calendars';
import {AuthProps} from '../../navigations/StackNavigator';
import {useSelector} from 'react-redux';
import ProfileHeader from '../../components/ProfileHeader';
import {SafeAreaView, View, Platform, Dimensions, StyleSheet} from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const Calendar: React.FC<AuthProps> = ({url, navigation, route}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader />
      <CalendarProvider date="2023-10-01" style={styles.calendarContainer}>
        <ExpandableCalendar style={{flex: 1}} />
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
  calendarContainer: {
    marginTop: 20,
  },
});
