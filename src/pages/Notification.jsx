import React, { useState } from 'react';
import { Snackbar, Alert, Button, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const Notification = () => {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    severity: 'info'
  });

  const handleOpen = (message, severity = 'info') => {
    setNotification({ message, severity });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={() => handleOpen('Успех!', 'success')}>
        Показать успех
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleClose}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Notification;