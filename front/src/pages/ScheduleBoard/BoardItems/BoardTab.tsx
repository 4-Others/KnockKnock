import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import React, {useEffect} from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationProp,
} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import boardData from './boardData.json';
import {variables} from '../../../style/variables';

const Tab = createMaterialTopTabNavigator();
type TabNavProp = MaterialTopTabNavigationProp<{[key: string]: undefined}>;

const DisplayNone = () => null;

type BoardTabProps = {
  active: number;
  onActiveChange: (newValue: number) => void;
};

const BoardTab = ({active, onActiveChange}: BoardTabProps) => {
  const navigation = useNavigation<TabNavProp>();

  useEffect(() => {
    const activeTab = boardData.find(data => data.boardId === active);
    if (activeTab) {
      navigation.navigate(activeTab.title);
    }
  }, [active]);

  const handleAddPress = () => {
    navigation.navigate('BoardAdd');
  };

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={() => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: '#1b1b1b',
          tabBarInactiveTintColor: '#cccccc',
          tabBarStyle: {
            justifyContent: 'flex-start',
            backgroundColor: '#ffffff',
            ...Platform.select({
              ios: {height: 36},
              android: {height: 40},
            }),
          },
          tabBarItemStyle: {
            width: 52,
            paddingHorizontal: 0,
            ...Platform.select({
              ios: {paddingBottom: 21, height: 36},
              android: {paddingTop: 0, height: 40},
            }),
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#1b1b1b',
            height: 2,
          },
          tabBarScrollEnabled: true,
        })}>
        {boardData.map(item => (
          <Tab.Screen
            key={item.boardId.toString()}
            name={item.title}
            listeners={{
              focus: () => onActiveChange(item.boardId),
            }}
            component={DisplayNone}
            options={() => ({
              tabBarLabel: ({focused}) => (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{color: focused ? '#1b1b1b' : '#cccccc'}}>
                  {item.title}
                </Text>
              ),
            })}
          />
        ))}
      </Tab.Navigator>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity onPress={handleAddPress}>
          <Text style={styles.addButton}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BoardTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    paddingLeft: 22,
    paddingRight: 22,
    zIndex: 1,
  },
  addButtonContainer: {
    paddingLeft: 10,
    backgroundColor: '#ffffff',
    ...Platform.select({
      ios: {height: 36},
      android: {height: 40},
    }),
  },
  addButton: {
    zIndex: 10,
    bottom: 3,
    fontFamily: 'Pretendard-Light',
    color: variables.icon_3,
    fontSize: 30,
  },
});
