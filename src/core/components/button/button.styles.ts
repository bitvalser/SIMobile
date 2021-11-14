import styled from 'styled-components/native';
import { AppText } from '../text';

export const Container = styled.View<{ fullWidth: boolean; disabled: boolean }>`
  border: 1px solid ${({ theme }) => theme.pallette.primary};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  opacity: ${({ disabled }) => (!disabled ? 1 : 0.7)};
`;

export const ButtonText = styled(AppText)`
  color: ${({ theme }) => theme.pallette.primary};
  font-size: 22px;
  text-align: center;
`;

export const Content = styled.View`
  display: flex;
  padding: 12px 50px;
  align-items: center;
  justify-content: center;
`;
