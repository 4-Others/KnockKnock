import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {scheduleAPI} from '../../api/commonApi';
import Header from '../../components/Header';
import {variables} from '../../style/variables';

export interface notificationData {
  createdAt: string;
  delivered: boolean;
  modifiedAt: string;
  notificationId: number;
  notifyAt: string;
  read: null;
  title: string;
}

interface RouteProps {
  route: any;
  navigation: any;
  setBadge: React.Dispatch<React.SetStateAction<number>>;
}

const Notifications: React.FC<RouteProps> = ({setBadge}) => {
  const [notificationDatas, setNotificationDatas] = useState<notificationData[]>([]);
  const token = useSelector((state: any) => state.user.token);

  function formatDateString(inputDateString: string): string {
    const inputDate = new Date(inputDateString);
    const options: Intl.DateTimeFormatOptions = {
      year: '2-digit',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };

    const formattedDate = inputDate.toLocaleDateString('ko', options);

    // 날짜 문자열을 "오전" 또는 "오후"로 변경
    let timePart = formattedDate.replace(
      /(\d{1,2}\/\d{1,2}\/)(\d{2},) (\d{1,2}:\d{2})/,
      (match, p1, p2, p3) => {
        const hour = parseInt(p3.split(':')[0], 10);
        return p3;
      },
    );

    timePart = timePart.replace(/(\d{1,2}\/)(\d{1,2}\/)(\d{2},)/, (match, p1, p2, p3) => {
      const month = parseInt(p1, 10);
      const day = parseInt(p2, 10);
      return `${month}.${day}`;
    });

    return timePart;
  }

  useEffect(() => {
    scheduleAPI.notificationGet(token).then(items => setNotificationDatas(items));
  }, [scheduleAPI.notificationDelete]);

  useEffect(() => {
    setBadge(notificationDatas.length);
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="알림" type="alarm" />
      <ScrollView style={styles.scheduleListContainer}>
        {notificationDatas.length > 0 ? (
          notificationDatas.map(data => {
            return (
              <TouchableOpacity
                onPress={() => {
                  scheduleAPI.notificationDelete(token, [data.notificationId]);
                  setNotificationDatas(
                    notificationDatas.filter(
                      item => ![data.notificationId].includes(item.notificationId),
                    ),
                  );
                }}
                style={styles.notificationContainer}
                key={data.notificationId}>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: variables.line_2,
                    paddingBottom: 10,
                    marginBottom: 10,
                  }}>
                  <Text style={styles.notificationTitle}>{data.title}</Text>
                  <Text style={styles.notificationCreateDateText}>{`${formatDateString(
                    data.modifiedAt,
                  )}부터 ${formatDateString(data.notifyAt)}까지`}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={styles.notificationText}>일정이 등록되었습니다.</Text>
                  <Text style={styles.notificationCreateDateText}>
                    {formatDateString(data.createdAt)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text>알림이 없습니다.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  scheduleListContainer: {
    backgroundColor: variables.back_1,
    padding: 24,
  },
  notificationContainer: {
    flex: 1,
    backgroundColor: variables.back_2,
    padding: 16,
    borderRadius: 5,
    marginBottom: 10,
  },
  notificationTitle: {
    fontFamily: variables.font_2,
    color: variables.text_3,
    fontSize: 16,
  },
  notificationText: {
    fontFamily: variables.font_3,
    color: variables.text_4,
    fontSize: 14,
  },
  notificationCreateDateText: {
    fontFamily: variables.font_3,
    color: variables.text_6,
    fontSize: 14,
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
