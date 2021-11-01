import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AppButton } from '@core/components/button';
import { BackgroundContainer } from '@core/components/background-container';
import { useService } from '@core/hooks/use-service.hook';
import { SignalRClient } from '@core/services/signalr-client/signalr-client.service';
import { SignalEvent } from '@core/constants/signal-event.constants';
import { useNavigation } from '@react-navigation/core';
import { SignalRequest } from '@core/constants/signal-request.constants';
import * as Styled from './main-menu.styles';
import { AppRoutes } from '@navigators/root';

const MainMenu = () => {
  const [t] = useTranslation();
  const navigation = useNavigation();
  const { on, invoke } = useService(SignalRClient);

  useEffect(() => {
    on(SignalEvent.Say).subscribe(console.log);
    invoke(SignalRequest.GetGamesSlice, 0).subscribe(console.log);
  }, [on, invoke]);

  const handleEnterHub = () => {
    navigation.navigate(AppRoutes.Hub);
  };

  return (
    <BackgroundContainer>
      <Styled.Content>
        <AppButton onPress={handleEnterHub} text={t('hub.enterHub')} />
      </Styled.Content>
    </BackgroundContainer>
  );
};

export default MainMenu;
