import React, {useState} from 'react';
import {Platform, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StackSchedule, StackCalendar, StackSearch} from './StackNavigator';
import ScheduleAdd from '../pages/Schedule/ScheduleAdd';
import Notifications from '../pages/notifications/Notifications';
import CustomIcon from '../components/CustomIcon';

const Tab = createBottomTabNavigator();
const deviceHeight = Dimensions.get('window').height;

const TabNavigator = () => {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [lastTab, setLastTab] = useState('Schedule Board');
  const [badge, setBadge] = useState(0);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          let iconSource;

          if (route.name === 'Schedule Board') {
            iconSource = focused
              ? require('../../assets/image/iconOn_scheduleBoard.png')
              : require('../../assets/image/iconOff_scheduleBoard.png');
          } else if (route.name === 'Schedule Calendar') {
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
          paddingTop: 5,
          paddingRight: 47,
          paddingLeft: 47,
          backgroundColor: '#ffffff',
          ...Platform.select({
            ios: {shadowOpacity: 0, height: deviceHeight / 8},
            android: {elevation: 0, height: (deviceHeight - 150) / 8},
          }),
        },
        tabBarItemStyle: {
          flex: 1,
        },
      })}>
      <Tab.Screen
        name="Schedule Board"
        component={StackSchedule}
        listeners={{
          focus: () => {
            setLastTab('Schedule Board');
          },
        }}
      />
      <Tab.Screen
        name="Schedule Calendar"
        component={StackCalendar}
        listeners={{
          focus: () => {
            setLastTab('Schedule Calendar');
          },
        }}
        options={{unmountOnBlur: true}}
      />
      <Tab.Screen
        name="Add"
        component={ScheduleAdd}
        listeners={{
          focus: () => {
            setIsFocused(true);
          },
          blur: () => {
            setIsFocused(false);
          },
          tabPress: e => {
            if (isFocused && lastTab) {
              e.preventDefault();
              navigation.navigate(lastTab as never);
            }
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={StackSearch}
        listeners={{
          focus: () => {
            setLastTab('Search');
          },
        }}
        options={{unmountOnBlur: true}}
      />
      <Tab.Screen
        name="Notifications"
        listeners={{
          focus: () => {
            setLastTab('Notifications');
          },
        }}
        options={{tabBarBadge: badge, unmountOnBlur: true}}>
        {props => <Notifications {...props} setBadge={setBadge} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;
