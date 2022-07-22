import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppButton } from '@core/components/button';
import { Dialog } from '@core/components/dialog';
import { ToastsContainer } from '@core/components/toasts-container';
import { GameRole } from '@core/constants/game-role.constants';
import { createModalHook } from '@core/helpers/create-modal-hook.helper';
import { useService } from '@core/hooks/use-service.hook';
import { GamesService } from '@core/services/games/games-service.service';
import { ToastsService } from '@core/services/toasts/toasts.service';
import * as Styled from './join-modal.styles';
import { JoinModalProps } from './join-modal.types';

const JOIN_SUCCESS_CODE = 0;
const TOASTS_CONTAINER = 'join-modal';

const JoinModal: FC<JoinModalProps> = ({ close, gameId, onJoin, name, withMaster, withPassword, canJoinPlayer }) => {
  const [t] = useTranslation();
  const { joinGame, createGameController } = useService(GamesService);
  const { showToast } = useService(ToastsService);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  const handleJoin = (role: GameRole) => () => {
    setLoading(true);
    joinGame(gameId, role, password).subscribe(({ code, errorMessage }) => {
      setLoading(false);
      if (code === JOIN_SUCCESS_CODE) {
        createGameController();
        onJoin();
        close();
      } else {
        showToast({
          type: 'danger',
          text: errorMessage,
          container: TOASTS_CONTAINER,
        });
      }
    });
  };

  const disableInput = (withPassword && !password) || loading;

  return (
    <>
      <ToastsContainer container={TOASTS_CONTAINER} />
      <Dialog onClose={close} title={name}>
        <Styled.Content>
          {withPassword && (
            <>
              <Styled.PasswordText>{t('hub.password')}</Styled.PasswordText>
              <Styled.Input onChangeText={setPassword} placeholder={t('hub.passwordPlaceholder')} />
            </>
          )}
        </Styled.Content>

        <Styled.Footer>
          {canJoinPlayer && (
            <AppButton disabled={disableInput} text={t('hub.enterPlayer')} onPress={handleJoin(GameRole.Player)} />
          )}
          {withMaster && (
            <AppButton disabled={disableInput} text={t('hub.enterMaster')} onPress={handleJoin(GameRole.Master)} />
          )}
          <AppButton text={t('hub.enterSpectator')} disabled={disableInput} onPress={handleJoin(GameRole.Spectator)} />
        </Styled.Footer>
      </Dialog>
    </>
  );
};

const useJoinModal = createModalHook<JoinModalProps>((props) => () => <JoinModal {...props} />);

export default useJoinModal;
