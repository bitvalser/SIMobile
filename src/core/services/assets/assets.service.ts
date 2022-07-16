import { injectable } from 'inversify';
import { Platform } from 'react-native';
import RNFetchBlob, { FetchBlobResponse } from 'rn-fetch-blob';
import { TYPES } from '../types';
import { IAssetsService } from './assets.types';

@injectable()
export class AssetsService implements IAssetsService {
  public static type = TYPES.AssetsService;
  private cacheMap: {
    [url: string]: FetchBlobResponse;
  } = {};

  public fetchResource(url: string): Promise<void> {
    return RNFetchBlob.config({ fileCache: true })
      .fetch('GET', url)
      .then((resource) => {
        this.cacheMap[url] = resource;
      });
  }

  public getResource(url: string): string {
    return this.cacheMap[url]
      ? Platform.OS === 'android'
        ? 'file://' + this.cacheMap[url].path()
        : this.cacheMap[url].path()
      : url;
  }

  public clear(): void {
    Object.values(this.cacheMap).forEach((item) => {
      item.flush();
    });
  }
}
