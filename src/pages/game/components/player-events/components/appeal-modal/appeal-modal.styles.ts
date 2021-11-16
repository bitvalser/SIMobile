import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 12px;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.pallette.black};
`;

export const BoldText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.pallette.black};
`;

export const AnswersContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const AnswerText = styled.Text`
  margin-top: 4px;
  font-size: 16px;
  width: 100%;
  text-align: center;
`;

export const AnswerTitle = styled.Text`
  margin-top: 12px;
  margin-bottom: 4px;
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.pallette.black};
`;
