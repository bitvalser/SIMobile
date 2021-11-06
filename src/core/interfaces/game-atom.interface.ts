import { AtomType } from '@core/constants/atom-type.constants';

export interface GameAtom {
  type: AtomType;
  data: string;
}
