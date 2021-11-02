import { ComponentType } from 'react';
import { GameItem } from '@core/interfaces/game-item.interface';
import { FlatList, FlatListProps } from 'react-native';
import styled from 'styled-components/native';

export const GameList = styled(FlatList)`
  width: 100%;
` as ComponentType<FlatListProps<GameItem>>;

export const GamesText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.pallette.primary};
`;

export const Header = styled.View`
  margin: 4px
`