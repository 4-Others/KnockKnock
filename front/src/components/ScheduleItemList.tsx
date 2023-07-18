import ScheduleItem from './ScheduleItem';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import {variables} from '../style/variables';
import {ItemsData} from '../pages/calendar/style';

const ScheduleItemList = (
  {items}: any,
  setItems: React.Dispatch<React.SetStateAction<ItemsData>>,
) => {
  const itemsKeyArray = Object.keys(items)
    .filter((date: string) => items[date].length > 0) // 빈 배열을 제거하는 필터링 추가
    .sort();

  const handleToggleComplete = (day: string, itemId: number) => {
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
    <ScrollView style={styles.scheduleListContainer}>
      {itemsKeyArray.map((date, i) => {
        const renderDateItem = items[date];
        return (
          <View key={i}>
            <Text style={styles.listDateTitle}>{date.replace(/-/g, '.')}</Text>
            {renderDateItem.map((item: any, j: number) => (
              <ScheduleItem
                item={item}
                key={j}
                onPress={() => handleToggleComplete(date, item.id)}
              />
            ))}
          </View>
        );
      })}
    </ScrollView>
  );
};

export default ScheduleItemList;

const styles = StyleSheet.create({
  scheduleListContainer: {
    flex: 1,
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
});
