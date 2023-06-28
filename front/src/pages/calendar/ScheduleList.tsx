import React, {useRef, useState} from 'react';
import {TouchableOpacity, View, Text, Image, ScrollView} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {styles} from './Calendar';
import {Item} from './Calendar';
import {dateFormat} from './CalendarUtil';

const ScheduleList = (data: any) => {
  const [items, setItems] = useState<{[key: string]: Item[]}>({}); // 랜더링 할 아이템 state로 저장 & 업데이트
  const scrollViewRef = useRef<ScrollView>(null); // ScrollView에 대한 ref 생성
  const renderItemsData = items; // props로 받은 전체 일정들과 리스트 속성 중 일정들만 할당
  const itemsKeyArray = Object.keys(renderItemsData).sort(); // 출력할 날짜들만 배열로 저장 후 오름차 순 정렬

  const toggleComplete = (day: string, itemId?: number) => {
    setItems(prevItems => {
      const updatedItems = prevItems[day].map(item => {
        if (item.id === itemId) {
          return {...item, complete: !item.complete};
        }
        return item;
      });
      return {...prevItems, [day]: updatedItems};
    });
  };

  return (
    <ScrollView ref={scrollViewRef} style={styles.scheduleListContainer}>
      {itemsKeyArray.map((date, i) => {
        const renderDateItem = renderItemsData[date];
        return (
          <View key={i}>
            <Text style={styles.listDateTitle}>{date.replace(/-/g, '.')}</Text>
            {renderDateItem.length > 0
              ? renderDateItem.map((item: Item, i: number) => {
                  console.log(typeof item.id, typeof item.day);
                  return (
                    <TouchableOpacity style={styles.item} key={i}>
                      <Shadow
                        style={styles.todo}
                        distance={8}
                        startColor={'#00000010'}
                        endColor={'#ffffff05'}
                        offset={[0, 1]}>
                        <View style={styles.content}>
                          <View style={[styles.colorChip, {backgroundColor: item.color}]}></View>
                          <View style={styles.textBox}>
                            <Text
                              style={[styles.title, item.complete ? styles.check : styles.unCheck]}>
                              {item.name}
                            </Text>
                            <Text style={styles.time}>{`${item.startAt} ~ ${item.endAt}`}</Text>
                          </View>
                        </View>
                        <TouchableOpacity
                          style={item.complete ? styles.checkState : styles.unCheckState}
                          onPress={() => toggleComplete(item.day, item.id)}>
                          <Image
                            style={styles.checkIcon}
                            source={require('front/assets/image/check.png')}
                          />
                        </TouchableOpacity>
                      </Shadow>
                    </TouchableOpacity>
                  );
                })
              : null}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default ScheduleList;
