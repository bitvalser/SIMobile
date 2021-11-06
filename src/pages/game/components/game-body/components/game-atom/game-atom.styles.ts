import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const QuestionText = styled.Text`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin: 12px 0;
  color: ${({ theme }) => theme.pallette.primary};
`;

export const QuestionImage = styled.Image`
  width: 100%;
  height: 100%;
`;


