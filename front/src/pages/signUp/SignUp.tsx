import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import Agree from './screen/Agree';
import Email from './screen/Email';
import Password from './screen/Password';
import Success from './screen/Success';

interface SignUpProps {
  locate: string;
  deps: {[key: string]: any}[];
  onLogin: (loginState: boolean) => void;
}

const SignUp: React.FC<SignUpProps> = ({locate, deps, onLogin}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar deps={deps} />
      <View style={styles.contents}>
        {locate === 'Agree' && <Agree />}
        {locate === 'Email' && <Email />}
        {locate === 'Password' && <Password />}
        {locate === 'Success' && <Success onLogin={onLogin} />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  contents: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
});

export default SignUp;
