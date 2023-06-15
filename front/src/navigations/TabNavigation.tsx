import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CustomIcon from '../components/CustomIcon';
import ListBoard from '../pages/listBoard/ListBoard';
import Calendar from '../pages/calendar/Calendar';
import ListAdd from '../pages/listAdd/ListAdd';
import Search from '../pages/search/Search';
import Notifications from '../pages/notifications/Notifications';
import {Platform} from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          let iconSource;

          if (route.name === 'List Board') {
            iconSource = focused
              ? require('../../assets/image/iconOn_listBoard.png')
              : require('../../assets/image/iconOff_listBoard.png');
          } else if (route.name === 'Calendar') {
            iconSource = focused
              ? require('../../assets/image/iconOn_calendar.png')
              : require('../../assets/image/iconOff_calendar.png');
          } else if (route.name === 'Add') {
            iconSource = focused
              ? require('../../assets/image/iconOn_listAdd.png')
              : require('../../assets/image/iconOff_listAdd.png');
          } else if (route.name === 'Search') {
            iconSource = focused
              ? require('../../assets/image/iconOn_search.png')
              : require('../../assets/image/iconOff_search.png');
          } else if (route.name === 'Notifications') {
            iconSource = focused
              ? require('../../assets/image/iconOn_notification.png')
              : require('../../assets/image/iconOff_notification.png');
          }

          return <CustomIcon source={iconSource} size={50} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          paddingLeft: 47,
          paddingRight: 47,
          flex: 0.1,
          backgroundColor: '#ffffff',
          ...Platform.select({
            ios: {shadowOpacity: 0},
            android: {elevation: 0},
          }),
        },
        tabBarItemStyle: {
          flex: 1,
        },
      })}>
      <Tab.Screen name="List Board" component={ListBoard} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Add" component={ListAdd} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Notifications" component={Notifications} options={{tabBarBadge: 3}} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
