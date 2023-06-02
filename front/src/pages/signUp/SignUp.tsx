import {StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import React from 'react';
import {variables} from '../../style/variables';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Details: {id: string};
  SignUp: {id: number; name: string};
};

type SignUpScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SignUp'>;
};

const SignUp: React.FC<SignUpScreenProps> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>SignUp</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Pretendard-Medium',
    color: variables.main,
    fontSize: 30,
  },
});

export default SignUp;
