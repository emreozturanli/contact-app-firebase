import * as React from 'react';
import Grid from '@mui/material/Grid';
import Form from "./Form"
import ContactTable from "./ContactTable"
import { useState } from 'react';
import SnackAlert from './SnackAlert';

const Main = () => {
  const [contactList, setContactList] = useState([]);
  const [open, setOpen] = useState(false);
  const [message,setMessage] = useState('')
  const [severity,setSeverity] = useState('')

  const openSnackbar = (message,severity) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

    return (
        <Grid container sx={{ marginTop: '4rem',alignItems:"center" }}>
          <Grid item xs={12} md={4}>
            <Form contactList={contactList} setContactList={setContactList} openSnackbar={openSnackbar}/>
          </Grid>
          <Grid item xs={12} md={8} sx={{padding:"5rem"}}>
            <ContactTable contactList={contactList} openSnackbar={openSnackbar}/>
          </Grid>
            <SnackAlert open={open} setOpen={setOpen} message={message} severity={severity} />
        </Grid>
    )
}

export default Main