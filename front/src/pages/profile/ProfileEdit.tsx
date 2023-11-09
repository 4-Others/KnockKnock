import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Switch} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {updateProfile} from '../../util/redux/userSlice';
import {AuthProps} from '../../navigations/StackNavigator';
import {validErrorMessage, storageResetValue} from '../../util/authUtil';
import {userAPI} from '../../api/commonApi';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GradientButton_L} from '../../components/GradientButton';
import {variables} from '../../style/variables';

const ProfileEdit: React.FC<AuthProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const [userInfo, setUserInfo] = useState({username: '', id: '', birth: '', pushAgree: false});
  const [passwordInfo, setPasswordInfo] = useState({password: '', newPassword: ''});
  const [encryption, setEncryption] = useState(false);
  const [visible, setVisible] = useState(false);
  const {username, id, birth, pushAgree} = userInfo;
  const {password, newPassword} = passwordInfo;

  const changeProfileFetch = async () => {
    try {
      const userInfoRes = await userAPI.patch('users', user.token, userInfo);
      if (password.length > 0 && newPassword.length > 0) {
        const passwordRes = await userAPI.patch('users/password', user.token, {
          newPassword,
        });
      }
      dispatch(updateProfile({birth, id, pushAgree, username}));
      Alert.alert('회원정보가 변경되었습니다.');
      navigation.navigate('Profile');
    } catch (error) {
      console.error('회원정보 변경 실패');
    }
  };

  const changeUserInfoValue = (type: string, value: string | Boolean) => {
    type.toLowerCase().includes('password')
      ? setPasswordInfo({...passwordInfo, [type]: value})
      : setUserInfo({...userInfo, [type]: value});
  };

  const handleReset = (type: string) => {
    changeUserInfoValue(type, '');
  };

  const handleVisible = () => {
    setEncryption(!encryption);
  };

  const handleDateConfirm = (date: Date) => {
    const dateString = new Date(date);
    const year = dateString.getFullYear();
    const month = String(dateString.getMonth() + 1).padStart(2, '0');
    const day = String(dateString.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    changeUserInfoValue('birth', formattedDate);
    setVisible(false);
  };

  const handleDateCancel = () => {
    setVisible(false);
  };

  const showDatePicker = () => {
    setVisible(true);
  };

  const passwordError = (password: string, compare: string) => {
    if (password.length > 0) {
      if (compare.length > 0) return validErrorMessage.comparePassword(password, compare);
      return validErrorMessage.password(password);
    }
  };

  const cancellationUser = async () => {
    try {
      const res = await userAPI.delete('users/delete', user.token);
      if (res) Alert.alert('회원탈퇴가 완료되었습니다.');
    } catch (error) {
      if (error) Alert.alert('회원탈퇴가 실패하었습니다.');
    }
  };

  const profileBack = () => {
    changeProfileFetch();
  };

  useEffect(() => {
    const {username, id, birth, pushAgree} = user;
    setUserInfo({username, id, birth, pushAgree});
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="프로필 편집" nextFunc={profileBack} />
      <View style={styles.contentLayout}>
        <ScrollView>
          <View style={styles.listContainer}>
            <Text style={styles.inputTitle}>프로필</Text>
            <View style={styles.inputContainer}>
              <View style={styles.inputItem}>
                <Text style={styles.default}>{id}</Text>
              </View>
              <View style={styles.inputItem}>
                <TextInput
                  placeholder="변경할 닉네임을 입력해 주세요."
                  placeholderTextColor={variables.text_5}
                  style={styles.input}
                  onChangeText={text => changeUserInfoValue('username', text)}
                  value={username}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={() => handleReset('username')}>
                  <Icon name="close-circle-outline" style={styles.icon} />
                </TouchableOpacity>
              </View>
              <View style={styles.inputItem}>
                <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
                  <TextInput
                    placeholder="변경할 생년월일을 입력해 주세요."
                    placeholderTextColor={variables.text_5}
                    style={styles.input}
                    editable={false}
                    value={birth}
                  />
                  <Icon name="calendar-range" style={styles.icon} />
                </TouchableOpacity>
              </View>
              <View style={styles.inputItemLast}>
                <TextInput
                  placeholder={pushAgree ? '푸시 알림 ON' : '푸시 알림 OFF'}
                  placeholderTextColor={pushAgree ? variables.text_2 : variables.text_5}
                  style={styles.input}
                  editable={false}
                />
                <Switch
                  value={pushAgree ? pushAgree : false}
                  onValueChange={() => changeUserInfoValue('pushAgree', !pushAgree)}
                  color={variables.main}
                  style={styles.toggle}
                />
              </View>
            </View>
            {user.providerType === 'LOCAL' ? (
              <View style={styles.listContainer}>
                <Text style={styles.inputTitle}>비밀번호 변경</Text>
                <View style={styles.inputContainer}>
                  <View style={styles.inputItem}>
                    <TextInput
                      placeholder="변경할 비밀번호"
                      placeholderTextColor={variables.text_5}
                      secureTextEntry={encryption}
                      style={styles.input}
                      onChangeText={text => changeUserInfoValue('password', text)}
                      value={password}
                    />
                    <TouchableOpacity onPress={handleVisible}>
                      {encryption ? (
                        <Icon name="eye-off-outline" style={styles.icon} />
                      ) : (
                        <Icon name="eye-outline" style={styles.icon} />
                      )}
                    </TouchableOpacity>
                  </View>
                  <View style={styles.inputItemLast}>
                    <TextInput
                      placeholder="변경할 비밀번호 확인"
                      placeholderTextColor={variables.text_5}
                      secureTextEntry={encryption}
                      style={styles.input}
                      onChangeText={text => changeUserInfoValue('newPassword', text)}
                      value={newPassword}
                    />
                    <TouchableOpacity onPress={handleVisible}>
                      {encryption ? (
                        <Icon name="eye-off-outline" style={styles.icon} />
                      ) : (
                        <Icon name="eye-outline" style={styles.icon} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
                {<Text style={styles.errormessage}>{passwordError(password, newPassword)}</Text>}
              </View>
            ) : null}
          </View>
        </ScrollView>
        <View style={styles.bottomButton}>
          <GradientButton_L
            text="회원 탈퇴"
            onPress={() => {
              storageResetValue();
              cancellationUser();
              navigation.navigate('AuthSplach');
            }}
          />
        </View>
      </View>
      <DateTimePickerModal
        isVisible={visible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={handleDateCancel}
      />
    </SafeAreaView>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentLayout: {
    flex: 1,
    marginRight: 24,
    marginLeft: 24,
  },
  listContainer: {
    justifyContent: 'center',
    marginTop: 24,
  },
  inputContainer: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1.2,
    borderColor: variables.line_1,
  },
  inputItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1.2,
    borderColor: variables.line_1,
  },
  inputItemLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  inputSingleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    borderWidth: 1.2,
    borderColor: variables.line_1,
  },
  inputTitle: {
    marginLeft: 2,
    marginBottom: 10,
    fontFamily: variables.font_3,
    color: variables.text_4,
    fontSize: 16,
  },
  input: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    width: 260,
    fontFamily: variables.font_3,
    color: variables.text_2,
    fontSize: 17,
  },
  default: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    width: 260,
    fontFamily: variables.font_3,
    color: variables.text_4,
    fontSize: 17,
  },
  icon: {
    marginRight: 15,
    color: variables.text_6,
    fontSize: 22,
  },
  toggle: {
    ...Platform.select({
      ios: {marginRight: 8, transform: [{scaleX: 0.7}, {scaleY: 0.7}]},
      android: {marginRight: 5},
    }),
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  errormessage: {
    fontFamily: variables.font_3,
    color: variables.board_8,
    fontSize: 15,
    marginTop: 5,
  },
  bottomButton: {
    marginTop: 'auto',
  },
});
