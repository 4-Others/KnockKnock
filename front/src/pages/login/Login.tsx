import {StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import React from 'react';
import {variables} from '../../style/variables';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Details: {id: string};
  Login: {id: number; name: string};
};

type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

const Login: React.FC<LoginScreenProps> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Login 겸 Home</Text>
      <Button title="Go to Details" onPress={() => (navigation.navigate as any)('SignUp')} />
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

export default Login;
