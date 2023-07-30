import React, {useState, useEffect} from 'react';
import {Image, TouchableOpacity, StyleSheet, TouchableOpacityProps} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../pages/login/Login';
import ScheduleBoard from '../pages/ScheduleBoard/ScheduleBoard';
import Calendar from '../pages/calendar/Calendar';
import BoardAdd from '../pages/ScheduleBoard/BoardAdd';
import BoardEdit from '../pages/ScheduleBoard/BoardEdit';
import BoardDetail from '../pages/ScheduleBoard/BoardDetail';
import ScheduleAdd from '../pages/Schedule/ScheduleAdd';
import ScheduleEdit from '../pages/Schedule/ScheduleEdit';
import Profile from '../pages/profile/Profile';
import ProfileEdit from '../pages/profile/ProfileEdit';
import SignUpTab from '../pages/signUp/SignUpTab';

export interface onLoginProps {
  onLogin: (loginState: boolean) => void;
}

const Stack = createStackNavigator();

const StackSign: React.FC<onLoginProps> = ({onLogin}) => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" options={{headerShown: false}}>
        {props => <Login {...props} onLogin={onLogin} />}
      </Stack.Screen>
      <Stack.Screen name="SignUpTab" options={{headerShown: false}}>
        {props => <SignUpTab {...props} onLogin={onLogin} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const StackSchedule = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ScheduleBoard" component={ScheduleBoard} options={{headerShown: false}} />
      <Stack.Screen name="BoardDetail" component={BoardDetail} options={{headerShown: false}} />
      <Stack.Screen name="BoardAdd" component={BoardAdd} options={{headerShown: false}} />
      <Stack.Screen name="BoardEdit" component={BoardEdit} options={{headerShown: false}} />
      <Stack.Screen name="ScheduleAdd" component={ScheduleAdd} options={{headerShown: false}} />
      <Stack.Screen name="ScheduleEdit" component={ScheduleEdit} options={{headerShown: false}} />
      <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

const StackCalendar = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Calendar" component={Calendar} options={{headerShown: false}} />
      <Stack.Screen name="ScheduleAdd" component={ScheduleAdd} options={{headerShown: false}} />
      <Stack.Screen name="ScheduleEdit" component={ScheduleEdit} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export {StackSign, StackSchedule, StackCalendar};

const styles = StyleSheet.create({
  headerStyle: {
    height: 80,
  },
});
