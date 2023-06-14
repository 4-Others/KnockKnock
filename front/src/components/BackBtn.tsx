import React from 'react';
import {Image, TouchableOpacity, TouchableOpacityProps} from 'react-native';

interface BackBtnProps {
  goBack: () => void;
}

const BackBtn: React.FC<BackBtnProps & TouchableOpacityProps> = ({goBack, ...props}) => {
  const handlePress = () => {
    goBack();
  };

  return (
    <TouchableOpacity onPress={handlePress} {...props}>
      <Image
        source={require('front/assets/image/back-btn.png')}
        style={{marginLeft: 24, width: 24, height: 24}}
      />
    </TouchableOpacity>
  );
};

export default BackBtn;
