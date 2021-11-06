import { ComponentType } from 'react';
import { FlatList, FlatListProps } from 'react-native';
import styled from 'styled-components/native';
import { ChatMessage } from '@core/interfaces/chat-message.interface';

export const Container = styled.KeyboardAvoidingView`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  background: ${({ theme }) => theme.pallette.background};
`;

export const Header = styled.View`
  padding: 4px 0;
  align-items: center;
  background: ${({ theme }) => theme.pallette.background};
  display: flex;
  flex-direction: row;
`;

export const Title = styled.Text`
  font-size: 20px;
  display: flex;
  flex: 1;
  font-weight: bold;
  color: ${({ theme }) => theme.pallette.primary};
`;

export const CloseText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.pallette.primary};
  padding: 4px;
`;

export const Footer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  margin-bottom: 2px;
`;

export const MessagesList = styled(FlatList)`
  padding: 0 12px;
` as ComponentType<FlatListProps<ChatMessage>>;

export const Input = styled.TextInput`
  margin-top: 12px;
  width: 100%;
  padding-right: 48px;
  height: 40px;
  background: ${({ theme }) => theme.pallette.white};
  border: 1px solid ${({ theme }) => theme.pallette.black};
`;

export const SendIconWrapper = styled.View`
  position: absolute;
  right: 8px;
  top: 11px;
`;
