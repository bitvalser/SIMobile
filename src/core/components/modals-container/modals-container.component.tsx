import React, { FC } from 'react';
import { Modal } from 'react-native';
import { useService } from '@core/hooks/use-service.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import { ModalsService } from '@core/services/modals/modals.service';

const ModalsContainer: FC = () => {
  const { modalsState$ } = useService(ModalsService);
  const modals = useSubscription(modalsState$, []);

  return (
    <>
      {modals.map(({ id, component: Component, options }) => (
        <Modal key={id} visible {...options}>
          <Component />
        </Modal>
      ))}
    </>
  );
};

export default ModalsContainer;
