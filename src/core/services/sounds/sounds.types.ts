import Sound from 'react-native-sound';
import { AppSound } from '@core/constants/sound.constants';

export interface ISoundsService {
  getSound(key: AppSound): Sound;
  loadMusic(url: string): string;
  getMusic(id: string): Promise<Sound>;
  releaseMusic(id: string): void;
}
