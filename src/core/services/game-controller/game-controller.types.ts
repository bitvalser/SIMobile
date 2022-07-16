import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { ChatMessage } from '@core/interfaces/chat-message.interface';
import { GameAnswer } from '@core/interfaces/game-answer.interface';
import { GameAtom } from '@core/interfaces/game-atom.interface';
import { QuestionType } from '@core/constants/question-type.constants';
import { GameShowMode } from '@core/constants/game-show-mode.constants';
import { GameUser } from '@core/interfaces/game-user.interface';
import { GamePlayer } from '@core/interfaces/game-player.interface';
import { RoundTheme } from '@core/interfaces/round-theme.interface';
import { AvatarState } from '@pages/game/components/player-avatar/player-avatar.types';
import { UserAction } from '@core/interfaces/user-action.interface';
import { TimerEvent } from '@core/interfaces/timer-event.interface';
import { GameStage } from '@core/constants/game-stage.constants';
import { PlayerAction } from '@core/interfaces/player-action.interface';
import { StakeMessageType } from '@core/constants/stake-message-type.constants';

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
  userReplic$: Subject<{ name: string; text: string }>;
  questionSelected$: Subject<[number, number]>;
  userAction$: Subject<UserAction>;
  timerChannel$: Subject<TimerEvent>;
  pauseChannel$: Subject<boolean>;
  resumeChannel$: Subject<boolean>;
  timerMaxTime$: BehaviorSubject<number>;
  canTry$: Subject<boolean>;
  showTimerBorder$: BehaviorSubject<boolean>;
  gameStage$: BehaviorSubject<GameStage>;
  gameReplic$: BehaviorSubject<string>;
  playerAction$: Subject<PlayerAction>;
  currentPlayerIndex$: Observable<number>;
  yourQuestionChoice$: BehaviorSubject<boolean>;
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
