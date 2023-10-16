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
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {variables} from '../../style/variables';
import Header from '../../components/Header';
import {GradientButton_L} from '../../components/GradientButton';
import {storageResetValue} from '../../util/authUtil';
import {AuthProps} from '../../navigations/StackNavigator';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {setProfile} from '../../util/redux/userSlice';

const {width, height} = Dimensions.get('window');

type navigationProp = StackNavigationProp<RootStackParamList, 'ProfileEdit'>;

type RootStackParamList = {
  ProfileEdit: undefined;
};

const Profile: React.FC<AuthProps> = ({url, navigation}) => {
  const navigationEdit = useNavigation<navigationProp>();
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  console.log(user);

  const fetchUserInfo = async () => {
    try {
      const res = await axios.get(`${url}api/v1/users`, {
        headers: {Authorization: `Bearer ${user.token}`},
      });
      dispatch(setProfile({...user, ...res.data.body.data}));
    } catch (error) {
      console.error('userInfo 불러오기 실패');
    }
  };

  const navigateToProfileEdit = () => {
    navigationEdit.navigate('ProfileEdit');
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="내 프로필" type="edit" nextFunc={navigateToProfileEdit} />
      <View style={styles.contentLayout}>
        <View style={styles.contentContainer}>
          <View style={styles.imageFrame}>
            <Image
              style={styles.profileImage}
              source={require('front/assets/image/DefaultIMG.png')}
            />
          </View>
          <Text style={styles.profileName}>{user.username}</Text>
          <Text style={styles.profileMail}>{user.email}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <GradientButton_L
            text="로그아웃"
            onPress={() => {
              storageResetValue();
              navigation.navigate('AuthSplach');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentLayout: {
    flex: 1,
    paddingRight: 24,
    paddingLeft: 24,
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
  buttonContainer: {
    bottom: 0,
  },
});
