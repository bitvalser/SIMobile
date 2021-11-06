import { BehaviorSubject, Observable } from 'rxjs';
import { ChatMessage } from '@core/interfaces/chat-message.interface';

export interface IGameController {
  chatMessages$: BehaviorSubject<ChatMessage[]>;
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
