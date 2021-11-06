import React, { FC, useState } from 'react';
import { ChatModalProps } from './chat-modal.types';
import * as Styled from './chat-modal.styles';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MessageItem } from './components/message-item';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import { createModalHook } from '@core/helpers/create-modal-hook.helper';
import { AppIcon } from '@core/components/icon';

const ChatModal: FC<ChatModalProps> = ({ close }) => {
  const [t] = useTranslation();
  const [textValue, setTextValue] = useState('');
  const [{ chatMessages$, sendChatMessage }] = useGameController();
  const messages = useSubscription(chatMessages$);

  const sendMessage = () => {
    sendChatMessage(textValue.trim()).subscribe();
    setTextValue('');
  };

  return (
    <Styled.Container behavior="padding">
      <Styled.MessagesList
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

const useChatModal = createModalHook<ChatModalProps>((props) => () => <ChatModal {...props} />);

export default useChatModal;
