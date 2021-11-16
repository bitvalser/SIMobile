import { PlayerEvents } from '@core/constants/player-events.constants';

export interface AnswerAction {
  event: PlayerEvents.Answer;
}

export interface CatAction {
  event: PlayerEvents.Cat;
  players: boolean[];
}

export interface CatCostAction {
  event: PlayerEvents.CatCost;
  min: number;
  max: number;
  step: number;
}

export interface StakeAction {
  event: PlayerEvents.Stake;
  nominal: boolean;
  stake: boolean;
  pass: boolean;
  allIn: boolean;
  min: number;
  max: number;
}

export interface FinalAction {
  event: PlayerEvents.Final;
  max: number;
}

export interface AppealAction {
  event: PlayerEvents.Appeal;
  name: string;
  answer: string;
  rightAnswers: string[];
}

export type PlayerAction = AnswerAction | CatAction | CatCostAction | StakeAction | FinalAction | AppealAction;
