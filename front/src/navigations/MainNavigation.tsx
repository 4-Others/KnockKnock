import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignInStack from './StackNavigation';
import TabNavigation from './TabNavigation';

const Stack = createStackNavigator();

const MainNavigation = () => {
  const isLogin = true;
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={({route}) => ({headerShown: false})}
        initialRouteName="SignInStack">
        {isLogin ? (
          <>
            <Stack.Screen name="TabNavigator" component={TabNavigation} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignInStack" component={SignInStack} />
            <Stack.Screen name="TabNavigator" component={TabNavigation} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
