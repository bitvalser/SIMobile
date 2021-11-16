import { FC, useEffect } from 'react';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import { PlayerEvents } from '@core/constants/player-events.constants';
import useAnswerModal from './components/answer-modal/answer-modal.component';
import { useSelectModal } from './components/select-modal';
import useStakeModal from './components/stake-modal/stake-modal.component';
import { StakeMessageType } from '@core/constants/stake-message-type.constants';
import useAppealModal from './components/appeal-modal/appeal-modal.component';

const PlayerEventsComponent: FC = () => {
  const [{ playerAction$, selectCatCost, sendStake, sendFinalStake, sendPlayerRight }] = useGameController();
  const [showAnswerModal, hideAnswerModal] = useAnswerModal();
  const [showSelectModal, hideSelectModal] = useSelectModal();
  const [showStakeModal, hideStakeModal] = useStakeModal();
  const [showAppealModal, hideAppealModal] = useAppealModal();

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
          case PlayerEvents.Appeal:
            showAppealModal({
              answer: action.answer,
              rightAnswers: action.rightAnswers,
              name: action.name,
              onSelect: sendPlayerRight,
            });
            break;
        }
      } else {
        hideAnswerModal();
        hideSelectModal();
        hideStakeModal();
        hideAppealModal();
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [
    hideAnswerModal,
    hideAppealModal,
    hideSelectModal,
    hideStakeModal,
    playerAction$,
    selectCatCost,
    sendFinalStake,
    sendPlayerRight,
    sendStake,
    showAnswerModal,
    showAppealModal,
    showSelectModal,
    showStakeModal,
  ]);

  return null;
};

export default PlayerEventsComponent;
