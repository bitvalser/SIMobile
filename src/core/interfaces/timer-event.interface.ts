import { TimerCommand } from '@core/constants/timer-command.constants';

export interface TimerEvent {
  command: TimerCommand;
  index: number;
  playerName: string;
  time: number;
}
