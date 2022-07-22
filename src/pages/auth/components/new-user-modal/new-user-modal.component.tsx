import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import defaultAvatarImage from '@assets/images/player-m-avatar.png';
import { AppButton } from '@core/components/button';
import { Dialog } from '@core/components/dialog';
import { createModalHook } from '@core/helpers/create-modal-hook.helper';
import * as Styled from './new-user-modal.styles';
import { NewUserModalProps } from './new-user-modal.types';

const MAX_AVATAR_SIZE = 2000;
const MAX_NAME_LENGTH = 100;

const NewUserModal: FC<NewUserModalProps> = ({ close, onAdd }) => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [t] = useTranslation();

  const handleAvatarChange = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 0.3,
        maxWidth: MAX_AVATAR_SIZE,
        maxHeight: MAX_AVATAR_SIZE,
      },
      (data) => {
        if (data?.assets?.length > 0) {
          setAvatar(data.assets[0].uri);
        }
      },
    );
  };

  const handleAdd = () => {
    if (name) {
      close();
      onAdd({ name: name.substring(0, MAX_NAME_LENGTH), avatar });
    }
  };

  return (
    <Dialog onClose={close} title={t('auth.newUserTitle')}>
      <Styled.Content>
        <Styled.UserContainer>
          <TouchableOpacity onPress={handleAvatarChange}>
            <Styled.Avatar source={avatar ? { uri: avatar } : defaultAvatarImage} />
          </TouchableOpacity>
          <Styled.Input onChangeText={setName} value={name} />
        </Styled.UserContainer>
      </Styled.Content>
      <Styled.Footer>
        <AppButton text={t('auth.addUser')} disabled={name.length < 1} onPress={handleAdd} />
      </Styled.Footer>
    </Dialog>
  );
};

const useNewUserModal = createModalHook<NewUserModalProps>((props) => () => <NewUserModal {...props} />);

export default useNewUserModal;
