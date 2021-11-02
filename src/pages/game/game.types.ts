import { AppRoutes, AppRoutesParamList } from '@navigators/root';
import { RouteProp } from '@react-navigation/core';

export interface GameParamList {
  gameId: number;
}

export type GameRouteProp = RouteProp<AppRoutesParamList, AppRoutes.Game>;
