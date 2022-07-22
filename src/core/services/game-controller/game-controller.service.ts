import { i18n } from 'i18next';
import 'react-native-get-random-values';
import { BehaviorSubject, Observable, ReplaySubject, Subject, Subscription } from 'rxjs';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { GameEventType } from '@core/constants/game-event-type.constants';
import { GameShowMode } from '@core/constants/game-show-mode.constants';
import { GameStage } from '@core/constants/game-stage.constants';
import { MessageType } from '@core/constants/message-type.constants';
import { QuestionType } from '@core/constants/question-type.constants';
import { SendMessageType } from '@core/constants/send-message-type.constants';
import { SignalEvent } from '@core/constants/signal-event.constants';
import { SignalRequest } from '@core/constants/signal-request.constants';
import { StakeMessageType } from '@core/constants/stake-message-type.constants';
import { ChatMessage } from '@core/interfaces/chat-message.interface';
import { GameAnswer } from '@core/interfaces/game-answer.interface';
import { GameAtom } from '@core/interfaces/game-atom.interface';
import { GamePlayer } from '@core/interfaces/game-player.interface';
import { GameUser } from '@core/interfaces/game-user.interface';
import { RoundTheme } from '@core/interfaces/round-theme.interface';
import { AvatarState } from '@pages/game/components/player-avatar/player-avatar.types';
import { IAssetsService } from '../assets/assets.types';
import { IAuthService } from '../auth/auth.types';
import { ILogsService } from '../logs/logs.types';
import { IAppSettingsService } from '../settings/settings.types';
import { ISiApiClient } from '../si-api-client/si-api-client.types';
import { ISignalRClient } from '../signalr-client/signalr-client.types';
import { ISoundsService } from '../sounds/sounds.types';
import { IToastsService } from '../toasts/toasts.types';
import './commands';
import { GameCommands } from './game-commands.class';
import { GameControllerEventMap, GameMessage, IGameController, LastAnswer } from './game-controller.types';

export class GameController implements IGameController {
  protected subscriptions: Subscription[] = [];
  protected eventChannel$: Subject<{
    type: GameEventType;
    data: any;
  }> = new Subject();
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
  public showTimerBorder$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public timerMaxTime$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public yourQuestionChoice$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public lastAnswer$: BehaviorSubject<LastAnswer> = new BehaviorSubject<LastAnswer>(null);
  public userAvatarState$: ReplaySubject<{ name: string; state: AvatarState }> = new ReplaySubject(12);
  public currentPlayer$: Observable<GamePlayer> = this.players$.pipe(
    withLatestFrom(this.siApiClient.userName$),
    map(([data, userName]) => data.find(({ name }) => name === userName)),
  );
  public playerMaster$: Observable<GamePlayer> = this.gameMaster$.pipe(
    withLatestFrom(this.siApiClient.userName$),
    map(([data, userName]) => (data.name === userName ? data : null)),
  );
  public currentPlayerIndex$: Observable<number> = this.players$.pipe(
    withLatestFrom(this.siApiClient.userName$),
    map(([data, userName]) => data.findIndex(({ name }) => name === userName)),
  );

  public constructor(
    protected signalR: ISignalRClient,
    protected siApiClient: ISiApiClient,
    protected toastsService: IToastsService,
    protected translation: i18n,
    protected soundsService: ISoundsService,
    protected logsService: ILogsService,
    protected authService: IAuthService,
    protected appSettingsService: IAppSettingsService,
    protected assetsService: IAssetsService,
    protected publicUrl: string,
  ) {
    this.start = this.start.bind(this);
    this.leave = this.leave.bind(this);
    this.sendChatMessage = this.sendChatMessage.bind(this);
    this.choiceQuestion = this.choiceQuestion.bind(this);
    this.removeTheme = this.removeTheme.bind(this);
    this.sendAnswer = this.sendAnswer.bind(this);
    this.tryAnswer = this.tryAnswer.bind(this);
    this.sendStake = this.sendStake.bind(this);
    this.sendFinalStake = this.sendFinalStake.bind(this);
    this.selectCatCost = this.selectCatCost.bind(this);
    this.selectCat = this.selectCat.bind(this);
    this.mediaEnd = this.mediaEnd.bind(this);
    this.ready = this.ready.bind(this);
    this.listen = this.listen.bind(this);
    this.emitEvent = this.emitEvent.bind(this);
    this.sendPlayerRight = this.sendPlayerRight.bind(this);
  }

  protected emitEvent<K extends keyof GameControllerEventMap>(type: K, data: GameControllerEventMap[K]['data']): void {
    this.eventChannel$.next({ type, data });
  }

  protected sendSystemMessage<T = any>(...messages: string[]): Observable<T> {
    return this.signalR.invoke(SignalRequest.SendMessage, {
      Text: messages.join('\n'),
      IsSystem: true,
      Receiver: '@',
    });
  }

  protected addChatMessage(message: string, user: string = null): void {
    this.chatMessages$.next([
      ...this.chatMessages$.getValue(),
      {
        id: uuidv4(),
        text: message,
        user: user,
      },
    ]);
  }

  protected clearInfoState(): void {
    this.questionType$.next(null);
    this.atom$.next(null);
    this.rightAnswer$.next(null);
    this.emitEvent(GameEventType.UserReplic, null);
    this.showTimerBorder$.next(false);
  }

  public choiceQuestion(theme: number, question: number): void {
    this.yourQuestionChoice$.next(false);
    this.sendSystemMessage(SendMessageType.Choice, theme.toString(), question.toString());
  }

  public removeTheme(theme: number): void {
    this.sendSystemMessage(SendMessageType.Delete, theme.toString());
  }

  public sendPlayerRight(right: boolean): void {
    this.sendSystemMessage(SendMessageType.IsRight, right ? '+' : '-');
  }

  public sendAnswer(answer: string): void {
    this.sendSystemMessage(SendMessageType.Answer, answer);
  }

  public tryAnswer(): void {
    this.sendSystemMessage(SendMessageType.Try);
  }

  public sendStake(type: StakeMessageType, stake?: number): void {
    this.sendSystemMessage(SendMessageType.Stake, type.toString(), stake?.toString());
  }

  public sendFinalStake(stake?: number): void {
    this.sendSystemMessage(SendMessageType.FinalStake, stake.toString());
  }

  public selectCat(index: number): void {
    this.sendSystemMessage(SendMessageType.Cat, index.toString());
  }

  public selectCatCost(sum: number): void {
    this.sendSystemMessage(SendMessageType.CatCost, sum.toString());
  }

  public mediaEnd(): void {
    this.sendSystemMessage(SendMessageType.Atom);
  }

  public ready(value: boolean): void {
    this.sendSystemMessage(SendMessageType.Ready, value ? '+' : '-');
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
    const avatar = this.authService.avatar$.getValue();
    if (avatar) {
      this.sendSystemMessage(SendMessageType.Picture, avatar);
    }
    this.sendSystemMessage(SendMessageType.Info);
    this.subscriptions.push(
      this.signalR.on<[GameMessage]>(SignalEvent.Receive).subscribe(([{ isSystem, sender, text }]) => {
        if (isSystem) {
          const args = text.split('\n');
          const type = args[0] as MessageType;
          this.logsService.log(args.join('\t'));
          try {
            GameCommands.run.call(this, type, args);
          } catch (error: any) {
            this.toastsService.showToast({
              type: 'danger',
              text: error?.message || this.translation.t('errors.unknownError'),
            });
          }
        } else {
          this.addChatMessage(text, sender);
        }
      }),
    );
    return this;
  }

  public createStringSnapshot(): string {
    return JSON.stringify({
      chatMessages: this.chatMessages$.getValue(),
      roundThemes: this.roundThemes$.getValue(),
      gameMaster: this.gameMaster$.getValue(),
      players: this.players$.getValue(),
      spectators: this.spectators$.getValue(),
      gameThemes: this.gameThemes$.getValue(),
      showMode: this.showMode$.getValue(),
      questionType: this.questionType$.getValue(),
      atom: this.atom$.getValue(),
      rightAnswer: this.rightAnswer$.getValue(),
      gameStage: this.gameStage$.getValue(),
      gameReplic: this.gameReplic$.getValue(),
      showTimerBorder: this.showTimerBorder$.getValue(),
      timerMaxTime: this.timerMaxTime$.getValue(),
      userName: this.siApiClient.userName$.getValue(),
    });
  }

  public leave(): void {
    if (this.subscriptions.length > 0) {
      this.signalR.invoke(SignalRequest.LeaveGame);
      this.subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
    this.assetsService.clear();
  }

  public listen<K extends keyof GameControllerEventMap>(type: K): Observable<GameControllerEventMap[K]> {
    return this.eventChannel$.pipe(
      filter((event) => event.type === type),
      map((event): GameControllerEventMap[K] => ({
        data: event.data,
      })),
    );
  }
}
