import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  View,
  Image,
  Text,
  Platform,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {variables} from '../../style/variables';
import Header from '../../components/Header';
import MyBoard from '../../components/MyBoard';
import {GradientButton_L} from '../../components/GradientButton';

const {width, height} = Dimensions.get('window');

type navigationProp = StackNavigationProp<RootStackParamList, 'ProfileEdit'>;

type RootStackParamList = {
  ProfileEdit: undefined;
};

const Profile = () => {
  const navigation = useNavigation<navigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="내 프로필"
        type="edit"
        nextNavigation={() => navigation.navigate('ProfileEdit')}
      />
      <View style={styles.contentLayout}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.contentContainer}>
            <View style={styles.imageFrame}>
              <Image
                style={styles.profileImage}
                source={require('front/assets/image/DefaultIMG.png')}
              />
            </View>
            <Text style={styles.profileName}>BangBang</Text>
            <Text style={styles.profileMail}>myMail@gmail.com</Text>
          </View>
          <View style={styles.myBoardContainer}>
            <Text style={styles.boardInfo}>내 스케줄 보드 (6)</Text>
            <MyBoard />
            <MyBoard />
            <MyBoard />
            <MyBoard />
            <MyBoard />
            <MyBoard />
          </View>
        </ScrollView>
        <GradientButton_L text="로그아웃" style={styles.buttonLogout} />
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  contentLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 24,
    paddingLeft: 24,
  },
  scroll: {
    ...Platform.select({
      ios: {paddingBottom: 280},
      android: {paddingBottom: 220},
    }),
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingRight: 24,
    paddingBottom: 20,
    paddingLeft: 24,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  imageFrame: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 0.6,
    borderColor: variables.line_1,
  },
  profileImage: {
    width: 86,
    height: 86,
    borderRadius: 43,
  },
  profileName: {
    marginTop: 15,
    marginBottom: 6,
    fontFamily: variables.font_2,
    fontSize: 25,
    color: variables.text_1,
  },
  profileMail: {
    fontFamily: variables.font_4,
    fontSize: 18,
    color: variables.text_4,
  },
  myBoardContainer: {
    paddingTop: 36,
    paddingRight: 12,
    paddingLeft: 12,
    width: '100%',
    ...Platform.select({
      ios: {height: height - 453},
      android: {height: height - 480},
    }),
  },
  boardInfo: {
    marginBottom: 15,
    fontFamily: variables.font_4,
    fontSize: 15,
    color: variables.text_4,
  },
  buttonLogout: {
    position: 'absolute',
    bottom: 0,
  },
});
