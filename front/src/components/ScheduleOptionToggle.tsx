import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {Switch} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {variables} from '../style/variables';

interface toggleProps {
  type: string;
  value: boolean;
  onToggle: (value: boolean) => void;
  iconName: string;
}

const ScheduleOptionToggle: React.FC<toggleProps> = ({type, value, onToggle, iconName}) => {
  return (
    <View style={styles.contentInput}>
      <Icon name={iconName} style={styles.icon} />
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>{type}</Text>
        <Switch
          value={value}
          onValueChange={onToggle}
          color={variables.main}
          style={styles.toggle}
        />
      </View>
    </View>
  );
};

export default ScheduleOptionToggle;

const styles = StyleSheet.create({
  contentInput: {
    marginTop: 20,
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: variables.line_1,
    ...Platform.select({
      ios: {paddingBottom: 16},
      android: {paddingBottom: 20},
    }),
  },
  inputTitle: {
    fontFamily: variables.font_3,
    color: variables.text_2,
    fontSize: 14,
  },
  icon: {
    fontSize: 24,
    marginRight: 30,
    color: variables.main,
  },
  toggle: {
    ...Platform.select({
      ios: {marginRight: 8, transform: [{scaleX: 0.7}, {scaleY: 0.7}]},
      android: {marginRight: 5},
    }),
  },
});
