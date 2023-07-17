import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ProfileEdit from '../pages/profile/ProfileEdit';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator screenOptions={{drawerPosition: 'right'}}>
      <Drawer.Screen name="Profile Edit" component={ProfileEdit} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
