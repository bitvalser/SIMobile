import React, { FC, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, TouchableOpacity } from 'react-native';
import { AppIcon } from '@core/components/icon';
import { createModalHook } from '@core/helpers/create-modal-hook.helper';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import { ChatMessage } from '@core/interfaces/chat-message.interface';
import * as Styled from './chat-modal.styles';
import { ChatModalProps } from './chat-modal.types';
import { MessageItem } from './components/message-item';

const ChatModal: FC<ChatModalProps> = ({ close }) => {
  const [t] = useTranslation();
  const [textValue, setTextValue] = useState('');
  const flatListRef = useRef<FlatList<ChatMessage>>();
  const [{ chatMessages$, sendChatMessage }] = useGameController();
  const messages = useSubscription(chatMessages$);

  const sendMessage = () => {
    sendChatMessage(textValue.trim()).subscribe();
    setTextValue('');
  };

  const handleMessage = () => {
    flatListRef.current.scrollToEnd();
  };

  return (
    <Styled.Container behavior="padding">
      <Styled.MessagesList
        ref={flatListRef}
        onContentSizeChange={handleMessage}
        data={messages}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <Styled.Header>
            <Styled.Title numberOfLines={1}>{t('game.messages')}</Styled.Title>
            <TouchableOpacity onPress={close}>
              <Styled.CloseText>✕</Styled.CloseText>
            </TouchableOpacity>
          </Styled.Header>
        }
        renderItem={({ item: { text, user } }) => <MessageItem text={text} name={user} />}
        keyExtractor={({ id }) => id}
      />
      <Styled.Footer>
        <Styled.Input value={textValue} onChangeText={setTextValue} />
        <Styled.SendIconWrapper>
          <TouchableOpacity disabled={textValue.trim().length === 0} onPress={sendMessage}>
            <AppIcon name="send" color="primary" />
          </TouchableOpacity>
        </Styled.SendIconWrapper>
      </Styled.Footer>
    </Styled.Container>
  );
};

const useChatModal = createModalHook<ChatModalProps>((props) => () => <ChatModal {...props} />, {
  statusBarTranslucent: true,
});

export default useChatModal;
