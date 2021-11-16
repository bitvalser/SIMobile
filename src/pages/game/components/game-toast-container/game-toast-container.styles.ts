import { DimensionsStyle } from '@core/helpers/dimensions-style.helper';
import { BUTTON_HEIGHT } from '../../components/button-footer/button-footer.styles';
import styled from 'styled-components/native';

export const ToastsContainer = styled.View<{ bottomMargin: boolean }>`
  position: absolute;
  width: 100%;
  bottom: ${({ bottomMargin }) => DimensionsStyle.safeAreaBottomHeight + (bottomMargin ? BUTTON_HEIGHT : 0)}px;
`;
