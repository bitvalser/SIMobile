import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { merge } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { GameRole } from '@core/constants/game-role.constants';
import { GameStage } from '@core/constants/game-stage.constants';
import { createModalHook } from '@core/helpers/create-modal-hook.helper';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import { UserItem } from '../user-item';
import * as Styled from './users-modal.styles';
import { UsersModalProps } from './users-modal.types';

const UsersModal: FC<UsersModalProps> = ({ close }) => {
  const [{ players$, gameStage$, gameMaster$, spectators$ }] = useGameController();
  const [t] = useTranslation();
  const users = useSubscription(
    merge(players$, gameMaster$, spectators$).pipe(
      withLatestFrom(gameMaster$),
      withLatestFrom(players$),
      withLatestFrom(spectators$),
      map(([[[, master], players], spectators]) => [
        {
          title: t('game.master'),
          data: [
            {
              ...master,
              role: GameRole.Master,
            },
          ],
        },
        {
          title: t('game.players'),
          data: players.map((item) => ({
            ...item,
            role: GameRole.Player,
          })),
        },
        {
          title: t('game.spectators'),
          data: spectators.map((item) => ({
            ...item,
            role: GameRole.Spectator,
          })),
        },
      ]),
    ),
    [],
  );
  const gameStage = useSubscription(gameStage$);

  return (
    <Styled.Container behavior="padding">
      <Styled.UsersList
        sections={users}
        stickySectionHeadersEnabled
        ListHeaderComponent={
          <Styled.Header>
            <Styled.Title numberOfLines={1}>{t('game.participants')}</Styled.Title>
            <TouchableOpacity onPress={close}>
              <Styled.CloseText>✕</Styled.CloseText>
            </TouchableOpacity>
          </Styled.Header>
        }
        renderSectionHeader={({ section: { title } }) => (
          <Styled.Header>
            <Styled.Title numberOfLines={1}>{title}</Styled.Title>
          </Styled.Header>
        )}
        keyExtractor={({ name }) => name}
        renderItem={({ item: { name, avatar, sum, isConnected, inFinal, isReady, role } }) => (
          <UserItem
            isConnected={isConnected}
            name={name}
            avatar={avatar}
            sum={sum}
            hide={gameStage === GameStage.Final && !inFinal && role === GameRole.Player}
            showAvatar={role !== GameRole.Spectator}
            showSum={role === GameRole.Player && gameStage !== GameStage.Before}
            showReady={gameStage === GameStage.Before && isReady}
          />
        )}
      />
    </Styled.Container>
  );
};

const useUsersModal = createModalHook<UsersModalProps>((props) => () => <UsersModal {...props} />, {
  statusBarTranslucent: true,
});

export default useUsersModal;
