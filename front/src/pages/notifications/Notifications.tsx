import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {variables} from '../../style/variables';
import Header from '../../components/Header';

const {width, height} = Dimensions.get('window');

const Notifications = () => {
  const datas = [
    {
      date: '2023-07-13',
      key: 1,
      contents: [
        {content: '🎉 오늘 등록한 모든 일정을 완수하셨습니다! 내일도 화이팅~~!', time: '1시간 전'},
        {content: '‘하체 조지는 날’ 일정이 곧 시작됩니다.', time: '5시간 전'},
      ],
    },
  ];
  return (
    <SafeAreaView>
      <Header title="알림" type="alarm" />
      <ScrollView style={styles.scheduleListContainer}>
        {datas.map((data, i) => {
          return (
            <View key={i}>
              <Text style={styles.listDateTitle}>{data.date.replace(/-/g, '.')}</Text>
              {data.contents.map((item, key) => (
                <TouchableOpacity style={styles.item} key={key}>
                  <Shadow
                    style={styles.todo}
                    distance={4}
                    startColor={'#00000010'}
                    endColor={'#ffffff05'}
                    offset={[0, 0.2]}>
                    <View style={styles.content}>
                      <Text style={styles.text}>{item.content}</Text>
                      <Text style={styles.time}>{item.time}</Text>
                    </View>
                  </Shadow>
                </TouchableOpacity>
              ))}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  scheduleListContainer: {
    backgroundColor: '#fff',
    paddingLeft: 24,
    paddingRight: 24,
  },
  listDateTitle: {
    fontFamily: variables.font_3,
    color: variables.text_5,
    fontSize: 14,
    marginTop: 20,
    marginBottom: 20,
  },
  item: {marginBottom: 10},
  todo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: '#ffffff',
    width: '99%',
    marginLeft: 1,
  },
  content: {
    width: '100%',
    flexDirection: 'column',
  },
  text: {
    fontFamily: variables.font_3,
    color: variables.text_2,
  },
  time: {
    fontFamily: variables.font_4,
    fontSize: 13,
    color: variables.text_6,
    marginTop: 6,
    alignSelf: 'flex-end',
  },
});
