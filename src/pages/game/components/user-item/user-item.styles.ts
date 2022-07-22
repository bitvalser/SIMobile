import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { AppText } from '@core/components/text';
import { getBorderColor } from '@pages/game/components/player-avatar/player-avatar.data';
import { AvatarState } from '@pages/game/components/player-avatar/player-avatar.types';

export const Container = styled.View<{ hide: boolean }>`
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
  max-height: 100px;
  opacity: ${({ hide }) => (hide ? 0.5 : 1)};
  position: relative;
`;

export const AvatarContainer = styled.View`
  border: 2px solid ${({ theme }) => getBorderColor(AvatarState.Default, theme)};
  width: 100px;
  height: 100px;
`;

export const UserText = styled(AppText)`
  font-size: 22px;
  color: ${({ theme }) => theme.pallette.primary};
`;

export const InfoContainer = styled.View<{ marginLeft: boolean }>`
  display: flex;
  flex-direction: column;
  margin-left: ${({ marginLeft }) => (marginLeft ? 16 : 0)}px;
  flex: 1;
`;

export const TextContainer = styled(LinearGradient).attrs({
  colors: ['#3b3b3b', '#222223', '#222223'],
  angle: 180,
})<{ isLast?: boolean }>`
  margin-bottom: ${({ isLast = false }) => (isLast ? 0 : 4)}px;
  height: 48px;
  display: flex;
  padding: 4px 0;
  justify-content: center;
  align-items: center;
`;
