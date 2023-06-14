import React from 'react';
import {View, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';

interface ProgressBarProps {
  deps: {[key: string]: boolean}[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({deps}) => {
  const total = deps.length;
  const completed = deps.filter(dep => Object.values(dep)[0] === true).length;
  return (
    <View style={styles.progressBar}>
      <Progress.Bar
        progress={completed / total}
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
