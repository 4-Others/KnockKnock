import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './src/navigations/TabNavigation';

const App = () => {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
};

export default App;
