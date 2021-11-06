import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { delay, map, tap, withLatestFrom } from 'rxjs/operators';
import { MessageType } from '@core/constants/mesage-type.constants';
import { SignalEvent } from '@core/constants/signal-event.constants';
import { SignalRequest } from '@core/constants/signal-request.constants';
import { ChatMessage } from '@core/interfaces/chat-message.interface';
import { RoundTheme } from '@core/interfaces/round-theme.interface';
import { ISignalRClient } from '../signalr-client/signalr-client.types';
import { GameMessage, IGameController } from './game-controller.types';
import { GameUser } from '@core/interfaces/game-user.interface';
import { GamePlayer } from '@core/interfaces/game-player.interface';
import { i18n } from 'i18next';
import { GameRole } from '@core/constants/game-role.constants';
import { GameShowMode } from '@core/constants/game-show-mode.constants';
import { ISiApiClient } from '../si-api-client/si-api-client.types';
import { QuestionType } from '@core/constants/question-type.constants';
import { AtomType } from '@core/constants/atom-type.constants';
import { GameAnswer } from '@core/interfaces/game-answer.interface';
import { GameAtom } from '@core/interfaces/game-atom.interface';
import { IToastsService } from '../toasts/toasts.types';

export const QUESTION_SELECTED_DELAY = 2000;

export class GameController implements IGameController {
  private subscriptions: Subscription[] = [];
  public chatMessages$: BehaviorSubject<ChatMessage[]> = new BehaviorSubject([]);
  public roundThemes$: BehaviorSubject<RoundTheme[]> = new BehaviorSubject([]);
  public printThemes$: Subject<void> = new Subject();
  public gameMaster$: BehaviorSubject<GameUser> = new BehaviorSubject(null);
  public players$: BehaviorSubject<GamePlayer[]> = new BehaviorSubject([]);
  public spectators$: BehaviorSubject<GameUser[]> = new BehaviorSubject([]);
  public gameThemes$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  public showMode$: BehaviorSubject<GameShowMode> = new BehaviorSubject(null);
  public questionType$: BehaviorSubject<QuestionType> = new BehaviorSubject(null);
  public atom$: BehaviorSubject<GameAtom> = new BehaviorSubject(null);
  public rightAnswer$: BehaviorSubject<GameAnswer> = new BehaviorSubject(null);
  public questionSelected$: Subject<[number, number]> = new Subject();
  public currentPlayer$: Observable<GamePlayer> = this.players$.pipe(
    withLatestFrom(this.siApiClient.userName$),
    map(([data, userName]) => data.find(({ name }) => name === userName)),
  );

  public constructor(
    private signalR: ISignalRClient,
    private siApiClient: ISiApiClient,
    private toastsService: IToastsService,
    private translation: i18n,
  ) {
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

  private addChatMessage(message: string, user: string = null): void {
    this.chatMessages$.next([
      ...this.chatMessages$.getValue(),
      {
        id: uuidv4(),
        text: message,
        user: user,
      },
    ]);
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
              user: this.siApiClient.userName$.getValue(),
            },
          ]);
        }),
      );
  }

  public start(): this {
    this.sendSystemMessage(MessageType.Info);
    this.subscriptions.push(
      this.signalR.on<[GameMessage]>(SignalEvent.Receive).subscribe(([{ isSystem, sender, text }]) => {
        if (isSystem) {
          const args = text.split('\n');
          const type = args[0];
          console.log(type);
          console.log(args);
          switch (type) {
            case MessageType.Info2: {
              const playersCount = +args[1];
              const [usersData] = Array.from<[GameUser[], string[]]>({
                length: (args.length - 1) / 5,
              }).reduce(
                ([users, playerArgs]) => [
                  [
                    ...users,
                    {
                      name: playerArgs[0],
                      isMale: playerArgs[1] === '+',
                      isConnected: playerArgs[2] === '+',
                      isHuman: playerArgs[3] === '+',
                      isReady: playerArgs[4] === '+',
                    },
                  ],
                  playerArgs.slice(5),
                ],
                [[], args.slice(2)],
              );
              this.gameMaster$.next(usersData[0]);
              this.players$.next(usersData.slice(1, playersCount + 1));
              this.spectators$.next(usersData.slice(playersCount + 2));
              break;
            }
            case MessageType.Connected: {
              const role = +args[1];
              const newUser = {
                name: args[3],
                isConnected: true,
                isMale: args[4] === 'm',
                isHuman: true,
                isReady: false,
              };
              switch (role) {
                case GameRole.Master:
                  this.gameMaster$.next(newUser);
                  break;
                case GameRole.Player: {
                  const currentPlayers = [...this.players$.getValue()];
                  currentPlayers.splice(+args[2], 1, newUser);
                  this.players$.next(currentPlayers);
                  break;
                }
                case GameRole.Spectator: {
                  const currentPlayers = [...this.players$.getValue()];
                  currentPlayers.splice(+args[2], 1, newUser);
                  this.spectators$.next(currentPlayers);
                  break;
                }
              }
              this.addChatMessage(this.translation.t('game.userConnected').replace('{user}', newUser.name));
              break;
            }
            case MessageType.Disconnected: {
              const name = args[1];
              if (this.gameMaster$.getValue()?.name === name) {
                this.gameMaster$.next(null);
              } else if (this.players$.getValue()?.some(({ name: userName }) => userName === name)) {
                this.players$.next(
                  this.players$.getValue().map((user) => ({
                    ...user,
                    ...(user.name === name
                      ? {
                          isConnected: false,
                          name: '',
                        }
                      : {}),
                  })),
                );
              } else if (this.spectators$.getValue()?.some(({ name: userName }) => userName === name)) {
                this.spectators$.next(this.spectators$.getValue().filter(({ name: userName }) => userName !== name));
              }
              this.addChatMessage(this.translation.t('game.userDisconnected').replace('{user}', name));
              break;
            }
            case MessageType.Disconnect:
              this.addChatMessage(this.translation.t('game.connectionLost'));
              break;
            case MessageType.Sums:
              this.players$.next(
                this.players$.getValue().map((player, i) => ({
                  ...player,
                  sum: +args[i + 1],
                })),
              );
              break;
            case MessageType.Config:
              break;
            case MessageType.RoundThemes: {
              const currentThemes = this.roundThemes$.getValue();
              this.roundThemes$.next(
                args.slice(2).map((round, i) => ({
                  ...(currentThemes[i] || {}),
                  name: round,
                })),
              );
              if (args[1] === '+') {
                this.printThemes$.next();
              }
              break;
            }
            case MessageType.Tablo2: {
              const currentThemes = this.roundThemes$.getValue();
              const prices = args
                .slice(1)
                .reduce<number[][]>(
                  (acc, val) => {
                    if (val !== '') {
                      acc[acc.length - 1].push(+val);
                    } else {
                      acc.push([]);
                    }
                    return acc;
                  },
                  [[]],
                )
                .filter((arr) => arr.length > 0);
              this.roundThemes$.next(
                prices.map((item, i) => ({
                  ...(currentThemes[i] || {}),
                  questions: item,
                })),
              );
              break;
            }
            case MessageType.RightAnswer:
              this.rightAnswer$.next({
                type: args[1] as GameAnswer['type'],
                data: args[2],
              });
              this.showMode$.next(GameShowMode.Answer);
              break;
            case MessageType.GameThemes:
              this.gameThemes$.next(args.slice(1));
              this.showMode$.next(GameShowMode.GameThemes);
              break;
            case MessageType.ShowTablo:
              this.showMode$.next(GameShowMode.Tablo);
              this.questionType$.next(null);
              this.atom$.next(null);
              this.rightAnswer$.next(null);
              break;
            case MessageType.QuestionType:
              this.questionType$.next(args[1] as QuestionType);
              this.showMode$.next(GameShowMode.Question);
              break;
            case MessageType.Atom: {
              const atomType = args[1];
              switch (atomType) {
                case AtomType.Video:
                case AtomType.Voice:
                case AtomType.Image:
                  this.atom$.next({
                    type: atomType,
                    data: args[3].replace('<SERVERHOST>', this.siApiClient.serverUri$.getValue()),
                  });
                  break;
                case AtomType.Text:
                case AtomType.Partial:
                  this.atom$.next({
                    type: atomType,
                    data: args.splice(2).join(),
                  });
                  break;
              }
              this.showMode$.next(GameShowMode.Atom);
              break;
            }
            case MessageType.Replic: {
              if (args.length < 3) {
                break;
              }
              const replicType = args[1][0];
              switch (replicType) {
                case 's':
                  this.toastsService.showToast({
                    type: 'info',
                    text: args[2],
                    delay: 3000,
                  });
                  break;
              }
              break;
            }
            case MessageType.Choice:
              const themeIndex = +args[1];
              const questionIndex = +args[2];
              this.questionSelected$.next([themeIndex, questionIndex]);
              this.subscriptions.push(
                of([themeIndex, questionIndex])
                  .pipe(delay(QUESTION_SELECTED_DELAY))
                  .subscribe(([theme, question]) => {
                    const currentRound = [...this.roundThemes$.getValue()];
                    currentRound[theme].questions.splice(question, 1, -1);
                    this.roundThemes$.next(currentRound);
                  }),
              );
              break;
          }
        } else {
          this.addChatMessage(text, sender);
        }
      }),
    );
    return this;
  }

  public leave(): void {
    if (this.subscriptions.length > 0) {
      this.signalR.invoke(SignalRequest.LeaveGame);
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
  }
}
