import { FC, memo, useRef } from 'react';
import { useService } from '@core/hooks/use-service.hook';
import { ModalsService } from '@core/services/modals/modals.service';
import { ModalInstance, ModalOptions } from '@core/services/modals/modals.types';

export const createModalHook = <T extends ModalOptions>(
  component: (props?: T) => FC<any>,
  options?: ModalInstance['options'],
) =>
  function useModal(): [(props?: Omit<T, keyof ModalOptions>) => void, () => void] {
    const { addModal, removeModal } = useService(ModalsService);
    const idRef = useRef<string>();

    const hideModal = () => {
      if (idRef.current) {
        removeModal(idRef.current);
      }
    };

    const showModal = (props: Omit<T, keyof ModalOptions> = {} as T) => {
      idRef.current = addModal(
        memo(
          component({
            ...props,
            close: hideModal,
          } as T),
        ),
        options,
      );
    };

    return [showModal, hideModal];
  };
