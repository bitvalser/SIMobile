import { MessageType } from '@core/constants/message-type.constants';
import { GameUser } from '@core/interfaces/game-user.interface';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.Info2, function (this: GameController, args: string[]): void {
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
});
