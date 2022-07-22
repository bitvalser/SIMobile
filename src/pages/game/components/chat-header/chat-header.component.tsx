import React, { FC, useRef, useEffect } from 'react';
import { Animated, Easing, TouchableOpacity } from 'react-native';
import { map } from 'rxjs/operators';
import { AppIcon } from '@core/components/icon';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import useChatModal from '../chat-modal/chat-modal.component';
import { MessageItem } from '../chat-modal/components/message-item';
import useUsersModal from '../users-modal/users-modal.component';
import * as Styled from './chat-header.styles';

const ChatHeader: FC = () => {
  const appearAnim = useRef(new Animated.Value(0)).current;
  const [showChatModal] = useChatModal();
  const [showUsersModal] = useUsersModal();
  const [{ chatMessages$ }] = useGameController();
  const [lastMessage, previousMessage] = useSubscription(
    chatMessages$.pipe(map((items) => items.slice(items.length - 2).reverse())),
    [],
  );

  useEffect(() => {
    appearAnim.setValue(0);
    Animated.timing(appearAnim, {
      useNativeDriver: true,
      easing: Easing.inOut(Easing.ease),
      toValue: 1,
      duration: 300,
    }).start();
  }, [lastMessage, appearAnim]);

  return (
    <Styled.Container>
      <Styled.MessageContainer>
        {previousMessage && (
          <Styled.FloatMessage
            style={{
              opacity: appearAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
              transform: [
                {
                  translateY: appearAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '-100%'],
                  }),
                },
              ],
            }}
            key={previousMessage.id}>
            <MessageItem oneLine name={previousMessage.user} text={previousMessage.text} />
          </Styled.FloatMessage>
        )}
        {lastMessage && (
          <Styled.FloatMessage
            style={{
              opacity: appearAnim,
              transform: [
                {
                  translateX: appearAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['100%', '0%'],
                  }),
                },
              ],
            }}
            key={lastMessage.id}>
            <MessageItem oneLine name={lastMessage.user} text={lastMessage.text} />
          </Styled.FloatMessage>
        )}
      </Styled.MessageContainer>
      <TouchableOpacity onPress={showChatModal}>
        <AppIcon name="chat" color="primary" />
      </TouchableOpacity>
      <Styled.Divider />
      <TouchableOpacity onPress={showUsersModal}>
        <AppIcon name="group" color="primary" />
      </TouchableOpacity>
    </Styled.Container>
  );
};

export default ChatHeader;
