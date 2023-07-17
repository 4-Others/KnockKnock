import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Dimensions,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {variables} from '../../style/variables';
import Header from '../../components/Header';

const {width, height} = Dimensions.get('window');

const ProfileEdit = () => {
  const [contentTitle, setContentTitle] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Header title="프로필 편집" />
      <View style={styles.contentLayout}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.contentContainer}>
            <View style={styles.imageFrame}>
              <Image
                style={styles.profileImage}
                source={require('front/assets/image/DefaultIMG.png')}
              />
            </View>
            <View style={styles.listContainer}>
              <Text style={styles.inputTitle}>닉네임</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="변경할 닉네임을 입력해주세요."
                  style={styles.inputContent}
                  onChangeText={text => setContentTitle(text)}
                />
                <TouchableOpacity>
                  <Icon name="close-circle-outline" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.listContainer}>
              <Text style={styles.inputTitle}>비밀번호 변경</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="기존 비밀번호"
                  style={styles.inputContent}
                  onChangeText={text => setContentTitle(text)}
                />
                <TouchableOpacity>
                  <Icon name="eye-outline" style={styles.icon} />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="변경할 비밀번호"
                  style={styles.inputContent}
                  onChangeText={text => setContentTitle(text)}
                />
                <TouchableOpacity>
                  <Icon name="eye-outline" style={styles.icon} />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="변경할 비밀번호 확인"
                  style={styles.inputContent}
                  onChangeText={text => setContentTitle(text)}
                />
                <TouchableOpacity>
                  <Icon name="eye-outline" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.listContainer}>
              <Text style={styles.inputTitle}>생년월일</Text>
              <View style={styles.inputContainer}>
                <TouchableOpacity>
                  <TextInput
                    placeholder="임의"
                    style={styles.inputContent}
                    onChangeText={text => setContentTitle(text)}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="생일공개"
                  style={styles.inputContent}
                  onChangeText={text => setContentTitle(text)}
                />
              </View>
            </View>
            <View style={styles.listContainer}>
              <Text style={styles.inputTitle}>알림설정</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="푸시 알림 OFF"
                  style={styles.inputContent}
                  onChangeText={text => setContentTitle(text)}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
  contentLayout: {
    marginRight: 24,
    marginLeft: 24,
  },
  scroll: {
    ...Platform.select({
      ios: {paddingBottom: 200},
      android: {paddingBottom: 220},
    }),
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    width: '100%',
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
  listContainer: {
    marginTop: 24,
    width: '100%',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    borderRadius: 8,
    borderWidth: 1.2,
    borderColor: variables.line_1,
  },
  inputTitle: {
    marginLeft: 2,
    marginBottom: 6,
    fontFamily: variables.font_3,
    color: variables.text_4,
    fontSize: 16,
  },
  inputContent: {
    paddingTop: 0,
    paddingBottom: 0,
    fontFamily: variables.font_3,
    color: variables.text_2,
    fontSize: 17,
  },
  icon: {
    color: variables.text_6,
    fontSize: 22,
  },
});
