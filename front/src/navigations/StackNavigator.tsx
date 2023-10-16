import React from 'react';
import Config from 'react-native-config';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../pages/login/Login';
import AuthSplashScreen from '../pages/login/AuthSplashScreen';
import ScheduleBoard from '../pages/ScheduleBoard/ScheduleBoard';
import Calendar from '../pages/calendar/Calendar';
import BoardEdit from '../pages/ScheduleBoard/BoardEdit';
import BoardDetail from '../pages/ScheduleBoard/BoardDetail';
import ScheduleAdd from '../pages/Schedule/ScheduleAdd';
import ScheduleEdit from '../pages/Schedule/ScheduleEdit';
import Profile from '../pages/profile/Profile';
import ProfileEdit from '../pages/profile/ProfileEdit';
import SignUpTab from '../pages/signUp/SignUpTab';
import TabNavigator from './TabNavigator';
import Search from '../pages/search/Search';
import SearchResult from '../pages/search/SearchResult';

export interface AuthProps {
  route: any;
  navigation: any;
  url?: string;
}

const Stack = createStackNavigator();
const url = Config.API_APP_KEY;

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="AuthSplach">
      <Stack.Screen name="AuthSplach" options={{headerShown: false}}>
        {props => <AuthSplashScreen {...props} url={url} />}
      </Stack.Screen>
      <Stack.Screen name="Login" options={{headerShown: false}}>
        {props => <Login {...props} url={url} />}
      </Stack.Screen>
      <Stack.Screen name="SignUpTab" options={{headerShown: false}}>
        {props => <SignUpTab {...props} url={url} />}
      </Stack.Screen>
      <Stack.Screen name="MainTab" component={TabNavigator} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

const StackSchedule = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ScheduleBoard" options={{headerShown: false}}>
        {props => <ScheduleBoard {...props} url={url} />}
      </Stack.Screen>
      <Stack.Screen name="BoardDetail" options={{headerShown: false}}>
        {props => <BoardDetail {...props} url={url} />}
      </Stack.Screen>
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
    <Stack.Navigator initialRouteName="Calendar">
      <Stack.Screen name="Calendar" options={{headerShown: false}}>
        {props => <Calendar {...props} url={url} />}
      </Stack.Screen>
      <Stack.Screen name="ScheduleAdd" component={ScheduleAdd} options={{headerShown: false}} />
      <Stack.Screen name="ScheduleEdit" component={ScheduleEdit} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

const StackSearch = () => {
  return (
    <Stack.Navigator initialRouteName="SearchOption">
      <Stack.Screen name="SearchOption" options={{headerShown: false}}>
        {props => <Search {...props} />}
      </Stack.Screen>
      <Stack.Screen name="SearchResult" options={{headerShown: false}}>
        {props => <SearchResult {...props} url={url} />}
      </Stack.Screen>
      <Stack.Screen name="ScheduleEdit" component={ScheduleEdit} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export {AuthStack, StackSchedule, StackCalendar, StackSearch};
