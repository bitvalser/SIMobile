import { ComponentType } from 'react';
import { FlatListProps } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { RoundTheme } from '@core/interfaces/round-theme.interface';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  justify-content: center;
`;

export const ThemesList = styled(FlatList)`
  width: 100%;
` as ComponentType<FlatListProps<RoundTheme>>;
