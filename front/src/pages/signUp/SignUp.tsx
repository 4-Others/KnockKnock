import React from 'react';
import {StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import {variables} from '../../style/variables';
import {StackNavigationProp} from '@react-navigation/stack';
import ProgressBar from '../../components/ProgressBar';

type RootStackParamList = {
  Home: undefined;
  Details: {id: string};
  SignUp: {id: number; name: string};
};

type SignUpScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SignUp'>;
};

interface Task {
  completed: boolean;
}

const SignUp: React.FC<SignUpScreenProps & {tasks: Record<string, Task>}> = ({
  navigation,
  tasks,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar tasks={tasks} />
      <Text style={styles.text}>SignUp</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontFamily: 'Pretendard-Medium',
    color: variables.main,
    fontSize: 30,
  },
});

export default SignUp;
