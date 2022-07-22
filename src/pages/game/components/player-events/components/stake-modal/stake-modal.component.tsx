import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppButton } from '@core/components/button';
import { Dialog } from '@core/components/dialog';
import { createModalHook } from '@core/helpers/create-modal-hook.helper';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import { PlayerTimer } from '@pages/game/components/player-timer';
import * as Styled from './stake-modal.styles';
import { StakeModalProps } from './stake-modal.types';

const StakeModal: FC<StakeModalProps> = ({
  close,
  max,
  min,
  step = 1,
  allIn = false,
  pass = false,
  stake = false,
  nominal = false,
  onAllIn,
  onNominal,
  onSelect,
  onPass,
}) => {
  const [{ currentPlayer$ }] = useGameController();
  const [t] = useTranslation();
  const currentPlayer = useSubscription(currentPlayer$);
  const [sum, setSum] = useState<number>(min);

  const handleInputChange = (value: string) => {
    setSum(+value.replace(/[^0-9]/g, ''));
  };

  const handleBlurInput = () => {
    setSum(getCorrectValue());
  };

  const getCorrectValue = () => {
    if (sum > max) {
      return max;
    } else if (sum < min) {
      return min;
    } else {
      return Math.floor(sum / step) * step;
    }
  };

  const handleSliderChange = (value: number[] | number) => {
    setSum(value[0]);
  };

  const handleStake = () => {
    onSelect(getCorrectValue());
    close();
  };

  const handleNominal = () => {
    onNominal();
    close();
  };

  const handleAllIn = () => {
    onAllIn();
    close();
  };

  const handlePass = () => {
    onPass();
    close();
  };

  return (
    <Dialog title={t('game.yourStake')} onClose={close}>
      <Styled.TimerWrapper>{currentPlayer?.name && <PlayerTimer name={currentPlayer.name} />}</Styled.TimerWrapper>
      <Styled.Content>
        <Styled.SumSlider
          minimumValue={min}
          maximumValue={max}
          animationType="timing"
          step={step}
          value={sum}
          onValueChange={handleSliderChange}
        />
        <Styled.Input
          editable={stake}
          value={sum.toString()}
          onBlur={handleBlurInput}
          onChangeText={handleInputChange}
        />
      </Styled.Content>
      <AppButton text={t('game.stake')} onPress={handleStake} />
      {nominal && <AppButton text={t('game.nominal')} onPress={handleNominal} />}
      {pass && onPass && <AppButton text={t('game.pass')} onPress={handlePass} />}
      {allIn && <AppButton text={t('game.allIn')} onPress={handleAllIn} />}
    </Dialog>
  );
};

const useStakeModal = createModalHook<StakeModalProps>((props) => () => <StakeModal {...props} />);

export default useStakeModal;
