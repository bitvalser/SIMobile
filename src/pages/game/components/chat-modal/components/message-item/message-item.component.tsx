import React, { FC, memo } from 'react';
import { stringToColor } from '@core/helpers/string-to-color.helper';
import * as Styled from './message-item.styles';
import { MessageItemProps } from './message-item.types';

const MessageItem: FC<MessageItemProps> = memo(({ name = null, text, oneLine = false }) => {
  return (
    <Styled.Container oneLine={oneLine}>
      {name && <Styled.Name color={stringToColor(name)}>{name}</Styled.Name>}
      {name && <Styled.DividerText>: </Styled.DividerText>}
      <Styled.MessageText numberOfLines={oneLine ? 1 : null} selectable>
        {text}
      </Styled.MessageText>
    </Styled.Container>
  );
});

export default MessageItem;
