import { GameStatuses } from '@core/constants/game-status.constants';

export interface GameItemProps {
  title: string;
  stage: GameStatuses;
  stageName: string;
  startTime: string;
  withLead: boolean;
  withPassword: boolean;
  players: number;
  maxPlayers: number;
}
