import { ComponentType } from 'react';
import { FlatList, FlatListProps } from 'react-native';
import styled from 'styled-components/native';
import { GameItem } from '@core/interfaces/game-item.interface';
import { FilterChip } from './components/filter-chip';

export const GameList = styled(FlatList)`
  width: 100%;
` as ComponentType<FlatListProps<GameItem>>;

export const GamesText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.pallette.primary};
`;

export const Header = styled.View`
  margin: 4px;
  flex-direction: column;
`;

export const FiltersRow = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

export const GameFilterChip = styled(FilterChip)`
  margin-bottom: 4px;
  margin-left: 4px;
`;

export const SearchInput = styled.TextInput`
  height: 40px;
  background: ${({ theme }) => theme.pallette.white};
  border: 1px solid ${({ theme }) => theme.pallette.black};
`;

export const SearchWrapper = styled.View`
  display: flex;
`;
