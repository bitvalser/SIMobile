import React, { FC, memo } from 'react';
import { map } from 'rxjs/operators';
import { useService } from '@core/hooks/use-service.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import { ToastsService } from '@core/services/toasts/toasts.service';
import { Toast } from './components/toast';
import { ToastsContainerProps } from './toast-container.types';

const ModalsContainer: FC<ToastsContainerProps> = memo(({ container = 'root' }) => {
  const { toastsState$, removeToast } = useService(ToastsService);
  const toasts = useSubscription(
    toastsState$.pipe(
      map((toastItems) => toastItems.filter(({ container: toastContainer }) => toastContainer === container)),
    ),
    [],
  );

  return (
    <>
      {toasts.map(({ id, type, delay, content, text }, i) => (
        <Toast
          key={id}
          id={id}
          type={type}
          delay={delay}
          content={content}
          text={text}
          index={toasts.length - i - 1}
          onHide={removeToast}
        />
      ))}
    </>
  );
});

export default ModalsContainer;
