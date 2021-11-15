import React, { FC, memo } from 'react';
import { map } from 'rxjs/operators';
import { useService } from '@core/hooks/use-service.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import { ToastsService } from '@core/services/toasts/toasts.service';
import { Toast } from './components/toast';
import { ToastsContainerProps } from './toast-container.types';
import * as Styled from './toasts-container.styles';

const ModalsContainer: FC<ToastsContainerProps> = memo(({ container = 'root' }) => {
  const { toastsState$, removeToast } = useService(ToastsService);
  const toasts = useSubscription(
    toastsState$.pipe(
      map((toastItems) => toastItems.filter(({ container: toastContainer }) => toastContainer === container)),
    ),
    [],
  );

  return (
    <Styled.Container>
      {toasts.map(({ id, type, delay, content, text }) => (
        <Toast key={id} id={id} type={type} delay={delay} content={content} text={text} onHide={removeToast} />
      ))}
    </Styled.Container>
  );
});

export default ModalsContainer;
