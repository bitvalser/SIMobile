import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  flex: 1;
`;

export const QuestionText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  margin: 12px;
  text-shadow-color: #000;
  text-shadow-offset: 0px 1px;
  text-shadow-radius: 5px;
  color: ${({ theme }) => theme.pallette.primary};
`;

export const QuestionImage = styled.Image`
  width: 100%;
  height: 100%;
`;
