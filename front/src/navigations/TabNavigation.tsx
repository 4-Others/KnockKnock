import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ListBoard from '../pages/listBoard/ListBoard';
import Calendar from '../pages/calendar/Calendar';
import ListAdd from '../pages/listAdd/ListAdd';
import Search from '../pages/search/Search';
import Notifications from '../pages/notifications/Notifications';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({headerShown: false})}
      initialRouteName="List Board">
      <Tab.Screen name="List Board" component={ListBoard} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Add" component={ListAdd} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Notifications" component={Notifications} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
