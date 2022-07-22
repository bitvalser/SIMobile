import React, { FC, memo } from 'react';
import { concat, of } from 'rxjs';
import { delay, filter, map, switchMap } from 'rxjs/operators';
import { useTheme } from 'styled-components/native';
import defaultMaleAvatar from '@assets/images/player-m-avatar.png';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import { getBorderColor } from './player-avatar.data';
import * as Styled from './player-avatar.styles';
import { AvatarState, PlayerAvatarProps } from './player-avatar.types';

const WRONG_TRY_DELAY = 500;

const PlayerAvatar: FC<PlayerAvatarProps> = memo(({ avatar = null, size = 120, name, avatarState = null }) => {
  const [{ userAvatarState$ }] = useGameController();
  const state = useSubscription(
    userAvatarState$.pipe(
      filter((data) => data.name === name),
      map((data) => data.state),
      switchMap((data) => {
        switch (data) {
          case AvatarState.WrongTry:
            return concat(of(data), of(AvatarState.Default).pipe(delay(WRONG_TRY_DELAY)));
          default:
            return of(data);
        }
      }),
    ),
    AvatarState.Default,
  );
  const theme = useTheme();

  return (
    <Styled.Container borderColor={getBorderColor(avatarState || state, theme)} size={size}>
      <Styled.AvatarImage source={avatar ? { uri: avatar } : defaultMaleAvatar} />
    </Styled.Container>
  );
});

export default PlayerAvatar;
