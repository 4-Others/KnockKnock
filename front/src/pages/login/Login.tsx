import {StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import React from 'react';
import {variables} from '../../style/variables';
import {CheckBox} from '../../components/CheckBox';

const Login: React.FC = () => {
  const navigation = useNavigation();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleSignUp = () => {
    navigation.dispatch(StackActions.push('SignUp', {locate: undefined}));
  };

  const linkToMain = () => {
    navigation.dispatch(StackActions.push('TabNavigator', {locate: undefined}));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Login 겸 Home</Text>
      <Button title="Go to Details" onPress={() => (navigation.navigate as any)('SignUp')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  checkState: {
    width: 18,
    height: 18,
    backgroundColor: '#FF5789',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  unCheckState: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: variables.line_1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  checkIcon: {
    width: 10,
    height: 6,
  },
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
