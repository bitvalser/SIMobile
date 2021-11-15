import { ComponentType } from 'react';
import styled from 'styled-components/native';
import { AppSlider } from '@core/components/slider';
import { SliderProps } from '@miblanchard/react-native-slider/lib/types';

export const TimerWrapper = styled.View`
  width: 100%;
  position: absolute;
  top: 6px;
  z-index: 5;
`;

export const SumSlider = styled(AppSlider)`
  display: flex;
  flex: 1;
  margin-left: 12px;
` as ComponentType<SliderProps>;

export const Content = styled.View`
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Input = styled.TextInput`
  margin-left: 4px;
  height: 40px;
  width: 60px;
  background: ${({ theme }) => theme.pallette.white};
  border: 1px solid ${({ theme }) => theme.pallette.black};
`;
