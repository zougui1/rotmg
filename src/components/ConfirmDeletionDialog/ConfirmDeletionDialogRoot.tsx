'use client';

import { AlertDialog } from '../ui/AlertDialog';

export const ConfirmDeletionDialogRoot = (props: ConfirmDeletionDialogRootProps) => {
  const { label, children, onDelete, onCancel, ...rest } = props;

  return (
    <AlertDialog.Root {...rest}>
      {children}

      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Are you sure you want to delete {label}?</AlertDialog.Title>
          <AlertDialog.Description className="first-letter:uppercase">
            {label} will be permanently deleted.
          </AlertDialog.Description>
        </AlertDialog.Header>

        <AlertDialog.Footer>
          <AlertDialog.Cancel onClick={onCancel}>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action
            color="destructive"
            onClick={onDelete}
          >
            Delete
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}

export interface ConfirmDeletionDialogRootProps extends AlertDialog.RootProps {
  label: string;
  onDelete?: () => void;
  onCancel?: () => void;
}
