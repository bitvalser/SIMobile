import React, { FC, memo } from 'react';
import { map } from 'rxjs/operators';
import { useService } from '@core/hooks/use-service.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import { ToastsService } from '@core/services/toasts/toasts.service';
import { Toast } from './components/toast';
import { ToastsContainerProps } from './toast-container.types';
import * as Styled from './toasts-container.styles';

const ModalsContainer: FC<ToastsContainerProps> = memo(({ container = 'root', position = 'bottom' }) => {
  const { toastsState$, removeToast } = useService(ToastsService);
  const toasts = useSubscription(
    toastsState$.pipe(
      map((toastItems) => toastItems.filter(({ container: toastContainer }) => toastContainer === container)),
    ),
    [],
  );

  const items = position === 'top' ? toasts.slice().reverse() : toasts;

  return (
    <Styled.Container position={position}>
      {items.map(({ id, type, delay, content, text }) => (
        <Toast
          key={id}
          id={id}
          type={type}
          delay={delay}
          content={content}
          text={text}
          position={position}
          onHide={removeToast}
        />
      ))}
    </Styled.Container>
  );
});

export default ModalsContainer;
