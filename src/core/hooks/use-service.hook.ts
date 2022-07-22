import { interfaces } from 'inversify';
import { useContext, useState } from 'react';
import { InversifyContext } from '../../inversify.config';

export const useService = <T extends unknown = any>(
  service: { type: interfaces.ServiceIdentifier<T> } & (new (...args: any[]) => T),
): T => {
  const container = useContext(InversifyContext);
  const [instance] = useState(() => container.get<T>(service.type));
  return instance;
};
