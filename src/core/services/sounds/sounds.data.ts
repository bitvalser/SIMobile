import Sound from 'react-native-sound';
import { AppSound } from '@core/constants/sound.constants';

export const LOCAL_SOUNDS: { [key in AppSound]?: Sound } = Object.values(AppSound).reduce(
  (acc, val) => ({
    ...acc,
    [val]: new Sound(`${val}.mp3`, Sound.MAIN_BUNDLE),
  }),
  {},
);
