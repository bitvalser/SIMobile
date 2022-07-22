import React, { memo, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AppIcon } from '@core/components/icon';
import { GameStatuses } from '@core/constants/game-status.constants';
import i18n from '@core/i18n';
import * as Styled from './game-item.styles';
import { GameItemProps } from './game-item.types';

const getStatusName = (stage: GameStatuses, stageName: string): string => {
  switch (stage) {
    case GameStatuses.Created:
      return i18n.t('hub.gameCreated');
    case GameStatuses.Started:
      return i18n.t('hub.gameStarted');
    case GameStatuses.Round:
      return `${i18n.t('hub.round')}: ${stageName}`;
    case GameStatuses.Final:
      return i18n.t('hub.final');
    case GameStatuses.End:
      return i18n.t('hub.gameEnd');
    default:
      return '';
  }
};

const GameItem: FC<GameItemProps> = memo(
  ({ maxPlayers, players, stage, stageName, startTime, title, withLead, withPassword }) => {
    const [t, translation] = useTranslation();

    const dateText = new Date(startTime).toLocaleString(translation.language, {
      day: '2-digit',
      month: 'long',
      hour: '2-digit',
      minute: 'numeric',
    });

    return (
      <Styled.Container>
        <Styled.Title>{title}</Styled.Title>
        <Styled.Status>
          {t('hub.status')}: {getStatusName(stage, stageName)}
        </Styled.Status>
        <Styled.Footer>
          <Styled.DateText>{dateText}</Styled.DateText>
          <Styled.Spacer />
          {withPassword && (
            <Styled.GameIconContainer>
              <AppIcon name="lock" />
            </Styled.GameIconContainer>
          )}
          {withLead && (
            <Styled.GameIconContainer>
              <AppIcon name="crown" />
            </Styled.GameIconContainer>
          )}
          <Styled.PlayersContainer>
            <Styled.GameIconContainer>
              <AppIcon name="group" />
            </Styled.GameIconContainer>
            <Styled.PlayersText>
              {players}/{maxPlayers}
            </Styled.PlayersText>
          </Styled.PlayersContainer>
        </Styled.Footer>
      </Styled.Container>
    );
  },
);

export default GameItem;
