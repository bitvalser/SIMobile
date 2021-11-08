import React, { FC, useEffect, useRef } from 'react';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import { UserItem } from '../user-item';
import * as Styled from './user-action.styles';
import { Animated } from 'react-native';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { PlayerTimer } from '../player-timer';

const UserAction: FC = () => {
  const [{ userAction$, userReplic$ }] = useGameController();
  const appearUserAnim = useRef(new Animated.Value(0)).current;
  const appearReplicAnim = useRef(new Animated.Value(0)).current;
  const userAction = useSubscription(userAction$);
  const userReplic = useSubscription(
    userReplic$.pipe(
      withLatestFrom(userAction$),
      filter(([replic, data]) => replic === null || replic.name === data.user.name),
      map(([data]) => data),
    ),
  );
  const userNameRef = useRef(userAction?.user?.name);

  useEffect(() => {
    if (userAction && userNameRef.current !== userAction.user.name) {
      userNameRef.current = userAction.user.name;
      appearUserAnim.setValue(0);
      Animated.spring(appearUserAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [userAction, appearUserAnim]);

  useEffect(() => {
    if (userReplic) {
      appearReplicAnim.setValue(0);
      Animated.spring(appearReplicAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [userReplic, appearReplicAnim]);

  return (
    userAction && (
      <Styled.Container>
        {userReplic && (
          <Styled.ReplicContainer
            style={{
              opacity: appearReplicAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1],
              }),
              transform: [
                {
                  translateY: appearReplicAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0],
                  }),
                },
              ],
            }}>
            <Styled.ReplicText>{userReplic.text}</Styled.ReplicText>
          </Styled.ReplicContainer>
        )}
        <Styled.UserWrapper
          style={{
            opacity: appearUserAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0.5, 1],
            }),
            transform: [
              {
                translateY: appearUserAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [100, 0],
                }),
              },
            ],
          }}>
          <Styled.TimerWrapper>
            <PlayerTimer name={userAction.user.name} initialTime={userAction.timer} />
          </Styled.TimerWrapper>
          <UserItem
            isConnected={userAction.user.isConnected}
            avatar={userAction.user.avatar}
            name={userAction.user.name}
            sum={userAction.user.sum}
          />
        </Styled.UserWrapper>
      </Styled.Container>
    )
  );
};

export default UserAction;