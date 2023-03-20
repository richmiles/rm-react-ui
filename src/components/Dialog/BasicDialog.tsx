import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

type BasicDialogProps = {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onSubmit?: () => void;
  onClose: () => void;
  isSubmitDisabled?: boolean;
  submitButtonText?: string;
  cancelButtonText?: string;
  hideSubmitButton?: boolean;
};

const BasicDialog = (props: BasicDialogProps) => {
  const {
    open,
    title,
    children,
    onSubmit,
    onClose,
    isSubmitDisabled = false,
    submitButtonText = 'Submit',
    cancelButtonText = 'Cancel',
    hideSubmitButton = false,
  } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelButtonText}</Button>
        {!hideSubmitButton && onSubmit && (
          <Button
            onClick={onSubmit}
            variant="contained"
            color="primary"
            disabled={isSubmitDisabled}
          >
            {submitButtonText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BasicDialog;
