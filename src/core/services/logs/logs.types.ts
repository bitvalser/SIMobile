import { Observable } from 'rxjs';

export interface LogItem {
  date: string;
  text: string;
}

export interface ILogsService {
  log(text: string): void;
  sendError(error: Error, type: 'boundary' | 'custom', additionalInfo?: object): Observable<string>;
}
