import styled from 'styled-components/native';
import { AppText } from '@core/components/text';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  flex: 1;
`;

export const QuestionText = styled(AppText)`
  font-size: 24px;
  text-align: center;
  margin: 12px;
  color: ${({ theme }) => theme.pallette.primary};
`;

export const QuestionImage = styled.Image`
  width: 100%;
  height: 100%;
`;
