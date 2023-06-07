import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import Login from '../pages/login/Login';
import SignUp from '../pages/signUp/SignUp';
import {Image, TouchableOpacity} from 'react-native';
import BackBtn from '../components/BackBtn';

const Stack = createStackNavigator();

const MainNavigation = () => {
  const isLogin = false;

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
    const lastTrueIndex = deps
      .map((dep, index) => ({...dep, index}))
      .filter(dep => Object.values(dep)[0] === true);
    console.log(lastTrueIndex);
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
    console.log(deps);
    const trueDeps = deps.filter(dep => Object.values(dep)[0] === true);
    const nextDeps = trueDeps[trueDeps.length - 1] || 1;
    const taskKeys = Object.keys(nextDeps);
    const lastTaskKey = taskKeys[taskKeys.length - 1];
    setLocate(lastTaskKey);
  }, [deps]);

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login">
        {isLogin ? (
          <>
            <Stack.Screen name="TabNavigator" component={TabNavigation} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
            <Stack.Screen
              name="SignUp"
              options={({navigation}) => ({
                title: '회원가입',
                headerBackTitleVisible: false,
                headerBackImage: () => <BackBtn goBack={() => goBack(navigation)} />,
                headerRight: () => (
                  <TouchableOpacity onPress={next}>
                    <Image
                      source={require('front/assets/image/check_btn.png')}
                      style={{marginRight: 24, width: 24, height: 24}}
                    />
                  </TouchableOpacity>
                ),
              })}>
              {props => <SignUp {...props} deps={deps} locate={locate} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
