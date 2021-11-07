import React, { FC, memo } from 'react';
import { concat, of } from 'rxjs';
import { delay, filter, map, switchMap } from 'rxjs/operators';
import { AvatarState, PlayerAvatarProps } from './player-avatar.types';
import * as Styled from './player-avatar.styles';
import { getBorderColor } from './player-avatar.data';
import defaultMaleAvatar from '@assets/images/player-m-avatar.png';
import { useTheme } from 'styled-components/native';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';

const WRONG_TRY_DELAY = 500;

const PlayerAvatar: FC<PlayerAvatarProps> = memo(({ avatar = null, size = 120, name }) => {
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
    <Styled.Container borderColor={getBorderColor(state, theme)} size={size}>
      <Styled.AvatarImage source={avatar ? { uri: avatar } : defaultMaleAvatar} />
    </Styled.Container>
  );
});

export default PlayerAvatar;
