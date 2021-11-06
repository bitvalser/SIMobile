import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { MessageType } from '@core/constants/mesage-type.constants';
import { SignalEvent } from '@core/constants/signal-event.constants';
import { SignalRequest } from '@core/constants/signal-request.constants';
import { ChatMessage } from '@core/interfaces/chat-message.interface';
import { ISignalRClient } from '../signalr-client/signalr-client.types';
import { GameMessage, IGameController } from './game-controller.types';
import { tap } from 'rxjs/operators';

export class GameController implements IGameController {
  private mainChannelSubscription: Subscription = null;
  public chatMessages$: BehaviorSubject<ChatMessage[]> = new BehaviorSubject([]);

  public constructor(private signalR: ISignalRClient, private userName$: BehaviorSubject<string>) {
    this.start = this.start.bind(this);
    this.leave = this.leave.bind(this);
    this.sendChatMessage = this.sendChatMessage.bind(this);
  }

  private sendSystemMessage<T = any>(message: string): Observable<T> {
    return this.signalR.invoke(SignalRequest.SendMessage, {
      Text: message,
      IsSystem: true,
      Receiver: '@',
    });
  }

  public sendChatMessage(message: string): Observable<void> {
    return this.signalR
      .invoke(SignalRequest.SendMessage, {
        Text: message,
        IsSystem: false,
        Receiver: '*',
      })
      .pipe(
        tap(() => {
          this.chatMessages$.next([
            ...this.chatMessages$.getValue(),
            {
              id: uuidv4(),
              text: message,
              user: this.userName$.getValue(),
            },
          ]);
        }),
      );
  }

  public start(): this {
    this.sendSystemMessage(MessageType.Info);
    this.mainChannelSubscription = this.signalR
      .on<[GameMessage]>(SignalEvent.Receive)
      .subscribe(([{ isSystem, sender, text }]) => {
        if (isSystem) {
          const args = text.split('\n');
          const type = args[0];
          console.log(type);
          switch (type) {
            case MessageType.Info2:
              console.log(args);
              break;
            case MessageType.Config:
              console.log(args);
              break;
            case MessageType.RoundThemes:
              console.log(args);
              break;
            case MessageType.Tablo2:
              console.log(args);
              break;
            case MessageType.GameThemes:
              console.log(args);
              break;
          }
        } else {
          this.chatMessages$.next([
            ...this.chatMessages$.getValue(),
            {
              id: uuidv4(),
              text,
              user: sender,
            },
          ]);
        }
      });
    return this;
  }

  public leave(): void {
    if (this.mainChannelSubscription) {
      this.signalR.invoke(SignalRequest.LeaveGame);
      this.mainChannelSubscription.unsubscribe();
    }
  }
}
