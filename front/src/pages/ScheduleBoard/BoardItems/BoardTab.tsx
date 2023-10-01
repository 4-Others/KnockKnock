import {View, Text, StyleSheet, Platform} from 'react-native';
import React, {useEffect} from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationProp,
} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../util/redux/store';

const Tab = createMaterialTopTabNavigator();
type TabNavProp = MaterialTopTabNavigationProp<{[key: string]: undefined}>;

const DisplayNone = () => null;

type BoardTabProps = {
  active: number | null;
  onActiveChange: (newValue: number) => void;
};

const BoardTab = ({active, onActiveChange}: BoardTabProps) => {
  const navigation = useNavigation<TabNavProp>();
  const boardData = useSelector((state: RootState) => state.board);

  useEffect(() => {
    const activeTab = boardData.find(data => data.tagId === active);
    if (activeTab) {
      navigation.navigate(activeTab.name);
    }
  }, [active]);

  if (!boardData.length) return null;

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
            key={item.tagId}
            name={item.name}
            listeners={{
              focus: () => onActiveChange(item.tagId),
            }}
            component={DisplayNone}
            options={() => ({
              tabBarLabel: ({focused}) => (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{color: focused ? '#1b1b1b' : '#cccccc'}}>
                  {item.name}
                </Text>
              ),
            })}
          />
        ))}
      </Tab.Navigator>
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
});
