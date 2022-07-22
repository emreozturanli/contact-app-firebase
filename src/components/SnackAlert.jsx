import * as React from 'react';
import Stack from '@mui/material/Stack';
import Slide from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

export default function SnackAlert({open,setOpen,message,severity}) {
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  return (
    <Stack>
      <Snackbar 
      open={open} 
      autoHideDuration={6000} 
      TransitionComponent={TransitionLeft}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={severity} >
         {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}