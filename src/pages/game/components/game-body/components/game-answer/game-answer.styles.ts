import styled from 'styled-components/native';
import { AppText } from '@core/components/text';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  flex: 1;
`;

export const AnswerText = styled(AppText)`
  font-size: 36px;
  text-align: center;
  margin: 12px 0;
  color: ${({ theme }) => theme.pallette.primary};
`;
