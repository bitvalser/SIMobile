import styled from 'styled-components/native';

export const Container = styled.View<{ fullWidth: boolean; disabled: boolean }>`
  border: 1px solid ${({ theme }) => theme.pallette.primary};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  opacity: ${({ disabled }) => (!disabled ? 1 : 0.7)};
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.pallette.primary};
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

export const Content = styled.View`
  display: flex;
  padding: 12px 50px;
  align-items: center;
  justify-content: center;
`;
