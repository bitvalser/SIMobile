import styled from 'styled-components/native';
import { AppText } from '../text';

export const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const ModalContainer = styled.View`
  display: flex;
  max-width: 600px;
  min-width: 400px;
  flex-direction: column;
  background: ${({ theme }) => theme.pallette.background};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.8;
  shadow-radius: 2px;
  elevation: 5;
`;

export const Header = styled.View`
  padding: 4px 12px;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

export const Spacer = styled.View`
  display: flex;
  flex: 1;
`;

export const Title = styled(AppText)`
  font-size: 24px;
  display: flex;
  flex: 1;
  color: ${({ theme }) => theme.pallette.primary};
  font-family: ${({ theme }) => theme.fonts.third};
`;

export const CloseText = styled(AppText)`
  font-size: 20px;
  color: ${({ theme }) => theme.pallette.primary};
  padding: 4px;
`;

export const Content = styled.View`
  display: flex;
  flex-direction: column;
`;
