import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { createModalHook } from '@core/helpers/create-modal-hook.helper';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import { AvatarState } from '@pages/game/components/player-avatar/player-avatar.types';
import { UserItem } from '../../../user-item';
import * as Styled from './select-modal.styles';
import { SelectModalProps } from './select-modal.types';

const SelectModal: FC<SelectModalProps> = ({ close, selectable }) => {
  const [{ players$, selectCat }] = useGameController();
  const [t] = useTranslation();
  const players = useSubscription(players$, []);

  const selectUser = (index: number) => () => {
    selectCat(index);
    close();
  };

  return (
    <Styled.Container behavior="padding">
      <Styled.UsersList
        data={players}
        ListHeaderComponent={
          <Styled.Header>
            <Styled.Title numberOfLines={1}>{t('game.selectPlayer')}</Styled.Title>
            <TouchableOpacity onPress={close}>
              <Styled.CloseText>✕</Styled.CloseText>
            </TouchableOpacity>
          </Styled.Header>
        }
        keyExtractor={({ name }) => name}
        renderItem={({ item: { name, avatar, sum, isConnected }, index }) => (
          <TouchableOpacity disabled={!selectable[index]} onPress={selectUser(index)}>
            <UserItem
              isConnected={isConnected}
              name={name}
              avatar={avatar}
              sum={sum}
              avatarState={selectable[index] ? AvatarState.Selectable : AvatarState.Default}
            />
          </TouchableOpacity>
        )}
      />
    </Styled.Container>
  );
};

const useSelectModal = createModalHook<SelectModalProps>((props) => () => <SelectModal {...props} />, {
  statusBarTranslucent: true,
});

export default useSelectModal;
