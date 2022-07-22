import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppButton } from '@core/components/button';
import { Dialog } from '@core/components/dialog';
import { createModalHook } from '@core/helpers/create-modal-hook.helper';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import { ModalOptions } from '@core/services/modals/modals.types';
import { PlayerTimer } from '@pages/game/components/player-timer';
import * as Styled from './answer-modal.styles';

const AnswerModal: FC<ModalOptions> = ({ close }) => {
  const [t] = useTranslation();
  const [{ currentPlayer$, sendAnswer }] = useGameController();
  const currentPlayer = useSubscription(currentPlayer$);
  const [answer, setAnswer] = useState('');

  const handleAnswer = () => {
    sendAnswer(answer);
    close();
  };

  return (
    <Dialog onClose={close} title={t('game.yourAnswer')}>
      <Styled.TimerWrapper>{currentPlayer?.name && <PlayerTimer name={currentPlayer.name} />}</Styled.TimerWrapper>
      <Styled.Input onChangeText={setAnswer} />
      <AppButton text={t('game.send')} onPress={handleAnswer} />
    </Dialog>
  );
};

const useAnswerModal = createModalHook<ModalOptions>((props) => () => <AnswerModal {...props} />);

export default useAnswerModal;
