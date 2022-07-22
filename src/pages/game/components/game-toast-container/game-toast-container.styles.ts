import styled from 'styled-components/native';
import { DimensionsStyle } from '@core/helpers/dimensions-style.helper';
import { BUTTON_HEIGHT } from '../../components/button-footer/button-footer.styles';

const HEADER_HEIGHT = 40;

export const ToastsContainer = styled.View<{ bottomMargin: boolean; position: 'top' | 'bottom' }>`
  position: absolute;
  width: 100%;
  ${({ position, bottomMargin }) =>
    position === 'bottom'
      ? `bottom: ${DimensionsStyle.safeAreaBottomHeight + (bottomMargin ? BUTTON_HEIGHT : 0)}px;`
      : `top: ${DimensionsStyle.safeAreaTopHeight + HEADER_HEIGHT}px;`}
`;
