import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { createModalHook } from '@core/helpers/create-modal-hook.helper';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import { useTranslation } from 'react-i18next';
import { UserItem } from '../user-item';
import * as Styled from './users-modal.styles';
import { UsersModalProps } from './users-modal.types';

const UsersModal: FC<UsersModalProps> = ({ close }) => {
  const [{ players$ }] = useGameController();
  const players = useSubscription(players$, []);
  const [t] = useTranslation();

  return (
    <Styled.Container behavior="padding">
      <Styled.UsersList
        data={players}
        ListHeaderComponent={
          <Styled.Header>
            <Styled.Title numberOfLines={1}>{t('game.players')}</Styled.Title>
            <TouchableOpacity onPress={close}>
              <Styled.CloseText>✕</Styled.CloseText>
            </TouchableOpacity>
          </Styled.Header>
        }
        renderItem={({ item: { name, avatar, sum, isConnected } }) => (
          <UserItem isConnected={isConnected} name={name} avatar={avatar} sum={sum} />
        )}
      />
    </Styled.Container>
  );
};

const useUsersModal = createModalHook<UsersModalProps>((props) => () => <UsersModal {...props} />, {
  statusBarTranslucent: true,
});

export default useUsersModal;
