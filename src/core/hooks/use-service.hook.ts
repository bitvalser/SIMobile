import { useContext } from 'react';
import { interfaces } from 'inversify';
import { InversifyContext } from '../../inversify.config';

export const useService = <T extends unknown = any>(
  service: { type: interfaces.ServiceIdentifier<T> } & (new (
    ...args: any[]
  ) => T),
): T => {
  const container = useContext(InversifyContext);
  return container.get<T>(service.type);
};
