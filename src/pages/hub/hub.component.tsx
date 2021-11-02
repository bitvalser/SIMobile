import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { BackgroundContainer } from '@core/components/background-container';
import { useService } from '@core/hooks/use-service.hook';
import { GamesService } from '@core/services/games-service/games-service.service';
import useSubscription from '@core/hooks/use-subscription.hook';
import { useNavigation } from '@react-navigation/core';
import { GameRole } from '@core/constants/game-role.constants';
import { map } from 'rxjs/operators';
import { GameItem } from './components/game-item';
import * as Styled from './hub.styles';
import { AppRoutes } from '@navigators/root';
import { useTranslation } from 'react-i18next';
import { Observable } from 'rxjs';

const Hub = () => {
  const {
    gamesState$,
    getAllGames,
    onGamesChanged,
    onGamesCreated,
    onGamesDeleted,
  } = useService(GamesService);
  const navigation = useNavigation();
  const [t] = useTranslation();
  const games = useSubscription(
    gamesState$.pipe(map((data) => Object.values(data))),
    [],
  );

  useEffect(() => {
    getAllGames().subscribe();
    const subscriptions = [
      onGamesChanged(),
      onGamesCreated(),
      onGamesDeleted(),
    ].map((handler: Observable<any>) => handler.subscribe());
    return () => {
      subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    };
  }, [getAllGames, onGamesChanged, onGamesDeleted, onGamesCreated]);

  const onSelectGame = (id: number) => () => {
    navigation.navigate(AppRoutes.Game, { gameId: id });
  };

  return (
    <BackgroundContainer>
      <Styled.GameList
        data={games}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        initialNumToRender={5}
        ListHeaderComponent={
          <Styled.Header>
            <Styled.GamesText>
              {t('hub.games')} ({games.length})
            </Styled.GamesText>
          </Styled.Header>
        }
        maxToRenderPerBatch={4}
        updateCellsBatchingPeriod={100}
        windowSize={8}
        keyExtractor={({ gameID }) => gameID.toString()}
        renderItem={({ item }) => {
          const {
            gameName,
            persons,
            stage,
            stageName,
            startTime,
            passwordRequired,
            gameID,
          } = item;
          const players = persons.filter(
            ({ role }) => role === GameRole.Player,
          );
          const onlinePlayers = players.filter(({ isOnline }) => isOnline);
          const leadPlayer = persons.find(
            ({ role }) => role === GameRole.Master,
          );

          return (
            <TouchableOpacity onPress={onSelectGame(gameID)}>
              <GameItem
                title={gameName}
                maxPlayers={players.length}
                players={onlinePlayers.length}
                withLead={leadPlayer.isOnline}
                stage={stage}
                stageName={stageName}
                startTime={startTime}
                withPassword={passwordRequired}
              />
            </TouchableOpacity>
          );
        }}
      />
    </BackgroundContainer>
  );
};

export default Hub;
