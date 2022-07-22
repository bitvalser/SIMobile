import styled from 'styled-components/native';
import { AppText } from '@core/components/text';

export const QuestionText = styled(AppText)`
  font-size: 22px;
  text-align: center;
  margin: 12px;
  color: ${({ theme }) => theme.pallette.secondaryHighlight};
`;
