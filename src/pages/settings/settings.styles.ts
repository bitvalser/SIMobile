import { ComponentType } from 'react';
import styled from 'styled-components/native';
import { AppSlider } from '@core/components/slider';
import { AppText } from '@core/components/text';
import { SliderProps } from '@miblanchard/react-native-slider/lib/types';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  padding: 12px;
`;

export const Title = styled(AppText)`
  font-size: 26px;
  color: ${({ theme }) => theme.pallette.primary};
`;

export const SettingsName = styled(AppText)`
  margin-right: 12px;
  font-size: 24px;
  color: ${({ theme }) => theme.pallette.primary};
`;

export const SettingsValue = styled(AppText)`
  margin-left: 12px;
  font-size: 24px;
  width: 40px;
  color: ${({ theme }) => theme.pallette.primary};
`;

export const RowContainer = styled.View`
  align-items: center;
  margin-top: 8px;
  margin-bottom: 18px;
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const RowHorizontalContainer = styled.View`
  margin-top: 18px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SettingsSlider = styled(AppSlider)`
  display: flex;
  flex: 1;
` as ComponentType<SliderProps>;
