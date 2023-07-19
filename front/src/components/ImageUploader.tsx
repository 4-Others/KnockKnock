import React, {useState} from 'react';
import {TouchableOpacity, Image, View, StyleSheet, Alert} from 'react-native';
import {Text} from 'react-native-animatable';
import {launchImageLibrary} from 'react-native-image-picker';
import {variables} from '../style/variables';

const ImageUploader = () => {
  const [imgSource, setImgSource] = useState('');
  const defaultImg = require('front/assets/image/DefaultIMG.png');

  const selectImage = () => {
    const options = {
      mediaType: 'photo' as const,
      maxWidth: 600,
      maxHeight: 600,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode == 'camera_unavailable') {
        console.log('Camera not available on device');
      } else if (response.errorCode == 'permission') {
        console.log('Permission not satisfied');
      } else if (response.errorCode == 'others') {
        console.log(response.errorMessage);
      } else {
        const uri = require('front/assets/image/SymbolLogo.png');
        setImgSource(uri);
      }
    });
  };

  const deleteImage = () => {
    setImgSource('');
  };

  return imgSource ? (
    <View style={styles.uploaderContainer}>
      <View style={styles.imageFrame}>
        <Image source={{uri: imgSource}} style={styles.profileImg} />
      </View>
      <TouchableOpacity style={styles.editContainer} onPress={() => selectImage()}>
        <Text style={styles.text}>이미지 편집</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.uploaderContainer}>
      <View style={styles.imageFrame}>
        <Image source={defaultImg} style={styles.profileImg} />
      </View>
      <TouchableOpacity style={styles.editContainer} onPress={() => selectImage()}>
        <Text style={styles.text}>이미지 편집</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageUploader;

const styles = StyleSheet.create({
  uploaderContainer: {
    alignItems: 'center',
    paddingBottom: 10,
    width: '100%',
  },
  imageFrame: {
    alignItems: 'center',
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 0.6,
    borderColor: variables.line_1,
  },
  profileImg: {
    width: 86,
    height: 86,
    borderRadius: 43,
  },
  editContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 2,
    paddingRight: 10,
    paddingBottom: 2,
    paddingLeft: 10,
    borderRadius: 8,
    borderWidth: 0.6,
    borderColor: variables.line_1,
    backgroundColor: 'rgba(240, 240, 240, 0.5)',
  },
  text: {
    color: variables.text_4,
  },
});
