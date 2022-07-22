import React, { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { PlayerAvatar } from '@pages/game/components/player-avatar';
import * as Styled from './user-item.styles';
import { UserItemProps } from './user-item.types';

const UserItem: FC<UserItemProps> = memo(
  ({
    avatar = null,
    sum,
    name,
    isConnected,
    hide = false,
    showAvatar = true,
    showSum = true,
    avatarState,
    showReady = false,
  }) => {
    const [t] = useTranslation();

    return (
      <Styled.Container hide={hide}>
        {showAvatar &&
          (isConnected ? (
            <PlayerAvatar name={name} avatarState={avatarState} size={100} avatar={avatar} />
          ) : (
            <Styled.AvatarContainer />
          ))}
        <Styled.InfoContainer marginLeft={showAvatar}>
          <Styled.TextContainer>
            <Styled.UserText>{name}</Styled.UserText>
          </Styled.TextContainer>
          {showSum && (
            <Styled.TextContainer isLast>
              <Styled.UserText>{sum}</Styled.UserText>
            </Styled.TextContainer>
          )}
          {showReady && (
            <Styled.TextContainer isLast>
              <Styled.UserText>{t('game.ready')}</Styled.UserText>
            </Styled.TextContainer>
          )}
        </Styled.InfoContainer>
      </Styled.Container>
    );
  },
);

export default UserItem;
