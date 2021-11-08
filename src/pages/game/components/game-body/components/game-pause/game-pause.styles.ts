import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  position: absolute;
  top: 0;
  align-items: center;
  justify-content: center;
  z-index: 12;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const PauseText = styled.Text`
  font-size: 64px;
  font-weight: bold;
  color: ${({ theme }) => theme.pallette.primary};
`;
