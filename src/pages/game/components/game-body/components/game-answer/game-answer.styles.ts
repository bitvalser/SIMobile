import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  flex: 1;
`;

export const AnswerText = styled.Text`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin: 12px 0;
  color: ${({ theme }) => theme.pallette.primary};
`;
