import React, {useState} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import ProgressBar from '../../components/ProgressBar';
import Agree from './screen/Agree';
import Email from './screen/Email';
import Password from './screen/Password';
import Success from './screen/Success';
import Config from 'react-native-config';
import {SignData} from './screen/Password';

interface SignUpProps {
  locate: string;
  deps: {[key: string]: any}[];
  onLogin: (loginState: boolean) => void;
}

const SignUp: React.FC<SignUpProps> = ({locate, deps, onLogin}) => {
  const [signData, setSignData] = useState<SignData>({email: '', password: ''});
  const url = Config.API_APP_KEY;
  return (
    <SafeAreaView style={signUpStyles.container}>
      <ProgressBar deps={deps} />
      <View style={signUpStyles.contents}>
        {locate === 'Agree' && <Agree />}
        {locate === 'Password' && <Password />}
        {locate === 'Email' && <Email url={url} />}
        {locate === 'Success' && <Success onLogin={onLogin} />}
      </View>
    </SafeAreaView>
  );
};

export const signUpStyles = StyleSheet.create({
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
