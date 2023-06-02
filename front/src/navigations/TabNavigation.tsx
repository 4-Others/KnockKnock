import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet} from 'react-native';
import {variables} from '../style/variables';
import Icon from 'react-native-vector-icons/Ionicons';
import ListBoard from '../pages/listBoard/ListBoard';
import Calendar from '../pages/calendar/Calendar';
import ListAdd from '../pages/listAdd/ListAdd';
import Search from '../pages/search/Search';
import Notifications from '../pages/notifications/Notifications';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  Icon.loadFont();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'List Board') {
            iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
          } else if (route.name === 'Calendar') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          } else if (route.name === 'Add') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'ios-list' : 'ios-list-outline';
          }

          return <Icon name={`${iconName}`} size={30} color={'#aaaaaa'} />;
        },
        tabBarActiveTintColor: '#ff5789',
        tabBarInactiveTintColor: '#aaaaaa',
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="List Board" component={ListBoard} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Add" component={ListAdd} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Notifications" component={Notifications} options={{tabBarBadge: 3}} />
    </Tab.Navigator>
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

export default TabNavigation;
