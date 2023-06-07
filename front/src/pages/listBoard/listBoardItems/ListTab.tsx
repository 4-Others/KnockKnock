import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BoardDetail from '../BoardDetail';

const Tab = createBottomTabNavigator();

const ListTab = () => {
  return (
    <View>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
        })}>
        <Tab.Screen name="List Board" component={BoardDetail} />
      </Tab.Navigator>
      <TouchableOpacity>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListTab;
