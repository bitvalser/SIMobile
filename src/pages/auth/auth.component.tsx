import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MMKVStorage from 'react-native-mmkv-storage';
import { finalize, switchMap, tap } from 'rxjs/operators';
import defaultAvatarImage from '@assets/images/player-m-avatar.png';
import { BackgroundContainer } from '@core/components/background-container';
import { AppButton } from '@core/components/button';
import { AppIcon } from '@core/components/icon';
import useInfoModal from '@core/components/info-modal/info-modal.component';
import { StorageKeys } from '@core/constants/storage-keys.constants';
import { useInjectable } from '@core/hooks/use-injectable.hook';
import { useService } from '@core/hooks/use-service.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import { AuthService } from '@core/services/auth/auth.service';
import { AuthUser } from '@core/services/auth/auth.types';
import { GamesService } from '@core/services/games/games-service.service';
import { SiApiClient } from '@core/services/si-api-client/si-api-client.service';
import { SignalRClient } from '@core/services/signalr-client/signalr-client.service';
import { TYPES } from '@core/services/types';
import { AppRoutes } from '@navigators/root';
import { useNavigation } from '@react-navigation/core';
import * as Styled from './auth.styles';
import useNewUserModal from './components/new-user-modal/new-user-modal.component';

const Auth = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [t] = useTranslation();
  const [showAddUser] = useNewUserModal();
  const [showLicenseInfo] = useInfoModal();
  const { getSupportedServers, login, uploadAvatar } = useService(SiApiClient);
  const storage = useInjectable<MMKVStorage.API>(TYPES.Storage);
  const { getHostInfo, packagePublicUrl$ } = useService(GamesService);
  const { userName$, avatar$, users$, addUser, removeUser } = useService(AuthService);
  const { connect } = useService(SignalRClient);
  const users = useSubscription(users$, []);

  const loginUser = (user: AuthUser) => {
    setLoading(true);
    getSupportedServers()
      .pipe(
        switchMap(() => login(user.name)),
        switchMap(() => connect()),
        switchMap(() => getHostInfo()),
        tap(() => {
          userName$.next(user.name);
        }),
      )
      .subscribe(
        () => {
          if (user.avatar) {
            uploadAvatar(user.avatar)
              .pipe(
                finalize(() => {
                  setLoading(false);
                  navigation.reset({
                    index: 0,
                    routes: [{ name: AppRoutes.MainMenu }],
                  });
                }),
              )
              .subscribe({
                next: (avatarUrl) => {
                  avatar$.next(`${packagePublicUrl$.getValue()}${avatarUrl}`);
                },
                error: () => {},
              });
          } else {
            setLoading(false);
            avatar$.next(null);
            navigation.reset({
              index: 0,
              routes: [{ name: AppRoutes.MainMenu }],
            });
          }
        },
        (error) => {
          Alert.alert(t('error'), error.message);
        },
      );
  };

  const handleLogin = (user: AuthUser) => () => {
    const hasRead = storage.getBool(StorageKeys.ContentAgreement);
    if (!hasRead) {
      showLicenseInfo({
        title: t('userGeneratedContent.title'),
        text: t('userGeneratedContent.text'),
        onConfirm: () => {
          storage.setBool(StorageKeys.ContentAgreement, true);
          loginUser(user);
        },
      });
    } else {
      loginUser(user);
    }
  };

  const handleAdd = () => {
    showAddUser({
      onAdd: addUser,
    });
  };

  const handleDelete = (user: AuthUser) => () => {
    removeUser(user.name);
  };

  return (
    <BackgroundContainer>
      <Styled.ModalContainer>
        <Styled.ModalContent>
          <FlatList
            data={users}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={handleLogin(item)} disabled={loading}>
                <Styled.UserItem>
                  <Styled.UserAvatar source={item.avatar ? { uri: item.avatar } : defaultAvatarImage} />
                  <Styled.UserName>{item.name}</Styled.UserName>
                  <Styled.Spacer />
                  <Styled.DeleteUser onPress={handleDelete(item)}>
                    <AppIcon name="close" size={24} color="primary" />
                  </Styled.DeleteUser>
                </Styled.UserItem>
              </TouchableOpacity>
            )}
            ListEmptyComponent={<Styled.NoUsers>{t('auth.noUsers')}</Styled.NoUsers>}
          />
        </Styled.ModalContent>
        <AppButton onPress={handleAdd} text={t('auth.addUser')} disabled={loading} loading={loading} />
      </Styled.ModalContainer>
    </BackgroundContainer>
  );
};

export default Auth;
