import {StyleSheet, SafeAreaView, Dimensions, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Header from '../../components/Header';

const {width, height} = Dimensions.get('window');

type navigationProp = StackNavigationProp<RootStackParamList, 'BoardEdit'>;

type RootStackParamList = {
  BoardEdit: undefined;
};

const BoardDetail = () => {
  const navigation = useNavigation<navigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="리스트 보드"
        type="edit"
        nextNavigation={() => navigation.navigate('BoardEdit')}
      />
      <View style={styles.contentLayout}></View>
    </SafeAreaView>
  );
};

export default BoardDetail;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
  contentLayout: {
    marginRight: 24,
    marginLeft: 24,
    marginTop: 24,
  },
});
