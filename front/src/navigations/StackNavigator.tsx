import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthSplashScreen from '../pages/login/AuthSplashScreen';
import Login from '../pages/login/Login';
import {ForgotId, ForgotPw} from '../pages/login/Forgot';
import SignUpTab from '../pages/signUp/SignUpTab';
import TabNavigator from './TabNavigator';
import ScheduleBoard from '../pages/ScheduleBoard/ScheduleBoard';
import BoardDetail from '../pages/ScheduleBoard/BoardDetail';
import BoardEdit from '../pages/ScheduleBoard/BoardEdit';
import ScheduleAdd from '../pages/Schedule/ScheduleAdd';
import ScheduleEdit from '../pages/Schedule/ScheduleEdit';
import Profile from '../pages/profile/Profile';
import ProfileEdit from '../pages/profile/ProfileEdit';
import Calendar from '../pages/calendar/Calendar';
import Search from '../pages/search/Search';
import SearchResult from '../pages/search/SearchResult';

export interface AuthProps {
  route: any;
  navigation: any;
}

const Stack = createStackNavigator();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="AuthSplach">
      <Stack.Screen name="AuthSplach" options={{headerShown: false}}>
        {props => <AuthSplashScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Login" options={{headerShown: false}}>
        {props => <Login {...props} />}
      </Stack.Screen>
      <Stack.Screen name="ForgotId" options={{headerShown: false}}>
        {props => <ForgotId {...props} />}
      </Stack.Screen>
      <Stack.Screen name="ForgotPw" options={{headerShown: false}}>
        {props => <ForgotPw {...props} />}
      </Stack.Screen>
      <Stack.Screen name="SignUpTab" options={{headerShown: false}}>
        {props => <SignUpTab {...props} />}
      </Stack.Screen>
      <Stack.Screen name="MainTab" component={TabNavigator} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

const StackSchedule = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ScheduleBoard" options={{headerShown: false}}>
        {props => <ScheduleBoard {...props} />}
      </Stack.Screen>
      <Stack.Screen name="BoardDetail" options={{headerShown: false}}>
        {props => <BoardDetail {...props} />}
      </Stack.Screen>
      <Stack.Screen name="BoardEdit" component={BoardEdit} options={{headerShown: false}} />
      <Stack.Screen name="ScheduleAdd" component={ScheduleAdd} options={{headerShown: false}} />
      <Stack.Screen name="ScheduleEdit" component={ScheduleEdit} options={{headerShown: false}} />
      <Stack.Screen name="Profile" options={{headerShown: false}}>
        {props => <Profile {...props} />}
      </Stack.Screen>
      <Stack.Screen name="ProfileEdit" options={{headerShown: false}}>
        {props => <ProfileEdit {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const StackCalendar = () => {
  return (
    <Stack.Navigator initialRouteName="Calendar">
      <Stack.Screen name="Calendar" options={{headerShown: false}}>
        {props => <Calendar {...props} />}
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
        {props => <SearchResult {...props} />}
      </Stack.Screen>
      <Stack.Screen name="ScheduleEdit" component={ScheduleEdit} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export {AuthStack, StackSchedule, StackCalendar, StackSearch};
