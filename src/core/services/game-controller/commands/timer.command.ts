import { GameEventType } from '@core/constants/game-event-type.constants';
import { MessageType } from '@core/constants/message-type.constants';
import { TimerCommand } from '@core/constants/timer-command.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.Timer, function (this: GameController, args: string[]): void {
  const timerIndex = parseInt(args[1], 10);
  const timerCommand = args[2];
  const timerArgument = args.length > 3 ? +args[3] : 0;
  const timerPersonIndex = args.length > 4 ? +args[4] : null;

  const players = this.players$.getValue();

  this.emitEvent(GameEventType.Timer, {
    command: timerCommand as TimerCommand,
    index: timerIndex,
    playerName: players?.[timerPersonIndex]?.name,
    time: timerArgument,
  });

  switch (timerCommand) {
    case TimerCommand.Go:
      if (timerIndex === 2 && timerPersonIndex >= 0 && timerPersonIndex < players.length) {
        this.emitEvent(GameEventType.UserAction, {
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
});
