import { interfaces } from 'inversify';
import { useContext } from 'react';
import { InversifyContext } from '../../inversify.config';

export const useInjectable = <T extends unknown = any>(type: interfaces.ServiceIdentifier<T>) => {
  const container = useContext(InversifyContext);

  return container.get<T>(type);
};
