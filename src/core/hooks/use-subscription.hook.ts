import { useEffect, useState } from 'react';
import { Observable } from 'rxjs';

/**
 * Hook to get the observable value
 * @param {Observable<T>} [dataSource] - Observable for subscribe
 * @param {T} [initialValue=null] - The initial value of the observable
 * @returns The observable value
 * @example
 * <caption>An example of use with an observable array.</caption>
 * const array = useSubscription(of([1, 2, 3]), []);
 */
function useSubscription<T>(dataSource: Observable<T>, initialValue: T = null): T {
  const [data, setData] = useState<T>(initialValue);

  useEffect(() => {
    const subscriber = dataSource.subscribe(setData);
    return () => {
      subscriber.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data;
}

export default useSubscription;
