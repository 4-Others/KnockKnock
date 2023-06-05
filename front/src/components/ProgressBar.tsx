import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';

interface Task {
  completed: boolean;
}

interface ProgressBarProps {
  tasks: {[key: string]: Task};
}

const ProgressBar: React.FC<ProgressBarProps> = ({tasks}) => {
  const tasksValue = Object.values(tasks);
  const length = tasksValue.length;
  const completed = tasksValue.filter(task => task.completed === true).length;

  return (
    <View style={styles.progressBar}>
      <Progress.Bar
        progress={completed / length}
        width={null}
        height={2}
        color={'#1b1b1b'}
        unfilledColor={'#eee'}
        borderColor={'#fff'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    width: '100%',
    backgroundColor: '#ffffff',
    height: 2,
  },
});

export default ProgressBar;
