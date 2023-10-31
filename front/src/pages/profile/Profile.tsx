import React, {useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {variables} from '../../style/variables';
import Header from '../../components/Header';
import {GradientButton_L} from '../../components/GradientButton';
import {storageResetValue} from '../../util/authUtil';
import {AuthProps} from '../../navigations/StackNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../util/redux/store';
import {updateProfile} from '../../util/redux/userSlice';
import {VariablesKeys} from '../../style/variables';

type boardDetailParams = {title: string; color: string; number: number; tagId: number};

const Profile: React.FC<AuthProps> = ({route, url, navigation}) => {
  const user = useSelector((state: any) => state.user);
  const boardData = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();
  const fetchUserInfo = async () => {
    try {
      const res = await axios.get(`${url}api/v1/users`, {
        headers: {Authorization: `Bearer ${user.token}`},
      });
      const {birth, id, pushAgree, username} = res.data.body.data;
      dispatch(updateProfile({birth, id, pushAgree, username}));
    } catch (error) {
      console.error('userInfo 불러오기 실패');
    }
  };

  const navigateToProfileEdit = () => {
    navigation.navigate('ProfileEdit');
  };

  const handleBoardPress = (params: boardDetailParams) => {
    navigation.navigate('BoardDetail', params);
  };

  useEffect(() => {
    fetchUserInfo();
  }, [route.params]);

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
          <Text style={styles.profileName}>{user.id}</Text>
          <Text style={styles.profileMail}>{user.email}</Text>
        </View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.userInfoSubTitle}>{`내 보드 (${boardData.length})`}</Text>
          <ScrollView horizontal={true} style={styles.boardList}>
            {boardData && boardData.length > 0 ? (
              boardData.map(data => {
                const {color, tagId, scheduleCount, name} = data;
                const params = {color, tagId, title: name, number: scheduleCount};
                let colorValue: any = color;
                if (colorValue.startsWith('variables.')) {
                  let colorKey = colorValue.substring('variables.'.length) as VariablesKeys;
                  colorValue = variables[colorKey];
                }
                return (
                  <TouchableOpacity
                    style={[styles.boardSeclector, {backgroundColor: colorValue}]}
                    onPress={() => handleBoardPress(params)}
                    key={tagId}>
                    <Text style={styles.menuText}>{name}</Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text style={styles.boardSeclector}>보드가 없습니다.</Text>
            )}
          </ScrollView>
          <Text style={styles.userInfoSubTitle}>이름</Text>
          <Text>{user.username ? user.username : '이름을 입력하세요.'}</Text>
          <Text style={styles.userInfoSubTitle}>생년월일</Text>
          <Text>{user.birth ? user.birth : '생일을 입력하세요.'}</Text>
        </View>
      </View>
      <View style={styles.bottomButton}>
        <GradientButton_L
          text="로그아웃"
          onPress={() => {
            storageResetValue();
            navigation.navigate('AuthSplach');
          }}
        />
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
  bottomButton: {
    marginTop: 'auto',
    paddingRight: 24,
    paddingLeft: 24,
  },
  userInfoContainer: {
    flexDirection: 'column',
  },
  boardList: {
    flexDirection: 'row',
  },
  boardSeclector: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 26,
    paddingLeft: 12,
    paddingRight: 12,
    marginRight: 6,
    borderRadius: 30,
  },
  menuText: {
    fontFamily: variables.font_3,
    fontSize: 14,
    lineHeight: 16,
    color: 'white',
  },
  userInfoSubTitle: {
    fontFamily: variables.font_3,
    fontSize: 16,
    color: variables.text_3,
    marginTop: 30,
    marginBottom: 10,
  },
});
