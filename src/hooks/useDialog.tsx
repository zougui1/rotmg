import { useState } from 'react';
import { Slot } from '@radix-ui/react-slot';

export const useDialog = (options?: UseDialogOptions) => {
  const [isOpen, setIsOpen] = useState(options?.defaultIsOpen ?? false);

  const invokeCallbacks = (open: boolean) => {
    options?.onOpenChange?.(open);

    if (open) {
      options?.onOpen?.();
    } else {
      options?.onClose?.();
    }
  }

  const changeOpenState: React.Dispatch<React.SetStateAction<boolean>> = (openOrGetter) => {
    if (typeof openOrGetter === 'function') {
      return setIsOpen(prevOpen => {
        const newOpen = openOrGetter(prevOpen);
        invokeCallbacks(newOpen);
        return newOpen;
      });
    }

    invokeCallbacks(openOrGetter);
    setIsOpen(openOrGetter);
  }

  return {
    open: () => changeOpenState(true),
    close: () => changeOpenState(false),
    toggle: () => changeOpenState(b => !b),
    setIsOpen: changeOpenState,
    isOpen,
    Trigger: function AlertDialogTrigger({ children }: { children: React.ReactNode; }) {
      return (
        <Slot onClick={() => changeOpenState(true)}>
          {children}
        </Slot>
      );
    },
    Outlet: function DialogOutlet({ children }: { children: React.ReactNode; }) {
      return (
        <Slot
          // @ts-expect-error Slot is too generic to know of the child component
          open={isOpen}
          onOpenChange={changeOpenState}
        >
          {children}
        </Slot>
      );
    },
  };
}

export interface UseDialogOptions {
  defaultIsOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onOpen?: () => void;
  onClose?: () => void;
}
