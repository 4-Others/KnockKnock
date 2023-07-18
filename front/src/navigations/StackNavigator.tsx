import React, {useState, useEffect} from 'react';
import {Image, TouchableOpacity, StyleSheet, TouchableOpacityProps} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../pages/login/Login';
import SignUp from '../pages/signUp/SignUp';
import ScheduleBoard from '../pages/ScheduleBoard/ScheduleBoard';
import Calendar from '../pages/calendar/Calendar';
import BoardAdd from '../pages/ScheduleBoard/BoardAdd';
import BoardEdit from '../pages/ScheduleBoard/BoardEdit';
import BoardDetail from '../pages/ScheduleBoard/BoardDetail';
import ScheduleAdd from '../pages/Schedule/ScheduleAdd';
import ScheduleEdit from '../pages/Schedule/ScheduleEdit';
import Profile from '../pages/profile/Profile';
import ProfileEdit from '../pages/profile/ProfileEdit';

interface onLoginProps {
  onLogin: (loginState: boolean) => void;
}

interface BackBtnProps {
  goBack: () => void;
}

const BackBtn: React.FC<BackBtnProps & TouchableOpacityProps> = ({goBack, ...props}) => {
  const handlePress = () => {
    goBack();
  };

  return (
    <TouchableOpacity onPress={handlePress} {...props}>
      <Image
        source={require('front/assets/image/back-btn.png')}
        style={{marginLeft: 24, width: 24, height: 24}}
      />
    </TouchableOpacity>
  );
};

const Stack = createStackNavigator();

const StackSign: React.FC<onLoginProps> = ({onLogin}) => {
  const [deps, setDeps] = useState([
    {Agree: true},
    {Email: false},
    {Password: false},
    {Success: false},
  ]);

  const next = () => {
    const nextDepIndex = deps.findIndex(dep => Object.values(dep)[0] === false);
    if (nextDepIndex !== -1) {
      const updatedDeps = [...deps];
      updatedDeps[nextDepIndex] = {
        ...updatedDeps[nextDepIndex],
        [Object.keys(deps[nextDepIndex])[0]]: true,
      };
      setDeps(updatedDeps);
    }
  };

  const goBack = (navigation: any) => {
    // signup 컴포넌트 제어
    const lastTrueIndex = deps
      .map((dep, index) => ({...dep, index}))
      .filter(dep => Object.values(dep)[0] === true);

    if (lastTrueIndex.length > 1) {
      const updatedDeps = [...deps];
      const lastTrueIndexValue = lastTrueIndex[lastTrueIndex.length - 1].index;
      const key = Object.keys(deps[lastTrueIndexValue])[0];

      updatedDeps[lastTrueIndexValue] = {
        ...updatedDeps[lastTrueIndexValue],
        [key]: false,
      };
      setDeps(updatedDeps);
    } else (navigation.navigate as any)('Login');
  };

  const [locate, setLocate] = useState<string>('Agree');

  useEffect(() => {
    const trueDeps = deps.filter(dep => Object.values(dep)[0] === true);
    const nextDeps = trueDeps[trueDeps.length - 1] || 1;
    const taskKeys = Object.keys(nextDeps);
    const lastTaskKey = taskKeys[taskKeys.length - 1];
    setLocate(lastTaskKey);
  }, [deps]);

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" options={{headerShown: false}}>
        {props => <Login {...props} onLogin={onLogin} />}
      </Stack.Screen>
      <Stack.Screen
        name="SignUp"
        options={({navigation}) => ({
          title: '회원가입',
          headerBackTitleVisible: false,
          headerBackImage: () => <BackBtn goBack={() => goBack(navigation)} />,
          headerRight: () =>
            locate !== 'Success' ? (
              <TouchableOpacity onPress={next}>
                <Image
                  source={require('front/assets/image/check_btn.png')}
                  style={{marginRight: 24, width: 24, height: 24}}
                />
              </TouchableOpacity>
            ) : null,
          headerStyle: styles.headerStyle,
          headerTitleAlign: 'left',
        })}>
        {props => <SignUp {...props} deps={deps} locate={locate} onLogin={onLogin} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const StackSchedule = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ScheduleBoard" component={ScheduleBoard} options={{headerShown: false}} />
      <Stack.Screen name="BoardDetail" component={BoardDetail} options={{headerShown: false}} />
      <Stack.Screen name="BoardAdd" component={BoardAdd} options={{headerShown: false}} />
      <Stack.Screen name="BoardEdit" component={BoardEdit} options={{headerShown: false}} />
      <Stack.Screen name="ScheduleAdd" component={ScheduleAdd} options={{headerShown: false}} />
      <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}} />
      <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

const StackCalendar = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Calendar" component={Calendar} options={{headerShown: false}} />
      <Stack.Screen name="ScheduleAdd" component={ScheduleAdd} options={{headerShown: false}} />
      <Stack.Screen name="ScheduleEdit" component={ScheduleEdit} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export {StackSign, StackSchedule, StackCalendar};

const styles = StyleSheet.create({
  headerStyle: {
    height: 80,
  },
});
