import styled from 'styled-components/native';

export const Input = styled.TextInput`
  margin-top: 12px;
  height: 40px;
  background: ${({ theme }) => theme.pallette.white};
  border: 1px solid ${({ theme }) => theme.pallette.primary};
`;

export const TimerWrapper = styled.View`
  width: 100%;
  position: absolute;
  top: 6px;
  z-index: 5;
`;
