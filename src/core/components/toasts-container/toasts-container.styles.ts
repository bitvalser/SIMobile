import styled from 'styled-components/native';

export const Container = styled.View<{ position: 'top' | 'bottom' }>`
  position: absolute;
  ${({ position }) => (position === 'bottom' ? 'bottom: 5px;' : 'top: 5px;')}
  width: 100%;
  elevation: 6;
  align-items: center;
  flex-direction: column;
`;
