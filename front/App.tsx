import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {variables} from './src/style/variables';
import LinearGradient from 'react-native-linear-gradient';

const App = () => {
  return (
    <View style={Style.layout}>
      <LinearGradient
        style={Style.linearGradient}
        start={{x: 0, y: 0}}
        end={{x: 0.6, y: 0.6}}
        colors={['#FEA97A', '#FF5789']}
      />
      <Text style={Style.title}>Sign in with Facebook</Text>
      <Text style={Style.title}>ㅎㅇㅎㅇ</Text>
    </View>
  );
};

export default App;

const Style = StyleSheet.create({
  title: {
    fontSize: 40,
    fontFamily: 'Pretendard-Black',
    color: variables.main,
  },
  layout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 200,
    paddingRight: 200,
    borderRadius: 5,
  },
});
