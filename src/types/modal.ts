import { ReactNode } from 'react';

export interface IModal {
  modalId: string;
  dialogComponent?: ReactNode;
}

export interface IModalState {
  [modalId: string]: {
    open: boolean;
    dialogComponent: ReactNode;
  };
}
