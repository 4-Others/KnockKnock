import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {variables} from '../../../style/variables';
import BoardDetail from '../BoardDetail';

const Tab = createMaterialTopTabNavigator();

const BoardTab = () => {
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
        <Tab.Screen
          name={'목록'}
          component={BoardDetail}
          options={() => ({
            tabBarLabel: ({focused}) => (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{fontFamily: 'Pretendard-SemiBold', color: focused ? '#1b1b1b' : '#cccccc'}}>
                List
              </Text>
            ),
          })}
        />
        <Tab.Screen
          name={'전체'}
          component={BoardDetail}
          options={() => ({
            tabBarLabel: ({focused}) => (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{color: focused ? '#1b1b1b' : '#cccccc'}}>
                전체
              </Text>
            ),
          })}
        />
        <Tab.Screen
          name={'공부'}
          component={BoardDetail}
          options={() => ({
            tabBarLabel: ({focused}) => (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{color: focused ? '#1b1b1b' : '#cccccc'}}>
                공부
              </Text>
            ),
          })}
        />
        <Tab.Screen
          name={'운동'}
          component={BoardDetail}
          options={() => ({
            tabBarLabel: ({focused}) => (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{color: focused ? '#1b1b1b' : '#cccccc'}}>
                운동
              </Text>
            ),
          })}
        />
        <Tab.Screen
          name={'루틴'}
          component={BoardDetail}
          options={() => ({
            tabBarLabel: ({focused}) => (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{color: focused ? '#1b1b1b' : '#cccccc'}}>
                루틴
              </Text>
            ),
          })}
        />
        <Tab.Screen
          name={'모임'}
          component={BoardDetail}
          options={() => ({
            tabBarLabel: ({focused}) => (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{color: focused ? '#1b1b1b' : '#cccccc'}}>
                모임
              </Text>
            ),
          })}
        />
        <Tab.Screen
          name={'업무'}
          component={BoardDetail}
          options={() => ({
            tabBarLabel: ({focused}) => (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{color: focused ? '#1b1b1b' : '#cccccc'}}>
                업무
              </Text>
            ),
          })}
        />
      </Tab.Navigator>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity>
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
