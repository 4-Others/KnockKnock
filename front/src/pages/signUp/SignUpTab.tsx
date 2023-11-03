import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  SignVerifyEmalInfo,
  SignPersonalInfo,
  SignPasswordInfo,
  SignIDandEmailInfo,
  SignAgree,
  SignSuccess,
} from './SignScreen';
import Header from '../../components/Header';
import {SafeAreaView} from 'react-native';
import {View, StyleSheet} from 'react-native';
import React from 'react';
import {AuthProps} from '../../navigations/StackNavigator';

const Tab = createMaterialTopTabNavigator();

const SignUpTab: React.FC<AuthProps> = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.progressBar}></View>
      <Tab.Navigator
        tabBar={props => <Header {...props} title="회원가입" type="signUp" />}
        screenOptions={{
          swipeEnabled: false,
        }}>
        <Tab.Screen name="SignAgree">{props => <SignAgree {...props} />}</Tab.Screen>
        <Tab.Screen name="SignPersonalInfo">{props => <SignPersonalInfo {...props} />}</Tab.Screen>
        <Tab.Screen name="SignPasswordInfo">{props => <SignPasswordInfo {...props} />}</Tab.Screen>
        <Tab.Screen name="SignIDandEmailInfo">
          {props => <SignIDandEmailInfo {...props} />}
        </Tab.Screen>
        <Tab.Screen name="SignVerifyEmalInfo">
          {props => <SignVerifyEmalInfo {...props} />}
        </Tab.Screen>
        <Tab.Screen name="SignSuccess">{props => <SignSuccess {...props} />}</Tab.Screen>
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
