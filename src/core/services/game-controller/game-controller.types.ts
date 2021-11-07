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
  timerMaxTime$: BehaviorSubject<number>;
  canTry$: Subject<void>;
  sendChatMessage(message: string): Observable<void>;
  start(): this;
  leave(): void;
}

export interface GameMessage {
  isSystem: boolean;
  isPrivate: boolean;
  receiver: string;
  sender: string;
  text: string;
}
