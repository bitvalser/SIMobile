import { inject, injectable } from 'inversify';
import Sound from 'react-native-sound';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { AppSound } from '@core/constants/sound.constants';
import { ToastsService } from '../toasts/toasts.service';
import { TYPES } from '../types';
import { LOCAL_SOUNDS } from './sounds.data';
import { ISoundsService } from './sounds.types';
import { IAppSettingsService } from '../settings/settings.types';

@injectable()
export class SoundsService implements ISoundsService {
  public static type = TYPES.SoundsService;
  @inject(TYPES.ToastsService)
  private toastsService: ToastsService;
  @inject(TYPES.AppSettingsService)
  private appSettings: IAppSettingsService;
  private sounds: { [key in AppSound]?: Sound } = LOCAL_SOUNDS;
  private musics: { [key: string]: Promise<Sound> } = {};

  public constructor() {
    this.getSound = this.getSound.bind(this);
    this.getMusic = this.getMusic.bind(this);
    this.releaseMusic = this.releaseMusic.bind(this);
    this.loadMusic = this.loadMusic.bind(this);
  }

  public getSound(key: AppSound): Sound {
    return this.sounds[key].setVolume(this.appSettings.getSetting('soundValue') / 100);
  }

  public loadMusic(url: string): string {
    const musicId = uuidv4();
    this.musics = {
      ...this.musics,
      [musicId]: new Promise<Sound>((resolve, reject) => {
        const sound = new Sound(url, null, (error) => {
          if (error) {
            reject(error);
            this.toastsService.showToast({
              type: 'danger',
              text: error,
            });
          }
          resolve(sound);
        });
      }),
    };
    return musicId;
  }

  public getMusic(id: string): Promise<Sound> {
    return this.musics[id];
  }

  public releaseMusic(id: string): void {
    const music = this.musics[id];
    if (music) {
      music.then((sound) => {
        sound.stop();
        sound.release();
        delete this.musics[id];
      });
    }
  }
}
