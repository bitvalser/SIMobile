import { useContext } from 'react';
import { interfaces } from 'inversify';
import { InversifyContext } from '../../inversify.config';

export const useInjectable = <T extends unknown = any>(type: interfaces.ServiceIdentifier<T>) => {
  const container = useContext(InversifyContext);

  return container.get<T>(type);
};
