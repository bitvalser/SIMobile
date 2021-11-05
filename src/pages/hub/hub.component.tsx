import React, { useEffect, useState, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BackgroundContainer } from '@core/components/background-container';
import { useService } from '@core/hooks/use-service.hook';
import { GamesService } from '@core/services/games/games-service.service';
import useSubscription from '@core/hooks/use-subscription.hook';
import { useNavigation } from '@react-navigation/core';
import { GameRole } from '@core/constants/game-role.constants';
import { GameItem } from './components/game-item';
import * as Styled from './hub.styles';
import { AppRoutes } from '@navigators/root';
import { useTranslation } from 'react-i18next';
import { useJoinModal } from './components/join-modal';
import { GameType } from '@core/constants/game-type.constants';

const Hub = () => {
  const { gamesState$, getAllGames, onGamesChanged, onGamesCreated, onGamesDeleted } = useService(GamesService);
  const navigation = useNavigation();
  const [showModal] = useJoinModal();
  const [t] = useTranslation();
  const [filters, setFilters] = useState({
    withoutPassword: false,
    classic: false,
    simple: false,
    new: false,
  });
  const [searchValue, setSearchValue] = useState('');
  const games = useSubscription(gamesState$.pipe(map((data) => Object.values(data))), []);

  const filteredGames = useMemo(
    () =>
      games.filter(
        ({ passwordRequired, mode, started, gameName }) =>
          (!filters.withoutPassword || !passwordRequired) &&
          (!filters.classic || mode === GameType.Classic) &&
          (!filters.simple || mode === GameType.Simple) &&
          (!filters.new || started) &&
          (!searchValue || gameName.toLowerCase().includes(searchValue.toLowerCase())),
      ),
    [games, filters, searchValue],
  );

  useEffect(() => {
    getAllGames().subscribe();
    const subscriptions = [onGamesChanged(), onGamesCreated(), onGamesDeleted()].map((handler: Observable<any>) =>
      handler.subscribe(),
    );
    return () => {
      subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    };
  }, [getAllGames, onGamesChanged, onGamesDeleted, onGamesCreated]);

  const handleFilterChange = (filer: string) => () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filer]: !prevFilters[filer],
    }));
  };

  const onSelectGame = (
    id: number,
    name: string,
    withPassword: boolean,
    withMaster: boolean,
    canJoinPlayer: boolean,
  ) => () => {
    showModal({
      gameId: id,
      name,
      withPassword,
      withMaster,
      canJoinPlayer,
      onJoin: () => {
        navigation.navigate(AppRoutes.Game, { gameId: id });
      },
    });
  };

  return (
    <BackgroundContainer>
      <Styled.GameList
        data={filteredGames}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews
        initialNumToRender={5}
        ListHeaderComponent={
          <Styled.Header>
            <Styled.FiltersRow>
              <Styled.GamesText>
                {t('hub.games')} ({filteredGames.length})
              </Styled.GamesText>
              <Styled.GameFilterChip
                onClick={handleFilterChange('simple')}
                selected={filters.classic}
                text={t('hub.filterSimple')}
              />
              <Styled.GameFilterChip
                onClick={handleFilterChange('classic')}
                selected={filters.simple}
                text={t('hub.filterClassic')}
              />
              <Styled.GameFilterChip
                onClick={handleFilterChange('new')}
                selected={filters.new}
                text={t('hub.filterNew')}
              />
              <Styled.GameFilterChip
                onClick={handleFilterChange('withoutPassword')}
                selected={filters.withoutPassword}
                text={t('hub.filterPassword')}
              />
            </Styled.FiltersRow>
            <Styled.SearchWrapper>
              <Styled.SearchInput onChangeText={setSearchValue} placeholder={t('hub.searchPlaceholder')} />
            </Styled.SearchWrapper>
          </Styled.Header>
        }
        maxToRenderPerBatch={4}
        updateCellsBatchingPeriod={100}
        windowSize={8}
        keyExtractor={({ gameID }) => gameID.toString()}
        renderItem={({ item }) => {
          const { gameName, persons, stage, stageName, startTime, passwordRequired, gameID } = item;
          const players = persons.filter(({ role }) => role === GameRole.Player);
          const onlinePlayers = players.filter(({ isOnline }) => isOnline);
          const leadPlayer = persons.find(({ role }) => role === GameRole.Master);
          const canJoinPlayer = players.length > onlinePlayers.length;

          return (
            <TouchableOpacity
              onPress={onSelectGame(gameID, gameName, passwordRequired, !leadPlayer.isOnline, canJoinPlayer)}>
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
