import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppButton } from '@core/components/button';
import { useService } from '@core/hooks/use-service.hook';
import defaultAvatarImage from '@assets/images/player-m-avatar.png';
import * as Styled from './auth.styles';
import { BackgroundContainer } from '@core/components/background-container';
import { SiApiClient } from '@core/services/si-api-client/si-api-client.service';
import { SignalRClient } from '@core/services/signalr-client/signalr-client.service';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { useNavigation } from '@react-navigation/core';
import { AppRoutes } from '@navigators/root';
import { Alert, TouchableOpacity } from 'react-native';
import { AuthUser } from '@core/services/auth/auth.types';
import useNewUserModal from './components/new-user-modal/new-user-modal.component';
import { AuthService } from '@core/services/auth/auth.service';
import { FlatList } from 'react-native-gesture-handler';
import useSubscription from '@core/hooks/use-subscription.hook';
import { AppIcon } from '@core/components/icon';
import { GamesService } from '@core/services/games/games-service.service';
import useInfoModal from '@core/components/info-modal/info-modal.component';

const Auth = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [t] = useTranslation();
  const [showAddUser] = useNewUserModal();
  const [showLicenseInfo] = useInfoModal();
  const { getSupportedServers, login, uploadAvatar } = useService(SiApiClient);
  const { getHostInfo, packagePublicUrl$ } = useService(GamesService);
  const { userName$, avatar$, users$, addUser, removeUser } = useService(AuthService);
  const { connect } = useService(SignalRClient);
  const users = useSubscription(users$, []);

  const handleLogin = (user: AuthUser) => () => {
    showLicenseInfo({
      title: t('userGeneratedContent.title'),
      text: t('userGeneratedContent.text'),
      onConfirm: () => {
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
      },
    });
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
