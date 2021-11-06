import styled from 'styled-components/native';

export const Container = styled.View<{ oneLine: boolean }>`
  margin-top: 4px;
  display: flex;
  flex-direction: row;
  flex-wrap: ${({ oneLine }) => (!oneLine ? 'wrap' : 'nowrap')};
  align-items: center;
`;

export const MessageText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.pallette.black};
`;

export const DividerText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.pallette.black};
`;

export const Name = styled.Text<{ color: string }>`
  font-size: 16px;
  display: flex;
  color: ${({ color }) => color};
  font-weight: bold;
`;
