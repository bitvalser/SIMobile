import { DimensionsStyle } from '@core/helpers/dimensions-style.helper';
import styled from 'styled-components/native';
import { BUTTON_HEIGHT } from './components/button-footer/button-footer.styles';

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ToastsContainer = styled.View`
  position: absolute;
  width: 100%;
  bottom: ${DimensionsStyle.safeAreaBottomHeight + BUTTON_HEIGHT}px;
`;
