import { AtomType } from '@core/constants/atom-type.constants';
import { GameShowMode } from '@core/constants/game-show-mode.constants';
import { MessageType } from '@core/constants/message-type.constants';
import { GameCommands } from '../game-commands.class';
import { GameController } from '../game-controller.service';

GameCommands.defineCommand(MessageType.Atom, function (this: GameController, args: string[]): void {
  const atomType = args[1];
  switch (atomType) {
    case AtomType.Voice:
      this.atom$.next({
        type: atomType,
        data: this.soundsService.loadMusic(args[3].replace('<SERVERHOST>', this.publicUrl)),
      });
      break;
    case AtomType.Video:
    case AtomType.Image:
      this.atom$.next({
        type: atomType,
        data: args[3].replace('<SERVERHOST>', this.publicUrl),
      });
      break;
    case AtomType.Partial:
    case AtomType.Text:
      this.atom$.next({
        type: atomType,
        data: args.splice(2).join('\n'),
      });
      break;
  }
  this.showMode$.next(GameShowMode.Atom);
  this.userReplic$.next(null);
});
