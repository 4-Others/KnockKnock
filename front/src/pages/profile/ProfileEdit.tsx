import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Dimensions,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Switch} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {variables} from '../../style/variables';
import Header from '../../components/Header';
import ImageUploader from '../../components/ImageUploader';

const {width, height} = Dimensions.get('window');

const ProfileEdit = () => {
  const [username, setUsername] = useState('');
  const [formContent, setFormContent] = useState('');
  const [encryption, setEncryption] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [openBD, setOpenBD] = useState(false);
  const [pushAlarm, setPushAlarm] = useState(true);

  const handleReset = () => {
    setUsername('');
  };

  const handleVisible = () => {
    setEncryption(!encryption);
  };

  const handleDateConfirm = (date: Date) => {
    const dateString = new Date(date);
    const year = dateString.getFullYear();
    const month = String(dateString.getMonth() + 1).padStart(2, '0');
    const day = String(dateString.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    setSelectedDate(formattedDate);
    setVisible(false);
  };

  const handleDateCancel = () => {
    setVisible(false);
  };

  const showDatePicker = () => {
    setVisible(true);
  };

  const handleOpenBD = () => {
    setOpenBD(!openBD);
  };

  const handlePushAlarm = () => {
    setPushAlarm(!pushAlarm);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="프로필 편집" />
      <View style={styles.contentLayout}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.contentContainer}>
            <ImageUploader />
            <View style={styles.listContainer}>
              <Text style={styles.inputTitle}>닉네임</Text>
              <View style={styles.inputSingleContainer}>
                <TextInput
                  placeholder="변경할 닉네임을 입력해주세요."
                  placeholderTextColor={variables.text_5}
                  style={styles.input}
                  onChangeText={text => setUsername(text)}
                  value={username}
                  autoCapitalize="none"
                />
                <TouchableOpacity onPress={handleReset}>
                  <Icon name="close-circle-outline" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.listContainer}>
              <Text style={styles.inputTitle}>비밀번호 변경</Text>
              <View style={styles.inputContainer}>
                <View style={styles.inputItem}>
                  <TextInput
                    placeholder="기존 비밀번호"
                    placeholderTextColor={variables.text_5}
                    secureTextEntry={encryption}
                    style={styles.input}
                    onChangeText={text => setFormContent(text)}
                  />
                  <TouchableOpacity onPress={handleVisible}>
                    {encryption ? (
                      <Icon name="eye-off-outline" style={styles.icon} />
                    ) : (
                      <Icon name="eye-outline" style={styles.icon} />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.inputItem}>
                  <TextInput
                    placeholder="변경할 비밀번호"
                    placeholderTextColor={variables.text_5}
                    secureTextEntry={encryption}
                    style={styles.input}
                    onChangeText={text => setFormContent(text)}
                  />
                  <TouchableOpacity onPress={handleVisible}>
                    {encryption ? (
                      <Icon name="eye-off-outline" style={styles.icon} />
                    ) : (
                      <Icon name="eye-outline" style={styles.icon} />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.inputItemLast}>
                  <TextInput
                    placeholder="변경할 비밀번호 확인"
                    placeholderTextColor={variables.text_5}
                    secureTextEntry={encryption}
                    style={styles.input}
                    onChangeText={text => setFormContent(text)}
                  />
                  <TouchableOpacity onPress={handleVisible}>
                    {encryption ? (
                      <Icon name="eye-off-outline" style={styles.icon} />
                    ) : (
                      <Icon name="eye-outline" style={styles.icon} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.listContainer}>
              <Text style={styles.inputTitle}>생년월일</Text>
              <View style={styles.inputContainer}>
                <View style={styles.inputItem}>
                  <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
                    <TextInput
                      placeholder="임의"
                      placeholderTextColor={variables.text_5}
                      style={styles.input}
                      editable={false}
                      value={selectedDate}
                    />
                    <Icon name="calendar-range" style={styles.icon} />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputItemLast}>
                  <TextInput
                    placeholder="생일공개"
                    placeholderTextColor={openBD ? variables.text_2 : variables.text_5}
                    style={styles.input}
                    editable={false}
                  />
                  <Switch
                    value={openBD}
                    onValueChange={handleOpenBD}
                    color={variables.main}
                    style={styles.toggle}
                  />
                </View>
              </View>
            </View>
            <View style={styles.listContainer}>
              <Text style={styles.inputTitle}>알림설정</Text>
              <View style={styles.inputSingleContainer}>
                <TextInput
                  placeholder={pushAlarm ? '푸시 알림 ON' : '푸시 알림 OFF'}
                  placeholderTextColor={pushAlarm ? variables.text_2 : variables.text_5}
                  style={styles.input}
                  editable={false}
                />
                <Switch
                  value={pushAlarm}
                  onValueChange={handlePushAlarm}
                  color={variables.main}
                  style={styles.toggle}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <DateTimePickerModal
        isVisible={visible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={handleDateCancel}
      />
    </SafeAreaView>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
  contentLayout: {
    marginRight: 24,
    marginLeft: 24,
  },
  scroll: {
    ...Platform.select({
      ios: {paddingBottom: 200},
      android: {paddingBottom: 220},
    }),
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    width: '100%',
  },
  listContainer: {
    marginTop: 24,
    width: '100%',
  },
  inputContainer: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1.2,
    borderColor: variables.line_1,
  },
  inputItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1.2,
    borderColor: variables.line_1,
  },
  inputItemLast: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  inputSingleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    borderWidth: 1.2,
    borderColor: variables.line_1,
  },
  inputTitle: {
    marginLeft: 2,
    marginBottom: 6,
    fontFamily: variables.font_3,
    color: variables.text_4,
    fontSize: 16,
  },
  input: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    width: 260,
    fontFamily: variables.font_3,
    color: variables.text_2,
    fontSize: 17,
  },
  icon: {
    marginRight: 15,
    color: variables.text_6,
    fontSize: 22,
  },
  toggle: {
    ...Platform.select({
      ios: {marginRight: 8, transform: [{scaleX: 0.7}, {scaleY: 0.7}]},
      android: {marginRight: 5},
    }),
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});
