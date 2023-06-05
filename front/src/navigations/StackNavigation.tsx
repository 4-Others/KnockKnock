import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../pages/login/Login';
import SignUp from '../pages/signUp/SignUp';
import {Image, TouchableOpacity} from 'react-native';

const Stack = createStackNavigator();

const BackBtn = () => {
  return (
    <Image
      source={require('front/assets/image/back-btn.png')}
      style={{marginLeft: 24, width: 24, height: 24}}
    />
  );
};

const CheckBtn = () => {
  return (
    <TouchableOpacity>
      <Image
        source={require('front/assets/image/check_btn.png')}
        style={{marginRight: 24, width: 24, height: 24}}
      />
    </TouchableOpacity>
  );
};

interface Task {
  completed: boolean;
}

const SignInStack: React.FC = () => {
  const tasks: Record<string, Task> = {
    task1: {completed: true},
    task2: {completed: false},
    task3: {completed: false},
    task4: {completed: false},
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'white',
          borderBottomColor: 'white',
          shadowColor: 'white',
          height: 80,
        },
        headerTitleAlign: 'left',
        headerTintColor: '#000',
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
      <Stack.Screen
        name="SignUp"
        options={{
          title: '회원가입',
          headerBackTitleVisible: false,
          headerBackImage: BackBtn,
          headerRight: () => <CheckBtn />,
        }}>
        {props => <SignUp {...props} tasks={tasks} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default SignInStack;
