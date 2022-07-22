import styled from 'styled-components/native';
import { AppText } from '@core/components/text';

export const Content = styled.View`
  width: 300px;
  display: flex;
  position: relative;
`;

export const ServerTitle = styled(AppText)`
  margin-top: 30px;
  color: ${({ theme }) => theme.pallette.primary};
  font-size: 20px;
  text-align: center;
`;
