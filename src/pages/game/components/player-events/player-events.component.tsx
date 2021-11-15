import { FC, useEffect } from 'react';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import { PlayerEvents } from '@core/constants/player-events.constants';
import useAnswerModal from './components/answer-modal/answer-modal.component';
import { useSelectModal } from './components/select-modal';
import useStakeModal from './components/stake-modal/stake-modal.component';
import { StakeMessageType } from '@core/constants/stake-message-type.constants';

const PlayerEventsComponent: FC = () => {
  const [{ playerAction$, selectCatCost, sendStake, sendFinalStake }] = useGameController();
  const [showAnswerModal, hideAnswerModal] = useAnswerModal();
  const [showSelectModal, hideSelectModal] = useSelectModal();
  const [showStakeModal, hideStakeModal] = useStakeModal();

  useEffect(() => {
    const subscription = playerAction$.subscribe((action) => {
      if (action) {
        switch (action.event) {
          case PlayerEvents.Answer:
            showAnswerModal();
            break;
          case PlayerEvents.Cat:
            showSelectModal({
              selectable: action.players,
            });
            break;
          case PlayerEvents.CatCost:
            showStakeModal({
              min: action.min,
              max: action.max,
              step: action.step,
              onSelect: selectCatCost,
            });
            break;
          case PlayerEvents.Stake:
            showStakeModal({
              min: action.min,
              max: action.max,
              step: 100,
              pass: action.pass,
              stake: action.stake,
              nominal: action.nominal,
              allIn: action.allIn,
              onPass: () => {
                sendStake(StakeMessageType.Pass);
              },
              onNominal: () => {
                sendStake(StakeMessageType.Nominal);
              },
              onAllIn: () => {
                sendStake(StakeMessageType.AllIn);
              },
              onSelect: (sum: number) => {
                sendStake(StakeMessageType.Stake, sum);
              },
            });
            break;
          case PlayerEvents.Final:
            showStakeModal({
              min: 1,
              stake: true,
              max: action.max,
              onSelect: sendFinalStake,
            });
            break;
        }
      } else {
        hideAnswerModal();
        hideSelectModal();
        hideStakeModal();
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [
    hideAnswerModal,
    hideSelectModal,
    hideStakeModal,
    playerAction$,
    selectCatCost,
    sendFinalStake,
    sendStake,
    showAnswerModal,
    showSelectModal,
    showStakeModal,
  ]);

  return null;
};

export default PlayerEventsComponent;
