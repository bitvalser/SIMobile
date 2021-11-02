import { GameStatuses } from '@core/constants/game-status.constants';
import { GameType } from '@core/constants/game-type.constants';
import { PersonInfo } from './person-info.interface';

export interface GameItem {
  gameID: number;
  gameName: string;
  language: string;
  mode: GameType;
  owner: string;
  packageName: string;
  passwordRequired: boolean;
  persons: PersonInfo[];
  realStartTime: string;
  rules: number;
  stage: GameStatuses;
  stageName: string;
  startTime: string;
  started: boolean;
}
