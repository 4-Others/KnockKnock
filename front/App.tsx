import React from 'react';
import {View} from 'react-native-animatable';
import MainNavigation from './src/navigations/MainNavigation';
import globalStyle from './src/style/globalStyle';

const App = () => {
  return (
    <View style={globalStyle.container}>
      <MainNavigation />
    </View>
  );
};

export default App;
