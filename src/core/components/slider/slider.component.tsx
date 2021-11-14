import { Slider } from '@miblanchard/react-native-slider';
import { SliderProps } from '@miblanchard/react-native-slider/lib/types';
import React, { FC } from 'react';
import { ViewStyle } from 'react-native';

const AppSlider: FC<SliderProps & { style: ViewStyle }> = ({ style, ...props }) => {
  return <Slider {...props} containerStyle={style} />;
};

export default AppSlider;
