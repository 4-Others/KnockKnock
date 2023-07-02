import {
  StyleSheet,
  SafeAreaView,
  View,
  TextInput,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {variables} from '../../style/variables';
import Header from '../../components/Header';

const {width, height} = Dimensions.get('window');

const Search = () => {
  const [inputText, setInputText] = useState('');
  return (
    <SafeAreaView style={styles.container}>
      <Header title="검색" type="search" />
      <View style={styles.contentContainer}>
        <TextInput
          style={styles.searchBar}
          onChangeText={text => setInputText(text)}
          placeholder="검색어를 입력해 주세요"
        />
        <View style={styles.contentInput}>
          <View style={styles.iconContainer}>
            <Image style={styles.icon} source={require('front/assets/image/tag_icon.png')} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTitle}>스케줄 보드</Text>
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
            <Text style={styles.inputTitle}>스케줄 시작</Text>
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
            <Text style={styles.inputTitle}>스케줄 종료</Text>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
  contentContainer: {
    marginRight: 24,
    marginLeft: 24,
    marginTop: 24,
  },
  searchBar: {
    fontFamily: variables.font_3,
    color: variables.text_2,
    fontSize: 14,
    backgroundColor: variables.back_1,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    height: 44,
    borderRadius: 60,
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
    fontSize: 14,
  },
  placeHolder: {
    fontFamily: variables.font_3,
    color: variables.text_6,
    fontSize: 14,
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

export default Search;
