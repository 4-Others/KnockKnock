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

const ListAdd = () => {
  const [contentTitle, setContentTitle] = useState('');
  const [contentText, setContentText] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <Header title="일정 편집" />
      <View style={styles.contentLayout}>
        <TextInput
          placeholder="일정을 입력해 주세요."
          style={styles.contentTitleInput}
          onChangeText={text => setContentTitle(text)}
        />
        <View style={styles.contentInput}>
          <View style={styles.iconContainer}>
            <Image style={styles.icon} source={require('front/assets/image/tag_icon.png')} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>리스트 보드</Text>
            <TouchableOpacity style={styles.selectContainer}>
              <Text
                style={[
                  styles.placeHolder,
                  {
                    marginTop: 10,
                  },
                ]}>
                보드를 선택하세요.
              </Text>
              <Image source={require('front/assets/image/back-btn.png')} style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.contentInput}>
          <View style={styles.iconContainer}>
            <Image style={styles.icon} source={require('front/assets/image/time_icon.png')} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>일정 시작</Text>
            <TouchableOpacity style={styles.selectContainer}>
              <Text
                style={[
                  styles.placeHolder,
                  {
                    marginTop: 10,
                  },
                ]}>
                시작 날짜와 시간을 선택하세요.
              </Text>
              <Image source={require('front/assets/image/back-btn.png')} style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.contentInput}>
          <View style={styles.iconContainer}>
            <Image style={styles.icon} source={require('front/assets/image/alarm_icon.png')} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>일정 끝</Text>
            <TouchableOpacity style={styles.selectContainer}>
              <Text
                style={[
                  styles.placeHolder,
                  {
                    marginTop: 10,
                  },
                ]}>
                종료 날짜와 시간을 선택하세요.
              </Text>
              <Image source={require('front/assets/image/back-btn.png')} style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.contentInput}>
          <View style={styles.iconContainer}>
            <Image style={styles.icon} source={require('front/assets/image/edit_icon.png')} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>메모</Text>
            <TextInput
              placeholder="메모를 입력하세요"
              style={[styles.inputTitle, {marginTop: 10}]}
              onChangeText={text => setContentText(text)}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

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

export default ListAdd;
