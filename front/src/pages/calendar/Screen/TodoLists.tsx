import React from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import {formattedTime} from './Util/FormattedTime';
import {CheckBox} from '../../../components/CheckBox';
import {variables} from '../../../style/variables';
import {Shadow} from 'react-native-shadow-2';

interface EventData {
  calendarId: number;
  title: string;
  content: string;
  period: string;
  startAt: string;
  endAt: string;
  alerts: any[];
  createdAt: string;
  modifiedAt: string;
  tag: {
    title: string;
    color: string;
  };
}

interface TodoListsProps {
  events: EventData[];
  selected: string;
}

const TodoLists: React.FC<TodoListsProps> = ({events, selected}) => {
  const selectedEvents = events.filter(event => event.startAt.includes(selected));
  const [check, setCheck] = React.useState<{[key: number]: boolean}>({});

  const handleCheck = (id: number) => {
    setCheck(prev => {
      const event = {...prev};
      event[id] = !prev[id];
      return event;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.todos}>
        {selectedEvents.map(event => (
          <Shadow
            style={styles.todo}
            distance={8}
            startColor={'#00000010'}
            endColor={'#ffffff05'}
            offset={[0, 1]}
            key={event.calendarId}>
            <View style={styles.content}>
              <View style={styles.colorChip}></View>
              <View style={styles.textBox}>
                <Text
                  style={[styles.title, check[event.calendarId] ? styles.check : styles.unCheck]}>
                  {event.title}
                </Text>
                <Text style={styles.time}>
                  {formattedTime(new Date(event.startAt))} ~ {formattedTime(new Date(event.endAt))}
                </Text>
              </View>
            </View>
            <CheckBox func={() => handleCheck(event.calendarId)} />
          </Shadow>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    position: 'relative',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
    paddingLeft: 24,
    paddingRight: 24,
  },
  todos: {
    flexDirection: 'column',
    width: '100%',
  },
  todo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#ffffff',
    marginBottom: 10,
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
});

export default TodoLists;
