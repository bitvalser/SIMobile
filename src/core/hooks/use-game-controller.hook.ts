import { useCallback } from 'react';
import { IGameController } from '@core/services/game-controller/game-controller.types';
import { GamesService } from '@core/services/games/games-service.service';
import { useService } from './use-service.hook';

export const useGameController = (): [IGameController, () => void] => {
  const { getCurrentGameController, removeGameController } = useService(GamesService);

  const removeController = useCallback(() => {
    getCurrentGameController().leave();
    removeGameController();
  }, [removeGameController, getCurrentGameController]);

  return [getCurrentGameController(), removeController];
};
