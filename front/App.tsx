import React from 'react';
import {View, StyleSheet} from 'react-native';
import MainNavigation from './src/navigations/MainNavigation';
import globalStyle from './src/style/globalStyle';

const App = () => {
  return (
    <View style={styles.container}>
      <MainNavigation />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
