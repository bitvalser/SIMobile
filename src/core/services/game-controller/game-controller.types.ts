import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { GameEventType } from '@core/constants/game-event-type.constants';
import { GameShowMode } from '@core/constants/game-show-mode.constants';
import { GameStage } from '@core/constants/game-stage.constants';
import { QuestionType } from '@core/constants/question-type.constants';
import { StakeMessageType } from '@core/constants/stake-message-type.constants';
import { ChatMessage } from '@core/interfaces/chat-message.interface';
import { GameAnswer } from '@core/interfaces/game-answer.interface';
import { GameAtom } from '@core/interfaces/game-atom.interface';
import { GamePlayer } from '@core/interfaces/game-player.interface';
import { GameUser } from '@core/interfaces/game-user.interface';
import { PlayerAction } from '@core/interfaces/player-action.interface';
import { RoundTheme } from '@core/interfaces/round-theme.interface';
import { TimerEvent } from '@core/interfaces/timer-event.interface';
import { UserAction } from '@core/interfaces/user-action.interface';
import { AvatarState } from '@pages/game/components/player-avatar/player-avatar.types';

export interface GameControllerEvent<T> {
  data: T;
}

export interface GameControllerEventMap {
  [GameEventType.CanTry]: GameControllerEvent<boolean>;
  [GameEventType.Pause]: GameControllerEvent<boolean>;
  [GameEventType.Resume]: GameControllerEvent<boolean>;
  [GameEventType.PlayerAction]: GameControllerEvent<PlayerAction>;
  [GameEventType.QuestionSelected]: GameControllerEvent<[number, number]>;
  [GameEventType.Timer]: GameControllerEvent<TimerEvent>;
  [GameEventType.UserAction]: GameControllerEvent<UserAction>;
  [GameEventType.UserReplic]: GameControllerEvent<{ name: string; text: string }>;
}

export interface IGameController {
  chatMessages$: BehaviorSubject<ChatMessage[]>;
  roundThemes$: BehaviorSubject<RoundTheme[]>;
  gameMaster$: BehaviorSubject<GameUser>;
  players$: BehaviorSubject<GamePlayer[]>;
  spectators$: BehaviorSubject<GameUser[]>;
  gameThemes$: BehaviorSubject<string[]>;
  showMode$: BehaviorSubject<GameShowMode>;
  questionType$: BehaviorSubject<QuestionType>;
  atom$: BehaviorSubject<GameAtom>;
  rightAnswer$: BehaviorSubject<GameAnswer>;
  currentPlayer$: Observable<GamePlayer>;
  userAvatarState$: ReplaySubject<{ name: string; state: AvatarState }>;
  timerMaxTime$: BehaviorSubject<number>;
  showTimerBorder$: BehaviorSubject<boolean>;
  gameStage$: BehaviorSubject<GameStage>;
  gameReplic$: BehaviorSubject<string>;
  currentPlayerIndex$: Observable<number>;
  yourQuestionChoice$: BehaviorSubject<boolean>;
  playerMaster$: Observable<GamePlayer>;
  sendChatMessage(message: string): Observable<void>;
  start(): this;
  leave(): void;
  createStringSnapshot(): string;
  sendPlayerRight(right: boolean): void;
  choiceQuestion(theme: number, question: number): void;
  removeTheme(theme: number): void;
  sendAnswer(answer: string): void;
  tryAnswer(): void;
  sendStake(type: StakeMessageType, stake?: number): void;
  selectCat(index: number): void;
  selectCatCost(sum: number): void;
  sendFinalStake(stake?: number): void;
  mediaEnd(): void;
  ready(value: boolean): void;
  listen<K extends keyof GameControllerEventMap>(event: K): Observable<GameControllerEventMap[K]>;
}

export interface GameMessage {
  isSystem: boolean;
  isPrivate: boolean;
  receiver: string;
  sender: string;
  text: string;
}

export interface LastAnswer {
  name: string;
  isWon: boolean;
  sum: number;
}
