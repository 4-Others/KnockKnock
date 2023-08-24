import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {AuthStack} from './src/navigations/StackNavigator';
import {Provider} from 'react-redux';
import store from './src/util/redux/store';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkLogin = (loginState: boolean) => {
    console.log('checkLogin called with:', loginState);
    setIsLoggedIn(loginState);
  };

  return (
    <Provider store={store}>
      <NavigationContainer
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            background: 'white',
          },
        }}
        independent={true}>
        <View style={styles.container}>
          <AuthStack />
        </View>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
