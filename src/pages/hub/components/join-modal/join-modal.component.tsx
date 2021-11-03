import React, { FC, useState } from 'react';
import { Alert } from 'react-native';
import { finalize } from 'rxjs/operators';
import { createModalHook } from '@core/helpers/create-modal-hook.helper';
import { JoinModalProps } from './join-modal.types';
import * as Styled from './join-modal.styles';
import { Dialog } from '@core/components/dialog';
import { useTranslation } from 'react-i18next';
import { AppButton } from '@core/components/button';
import { GameRole } from '@core/constants/game-role.constants';
import { useService } from '@core/hooks/use-service.hook';
import { GamesService } from '@core/services/games/games-service.service';

const JOIN_SUCCESS_CODE = 0;

const JoinModal: FC<JoinModalProps> = ({ close, gameId, onJoin, name, withMaster, withPassword }) => {
  const [t] = useTranslation();
  const { joinGame } = useService(GamesService);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  const handleJoin = (role: GameRole) => () => {
    setLoading(true);
    joinGame(gameId, role, password)
      .pipe(finalize(() => setLoading(false)))
      .subscribe(({ code, errorMessage }) => {
        if (code === JOIN_SUCCESS_CODE) {
          onJoin();
          close();
        } else {
          Alert.alert(errorMessage);
        }
      });
  };

  const disableInput = withPassword && !password;

  return (
    <Dialog onClose={close} title={name}>
      <Styled.Content>
        {withPassword && (
          <>
            <Styled.PasswordText>{t('hub.password')}</Styled.PasswordText>
            <Styled.Input onChangeText={setPassword} placeholder={t('hub.passwordPlaceholder')} />
          </>
        )}
      </Styled.Content>
      {!loading && (
        <Styled.Footer>
          <AppButton disabled={disableInput} text={t('hub.enterPlayer')} onPress={handleJoin(GameRole.Player)} />
          {withMaster && <AppButton disabled text={t('hub.enterMaster')} onPress={handleJoin(GameRole.Master)} />}
          <AppButton text={t('hub.enterSpectator')} disabled={disableInput} onPress={handleJoin(GameRole.Spectator)} />
        </Styled.Footer>
      )}
    </Dialog>
  );
};

const useJoinModal = createModalHook<JoinModalProps>((props) => () => <JoinModal {...props} />);

export default useJoinModal;
