import styled from 'styled-components/native';

export const QuestionText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  margin: 12px;
  color: ${({ theme }) => theme.pallette.secondaryHighlight};
`;
