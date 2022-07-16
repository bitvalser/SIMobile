export interface IAssetsService {
  fetchResource(url: string): Promise<void>;
  getResource(url: string): string;
  clear(): void;
}
