import { ComponentType } from 'react';
import { FlatList, FlatListProps } from 'react-native';
import styled from 'styled-components/native';
import { AppText } from '@core/components/text';
import { DimensionsStyle } from '@core/helpers/dimensions-style.helper';
import { GamePlayer } from '@core/interfaces/game-player.interface';

export const Container = styled.KeyboardAvoidingView`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  background: ${({ theme }) => theme.pallette.background};
`;

export const Header = styled.View`
  padding: 8px 0;
  padding-top: ${DimensionsStyle.tabBarHeight + 8}px;
  align-items: center;
  background: ${({ theme }) => theme.pallette.background};
  display: flex;
  flex-direction: row;
`;

export const Title = styled(AppText)`
  font-size: 24px;
  display: flex;
  flex: 1;
  color: ${({ theme }) => theme.pallette.primary};
`;

export const CloseText = styled(AppText)`
  font-size: 20px;
  color: ${({ theme }) => theme.pallette.primary};
  padding: 4px;
`;

export const UsersList = styled(FlatList)`
  padding: 0 12px;
` as ComponentType<FlatListProps<GamePlayer>>;
