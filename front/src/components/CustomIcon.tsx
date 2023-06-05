import {Image, ImageSourcePropType, ImageStyle, StyleProp, View} from 'react-native';
import React from 'react';

interface CustomIconProps {
  source: ImageSourcePropType;
  size?: number;
  style?: StyleProp<ImageStyle>;
  focused?: boolean;
}

const CustomIcon: React.FC<CustomIconProps> = ({source, size, focused}) => {
  return <Image source={source} style={[{width: size, height: size}]} />;
};

export default CustomIcon;
