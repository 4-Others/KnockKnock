import React, {useState, useEffect} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {onLoginProps} from '../../navigations/StackNavigator';
import SignAgree from './SignAgree';
import SignEmail from './SignEmail';
import SignPassword from './SignPassword';
import SignSuccess from './SignSuccess';
import Header from '../../components/Header';
import {SafeAreaView} from 'react-native';
import {View, StyleSheet} from 'react-native';
import * as Progress from 'react-native-progress';
import Config from 'react-native-config';

const Tab = createMaterialTopTabNavigator();

const SignUpTab: React.FC<onLoginProps> = ({onLogin}) => {
  const [deps, setDeps] = useState(0.25);

  const url = Config.API_APP_KEY;

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="회원가입" type="signUp" />
      <View style={styles.progressBar}>
        <Progress.Bar
          progress={deps}
          width={null}
          height={2}
          color={'#1b1b1b'}
          unfilledColor={'#eee'}
          borderColor={'#fff'}
        />
      </View>
      <Tab.Navigator tabBar={props => <></>}>
        <Tab.Screen name="SignAgree">
          {props => <SignAgree {...props} setDeps={setDeps} />}
        </Tab.Screen>
        <Tab.Screen name="SignPassword" initialParams={{password: ''}}>
          {props => <SignPassword {...props} setDeps={setDeps} url={url} />}
        </Tab.Screen>
        <Tab.Screen name="SignEmail">
          {props => <SignEmail {...props} setDeps={setDeps} url={url} />}
        </Tab.Screen>
        <Tab.Screen name="SignSuccess">
          {props => <SignSuccess {...props} onLogin={onLogin} />}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default SignUpTab;

const styles = StyleSheet.create({
  progressBar: {
    width: '100%',
    backgroundColor: '#ffffff',
    height: 2,
  },
});
