import styled from 'styled-components/native';

export const Content = styled.View`
  display: flex;
  flex-direction: column;
  margin: 12px;
`;

export const ErrorText = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.pallette.black};
`;
