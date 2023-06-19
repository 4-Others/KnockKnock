import {StyleSheet, View, StatusBar, Platform} from 'react-native';
import React, {useState} from 'react';
import {variables} from '../../style/variables';
import CalendarComponent from './Screen/CalendarComponent';
import Data from './calendarData.json';

const Calendar = () => {
  const [events, setEvents] = useState(Data);
  const [selected, setSelected] = useState<string>('');

  if (Platform.OS === 'android') {
    StatusBar.setBackgroundColor(variables.main);
  }

  return (
    <View style={styles.container}>
      <CalendarComponent
        selected={selected}
        setSelected={setSelected}
        events={events}
        setEvents={setEvents}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
});

export default Calendar;
