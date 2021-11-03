import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppButton } from '@core/components/button';
import { useService } from '@core/hooks/use-service.hook';
import * as Styled from './auth.styles';
import { BackgroundContainer } from '@core/components/background-container';
import { SiApiClient } from '@core/services/si-api-client/si-api-client.service';
import { SignalRClient } from '@core/services/signalr-client/signalr-client.service';
import { finalize, switchMap } from 'rxjs/operators';
import { useNavigation } from '@react-navigation/core';
import { AppRoutes } from '@navigators/root';
import { Alert } from 'react-native';

const Auth = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [t] = useTranslation();
  const { getSupportedServers, login } = useService(SiApiClient);
  const { connect } = useService(SignalRClient);

  const handleLogin = () => {
    setLoading(true);
    getSupportedServers()
      .pipe(
        switchMap(() => login(name)),
        switchMap(() => connect()),
        finalize(() => setLoading(false)),
      )
      .subscribe(
        () => {
          navigation.reset({
            index: 0,
            routes: [{ name: AppRoutes.MainMenu }],
          });
        },
        (error) => {
          Alert.alert(t('error'), error.message);
        },
      );
  };

  return (
    <BackgroundContainer>
      <Styled.ModalContainer>
        <Styled.ModalContent>
          <Styled.Title>{t('title')}</Styled.Title>
          <Styled.YourNameText>{t('auth.yourName')}</Styled.YourNameText>
          <Styled.Input onChangeText={setName} placeholder={t('auth.yourNamePlaceholder')} />
        </Styled.ModalContent>
        <AppButton
          onPress={handleLogin}
          text={t('auth.login')}
          loading={loading}
          disabled={name.length <= 1}
        />
      </Styled.ModalContainer>
    </BackgroundContainer>
  );
};

export default Auth;
