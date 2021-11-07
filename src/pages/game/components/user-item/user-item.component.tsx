import React, { FC, memo } from 'react';
import { PlayerAvatar } from '@pages/game/components/player-avatar';
import * as Styled from './user-item.styles';
import { UserItemProps } from './user-item.types';

const UserItem: FC<UserItemProps> = memo(({ avatar = null, sum, name, isConnected }) => {
  return (
    <Styled.Container>
      {isConnected ? <PlayerAvatar name={name} size={100} avatar={avatar} /> : <Styled.AvatarContainer />}
      <Styled.InfoContainer>
        <Styled.TextContainer>
          <Styled.UserText>{name}</Styled.UserText>
        </Styled.TextContainer>
        <Styled.TextContainer isLast>
          <Styled.UserText>{sum}</Styled.UserText>
        </Styled.TextContainer>
      </Styled.InfoContainer>
    </Styled.Container>
  );
});

export default UserItem;
