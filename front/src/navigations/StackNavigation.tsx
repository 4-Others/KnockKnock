import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../pages/login/Login';
import SignUp from '../pages/signUp/SignUp';

const Stack = createStackNavigator();

const SignInStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default SignInStack;
