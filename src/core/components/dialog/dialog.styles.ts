import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { AppText } from '../text';

const MIN_WIDTH = Math.min(Dimensions.get('window').width - 24, 400);
const MAX_HEIGHT = Dimensions.get('window').height * (3 / 4);

export const Container = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const ModalContainer = styled.View`
  display: flex;
  max-width: 600px;
  min-width: ${MIN_WIDTH}px;
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
`;

export const CloseText = styled(AppText)`
  font-size: 20px;
  color: ${({ theme }) => theme.pallette.primary};
  padding: 4px;
`;

export const Content = styled.View`
  display: flex;
  max-height: ${MAX_HEIGHT}px;
  flex-direction: column;
`;
