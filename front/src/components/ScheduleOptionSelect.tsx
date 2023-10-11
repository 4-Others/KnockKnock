import React from 'react';
import {View, Text, TouchableOpacity, Image, TextInput, StyleSheet, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {variables, VariablesKeys} from '../style/variables';

interface inputProps {
  type: string;
  state: string | {color: string; name: string};
  event: () => void;
  iconName: string;
  period?: string;
}

const ScheduleOptionSelect: React.FC<inputProps> = ({type, state, event, iconName, period}) => {
  const colorChipRender = () => {
    if (state && typeof state !== 'string') {
      let colorValue: any = state.color;
      if (colorValue.startsWith('variables.')) {
        let colorKey = colorValue.substring('variables.'.length) as VariablesKeys;
        colorValue = variables[colorKey];
      }
      return colorValue ? <View style={[styles.colorChip, {backgroundColor: colorValue}]} /> : null;
    }
  };

  return (
    <View style={styles.contentInput}>
      <Icon name={iconName} style={styles.icon} />
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>{type}</Text>
        <TouchableOpacity style={styles.selectContainer} onPress={event}>
          <View style={styles.selector}>
            {colorChipRender()}
            <TextInput
              value={state && typeof state !== 'string' ? state.name : state}
              placeholder={`${type} 선택하세요.`}
              style={[
                type === '스케줄 보드' ||
                type === '알림 시간' ||
                type === '검색 기간 시작' ||
                type === '검색 기간 종료'
                  ? {color: variables.text_3}
                  : (type === '일정 시작 시간' || type === '일정 종료 시간') &&
                    period === 'SPECIFIC_TIME'
                  ? {color: variables.text_3}
                  : {color: variables.text_6},
              ]}
              editable={false}
            />
          </View>
          <Image source={require('front/assets/image/back-btn.png')} style={styles.arrowIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScheduleOptionSelect;

const styles = StyleSheet.create({
  contentInput: {
    marginTop: 20,
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: variables.line_1,
    ...Platform.select({
      ios: {paddingBottom: 16},
      android: {paddingBottom: 0},
    }),
  },
  inputTitle: {
    fontFamily: variables.font_3,
    color: variables.text_2,
    fontSize: 14,
  },
  contentText: {
    padding: 0,
    paddingTop: 10,
    marginBottom: 10,
    height: 30,
    fontFamily: variables.font_4,
    fontSize: 14,
    ...Platform.select({
      ios: {marginTop: 10},
      android: {marginTop: 0},
    }),
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
    alignItems: 'center',
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    marginRight: 30,
    color: variables.main,
  },
  colorChip: {
    width: 12,
    height: 12,
    borderRadius: 12,
    marginRight: 6,
  },
});
