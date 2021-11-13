import { BehaviorSubject, Observable, of, ReplaySubject, Subject, Subscription } from 'rxjs';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { delay, map, tap, withLatestFrom } from 'rxjs/operators';
import { MessageType } from '@core/constants/message-type.constants';
import { SignalEvent } from '@core/constants/signal-event.constants';
import { SignalRequest } from '@core/constants/signal-request.constants';
import { ChatMessage } from '@core/interfaces/chat-message.interface';
import { RoundTheme } from '@core/interfaces/round-theme.interface';
import { ISignalRClient } from '../signalr-client/signalr-client.types';
import { GameMessage, IGameController } from './game-controller.types';
import { GameUser } from '@core/interfaces/game-user.interface';
import { GamePlayer } from '@core/interfaces/game-player.interface';
import { i18n } from 'i18next';
import { GameShowMode } from '@core/constants/game-show-mode.constants';
import { ISiApiClient } from '../si-api-client/si-api-client.types';
import { QuestionType } from '@core/constants/question-type.constants';
import { AtomType } from '@core/constants/atom-type.constants';
import { GameAnswer } from '@core/interfaces/game-answer.interface';
import { GameAtom } from '@core/interfaces/game-atom.interface';
import { IToastsService } from '../toasts/toasts.types';
import { AvatarState } from '@pages/game/components/player-avatar/player-avatar.types';
import { UserAction } from '@core/interfaces/user-action.interface';
import { TimerCommand } from '@core/constants/timer-command.constants';
import { TimerEvent } from '@core/interfaces/timer-event.interface';
import { GameStage } from '@core/constants/game-stage.constants';

export const QUESTION_SELECTED_DELAY = 2000;

export class GameController implements IGameController {
  private subscriptions: Subscription[] = [];
  public chatMessages$: BehaviorSubject<ChatMessage[]> = new BehaviorSubject([]);
  public roundThemes$: BehaviorSubject<RoundTheme[]> = new BehaviorSubject([]);
  public gameMaster$: BehaviorSubject<GameUser> = new BehaviorSubject(null);
  public players$: BehaviorSubject<GamePlayer[]> = new BehaviorSubject([]);
  public spectators$: BehaviorSubject<GameUser[]> = new BehaviorSubject([]);
  public gameThemes$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  public showMode$: BehaviorSubject<GameShowMode> = new BehaviorSubject(null);
  public questionType$: BehaviorSubject<QuestionType> = new BehaviorSubject(null);
  public atom$: BehaviorSubject<GameAtom> = new BehaviorSubject(null);
  public rightAnswer$: BehaviorSubject<GameAnswer> = new BehaviorSubject(null);
  public gameStage$: BehaviorSubject<GameStage> = new BehaviorSubject(null);
  public gameReplic$: BehaviorSubject<string> = new BehaviorSubject(null);
  public questionSelected$: Subject<[number, number]> = new Subject();
  public userAction$: Subject<UserAction> = new Subject();
  public userReplic$: Subject<{ name: string; text: string }> = new Subject();
  public timerChannel$: Subject<TimerEvent> = new Subject();
  public canTry$: Subject<boolean> = new Subject();
  public showTimerBorder$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public timerMaxTime$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public pauseChannel$: Subject<boolean> = new Subject();
  public userAvatarState$: ReplaySubject<{ name: string; state: AvatarState }> = new ReplaySubject(12);
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

  private clearInfoState(): void {
    this.questionType$.next(null);
    this.atom$.next(null);
    this.rightAnswer$.next(null);
    this.userReplic$.next(null);
    this.showTimerBorder$.next(false);
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
              const role = args[1];
              const index = +args[2];
              const newUser = {
                name: args[3],
                isConnected: true,
                isMale: args[4] === 'm',
                isHuman: true,
                isReady: false,
              };
              switch (role) {
                case 'master':
                  this.gameMaster$.next(newUser);
                  break;
                case 'player': {
                  const currentPlayers = [...this.players$.getValue()];
                  currentPlayers.splice(index, 1, newUser);
                  this.players$.next(currentPlayers);
                  break;
                }
                case 'viewer': {
                  const currentPlayers = [...this.spectators$.getValue()];
                  currentPlayers.splice(index, 1, newUser);
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
                          avatar: null,
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
                  originalIndex: i,
                  name: round,
                })),
              );
              if (args[1] === '+') {
                if (this.gameStage$.getValue() === GameStage.Final) {
                  this.showMode$.next(GameShowMode.FinalThemes);
                } else {
                  this.showMode$.next(GameShowMode.RoundThemes);
                }
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
                  originalIndex: i,
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
              this.clearInfoState();
              break;
            case MessageType.QuestionType:
              this.questionType$.next(args[1] as QuestionType);
              this.showMode$.next(GameShowMode.Question);
              this.userReplic$.next(null);
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
                case AtomType.Partial:
                case AtomType.Text:
                  this.atom$.next({
                    type: atomType,
                    data: args.splice(2).join(),
                  });
                  break;
              }
              this.showMode$.next(GameShowMode.Atom);
              this.userReplic$.next(null);
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
                case 'p': {
                  const player = this.players$.getValue()?.[+args[1][1]];
                  if (player) {
                    this.userReplic$.next({
                      name: player.name,
                      text: args[2],
                    });
                  }
                  break;
                }
                case 'l':
                  break;
                case 't':
                  if (!this.atom$.getValue()) {
                    this.gameReplic$.next(args[2]);
                    this.showMode$.next(GameShowMode.Replic);
                  }
                  break;
                default:
                  this.addChatMessage(args[2]);
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
              this.players$.getValue().forEach(({ name }) => {
                this.userAvatarState$.next({ name, state: AvatarState.Default });
              });
              break;
            case MessageType.Picture:
              this.players$.next(
                this.players$.getValue().map((user) => ({
                  ...user,
                  ...(user.name === args[1]
                    ? {
                        avatar: args[2].replace('<SERVERHOST>', this.siApiClient.serverUri$.getValue()),
                      }
                    : {}),
                })),
              );
              break;
            case MessageType.WrongTry: {
              const player = this.players$.getValue()?.[+args[1]];
              if (player) {
                this.userAvatarState$.next({
                  name: player.name,
                  state: AvatarState.WrongTry,
                });
              }
              break;
            }
            case MessageType.Pass: {
              const player = this.players$.getValue()?.[+args[1]];
              if (player) {
                this.userAvatarState$.next({
                  name: player.name,
                  state: AvatarState.Quail,
                });
              }
              break;
            }

            case MessageType.FinalThink:
              this.players$.getValue().forEach(({ name }) => {
                this.userAvatarState$.next({ name, state: AvatarState.Default });
              });
              break;
            case MessageType.PersonFinalAnswer:
            case MessageType.PersonFinalStake: {
              const player = this.players$.getValue()?.[+args[1]];
              if (player) {
                this.userAvatarState$.next({
                  name: player.name,
                  state: AvatarState.Final,
                });
              }
              break;
            }
            case MessageType.SetChooser:
              break;
            case MessageType.Timer: {
              const timerIndex = parseInt(args[1], 10);
              const timerCommand = args[2];
              const timerArgument = args.length > 3 ? +args[3] : 0;
              const timerPersonIndex = args.length > 4 ? +args[4] : null;

              const players = this.players$.getValue();

              this.timerChannel$.next({
                command: timerCommand as TimerCommand,
                index: timerIndex,
                playerName: players?.[timerPersonIndex]?.name,
                time: timerArgument,
              });

              switch (timerCommand) {
                case TimerCommand.Go:
                  if (timerIndex === 2 && timerPersonIndex >= 0 && timerPersonIndex < players.length) {
                    this.userAction$.next({
                      user: players[timerPersonIndex],
                      timer: timerArgument,
                    });
                  }
                  break;
                case TimerCommand.MaxTime:
                  if (timerIndex === 1) {
                    this.timerMaxTime$.next(+args[3]);
                  }
                  break;
              }

              break;
            }
            case MessageType.Person: {
              const isWon = args[1] === '+';
              const personIndex = +args[2];
              console.log(this.players$.getValue()[personIndex], isWon, +args[3]);
              if (this.players$.getValue()?.[personIndex]) {
                this.userAvatarState$.next({
                  name: this.players$.getValue()[personIndex].name,
                  state: isWon ? AvatarState.Success : AvatarState.Wrong,
                });
                this.players$.next(
                  this.players$.getValue().map((user, index) => ({
                    ...user,
                    ...(index === personIndex
                      ? {
                          sum: user.sum + (isWon ? 1 : -1) * +args[3],
                        }
                      : {}),
                  })),
                );
              }
              this.userReplic$.next(null);
              break;
            }
            case MessageType.Pause:
              if (args.length > 4) {
                this.pauseChannel$.next(args[1] === '+');
              }
              break;
            case MessageType.Try: {
              const withBorder = args.length > 1 && args[1] === 'NF';
              this.showTimerBorder$.next(withBorder);
              this.canTry$.next(withBorder);
              break;
            }
            case MessageType.FinalRound:
              this.players$.next(
                this.players$.getValue().map((item, i) => ({
                  ...item,
                  inFinal: args[i + 1] === '+',
                })),
              );
              break;
            case MessageType.Stage: {
              const stage = args[1] as GameStage;
              this.gameStage$.next(stage);
              this.clearInfoState();
              switch (stage) {
                case GameStage.Before:
                case GameStage.After:
                  this.showMode$.next(GameShowMode.Logo);
                  break;
              }
              break;
            }
            case MessageType.Out:
              this.roundThemes$.next(
                this.roundThemes$.getValue().filter(({ originalIndex }) => originalIndex !== +args[1]),
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
