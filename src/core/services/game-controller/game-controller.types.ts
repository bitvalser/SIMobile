import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ChatMessage } from '@core/interfaces/chat-message.interface';
import { GameAnswer } from '@core/interfaces/game-answer.interface';
import { GameAtom } from '@core/interfaces/game-atom.interface';
import { QuestionType } from '@core/constants/question-type.constants';
import { GameShowMode } from '@core/constants/game-show-mode.constants';
import { GameUser } from '@core/interfaces/game-user.interface';
import { GamePlayer } from '@core/interfaces/game-player.interface';
import { RoundTheme } from '@core/interfaces/round-theme.interface';

export interface IGameController {
  chatMessages$: BehaviorSubject<ChatMessage[]>;
  roundThemes$: BehaviorSubject<RoundTheme[]>;
  printThemes$: Subject<void>;
  gameMaster$: BehaviorSubject<GameUser>;
  players$: BehaviorSubject<GamePlayer[]>;
  spectators$: BehaviorSubject<GameUser[]>;
  gameThemes$: BehaviorSubject<string[]>;
  showMode$: BehaviorSubject<GameShowMode>;
  questionType$: BehaviorSubject<QuestionType>;
  atom$: BehaviorSubject<GameAtom>;
  rightAnswer$: BehaviorSubject<GameAnswer>;
  currentPlayer$: Observable<GamePlayer>;
  questionSelected$: Subject<[number, number]>;
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
