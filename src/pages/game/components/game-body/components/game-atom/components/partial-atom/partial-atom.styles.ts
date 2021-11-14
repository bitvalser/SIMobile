import { AppText } from '@core/components/text';
import styled from 'styled-components/native';

export const QuestionText = styled(AppText)`
  font-size: 22px;
  text-align: center;
  margin: 12px;
  color: ${({ theme }) => theme.pallette.secondaryHighlight};
`;
