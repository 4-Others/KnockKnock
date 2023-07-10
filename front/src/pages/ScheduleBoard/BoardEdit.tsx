import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {variables} from '../../style/variables';
import Header from '../../components/Header';
const {width, height} = Dimensions.get('window');

const BoardEdit = () => {
  const [contentTitle, setContentTitle] = useState('');
  const [contentText, setContentText] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <Header title="리스트 보드 수정" />
      <View style={styles.contentLayout}>
        <TextInput
          placeholder="보드 이름을 입력해 주세요."
          style={styles.contentTitleInput}
          onChangeText={text => setContentTitle(text)}
        />
        <View style={styles.contentInput}>
          <View style={styles.iconContainer}>
            <Image style={styles.icon} source={require('front/assets/image/invite_icon.png')} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>초대하기</Text>
            <TouchableOpacity style={styles.selectContainer}>
              <Text
                style={[
                  styles.placeHolder,
                  {
                    marginTop: 10,
                  },
                ]}>
                초대할 지인의 메일을 입력하세요.
              </Text>
              <Image source={require('front/assets/image/back-btn.png')} style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.contentInput}>
          <View style={styles.iconContainer}>
            <Image style={styles.icon} source={require('front/assets/image/color_icon.png')} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>스케줄 보드 컬러</Text>
            <TouchableOpacity style={styles.selectContainer}>
              <Text
                style={[
                  styles.placeHolder,
                  {
                    marginTop: 10,
                  },
                ]}>
                원하시는 컬러를 선택하세요.
              </Text>
              <Image source={require('front/assets/image/back-btn.png')} style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BoardEdit;

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
  contentTitleInput: {
    fontFamily: variables.font_3,
    color: variables.text_2,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: variables.line_1,
    paddingBottom: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  contentInput: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconContainer: {
    marginRight: 30,
  },
  inputContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: variables.line_1,
    paddingBottom: 16,
  },
  inputTitle: {
    fontFamily: variables.font_3,
    color: variables.text_2,
    fontSize: 16,
  },
  placeHolder: {
    fontFamily: variables.font_3,
    color: variables.text_6,
    fontSize: 16,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    marginRight: 10,
    transform: [{scaleX: -1}],
  },
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
});
