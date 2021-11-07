import styled from 'styled-components/native';

export const Container = styled.View<{ borderColor: string; size: number }>`
  border: 2px solid ${({ borderColor }) => borderColor};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

export const AvatarImage = styled.Image`
  width: 100%;
  height: 100%;
`;
