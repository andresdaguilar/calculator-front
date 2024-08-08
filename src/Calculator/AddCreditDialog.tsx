import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


interface AddCreditDialogProps {
  open: boolean,
  setOpen: (status: boolean) => void,
  handleConfirm: () => void;
}

const AddCreditDialog : React.FC<AddCreditDialogProps>= ({ open, setOpen, handleConfirm }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));  

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>      
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Add Credit"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Hey there! Want to reset your balance to 100 credits? Just hit 'Confirm' and watch your digital wallet get happier! If not, no worries, just click 'Cancel' and keep being awesome
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={() => handleConfirm()} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AddCreditDialog;