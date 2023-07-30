import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, Linking} from 'react-native';
import {variables} from '../../style/variables';
import {RouteProp, ParamListBase} from '@react-navigation/native';
import {GradientButton_L} from '../../components/GradientButton';

interface CheckBtnProps {
  text: string;
  link: string;
  on: boolean;
  onPress: () => void;
}

type SignUpProps = {
  route: RouteProp<ParamListBase, 'SignAgree'>;
  navigation: any;
  setDeps: React.Dispatch<number>;
};

const SignAgree: React.FC<SignUpProps> = ({navigation, setDeps}) => {
  const [allAgree, setAllAgree] = React.useState(false);
  const [eachAgree, seteachAgree] = React.useState([
    {text: '[필수] 만 14세 이상입니다.', link: 'https//www.m.naver.com', on: false},
    {text: '[필수] 이용약관 동의', link: 'https//www.m.naver.com', on: false},
    {text: '[필수] 개인정보 수집 및 이용 동의', link: 'https//www.m.naver.com', on: false},
  ]);
  const handleAllAgreePress = () => {
    setAllAgree(!allAgree);
    seteachAgree(agree =>
      agree.map(e => ({
        ...e,
        on: !allAgree,
      })),
    );
  };
  const agreeHandler = (idx: number) => {
    seteachAgree(agree => agree.map((e, i) => (i === idx ? {...e, on: !e.on} : e)));
  };

  const handleNextPage = () => {
    navigation.jumpTo('SignPassword');
    setDeps(0.5);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.title}>
          <Text style={styles.text}>서비스 이용약관에</Text>
          <Text style={styles.text}>동의해 주세요.</Text>
        </View>
        <View style={styles.allAgree}>
          <TouchableOpacity style={styles.checkbox} onPress={handleAllAgreePress}>
            <Image
              style={
                allAgree
                  ? [styles.checkImg, styles.smallCheck]
                  : [styles.unCheckImg, styles.smallCheck]
              }
              source={require('front/assets/image/check.png')}
            />
          </TouchableOpacity>
          <Text style={styles.unCheckText}>모두 동의하십니까?</Text>
        </View>
        <View style={styles.essentials}>
          {eachAgree.map((agreement, index) => (
            <CheckBtn
              key={index}
              text={agreement.text}
              link={agreement.link}
              on={agreement.on}
              onPress={() => agreeHandler(index)}
            />
          ))}
        </View>
      </View>
      <View style={styles.bottomButton}>
        <GradientButton_L text="다음" onPress={handleNextPage} />
      </View>
    </SafeAreaView>
  );
};

export default SignAgree;

const CheckBtn: React.FC<CheckBtnProps> = ({text, link, on, onPress}) => {
  return (
    <TouchableOpacity style={styles.essential} onPress={onPress}>
      <Image
        style={on ? [styles.checkImg, styles.largeCheck] : [styles.unCheckImg, styles.largeCheck]}
        source={require('front/assets/image/check.png')}
      />
      <Text style={styles.unCheckText}>{text}</Text>
      <Text style={styles.linkText} onPress={() => Linking.openURL(link)}>
        보기
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: 24,
  },
  text: {
    color: variables.text_1,
    fontFamily: variables.font_4,
    fontSize: 24,
    textAlign: 'left',
    marginBottom: 5,
  },
  allAgree: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: variables.line_1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  unCheckText: {
    fontFamily: variables.font_4,
    fontSize: 14,
    color: variables.text_3,
    marginLeft: 10,
  },
  smallCheck: {width: 10, height: 6},
  largeCheck: {width: 12, height: 12},
  checkImg: {
    tintColor: variables.main,
  },
  unCheckImg: {
    tintColor: '#ddd',
  },
  essentials: {
    borderTopColor: variables.line_1,
    borderTopWidth: 1,
    paddingTop: 16,
  },
  essential: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 16,
  },
  linkText: {
    fontFamily: variables.font_4,
    fontSize: 14,
    color: variables.text_4,
    marginLeft: 10,
    textDecorationLine: 'underline',
  },
  bottomButton: {
    bottom: 0,
    marginBottom: 40,
  },
});
