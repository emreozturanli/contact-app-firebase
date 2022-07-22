import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { db } from '../firebase/firebase';
import { ref, update } from 'firebase/database';



export default function DialogComponent({ open, setOpen, setUpdateInfo,updateInfo, openSnackbar }) {
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setUpdateInfo({
            ...updateInfo,
            [event.target.name]:event.target.value
        })
    };
    const editContact = () => {
        update(ref(db, 'Contacts/' + updateInfo.id),{
            name:updateInfo.name,
            gender:updateInfo.gender,
            phone:updateInfo.phone
        })
        handleClose();
        openSnackbar('Contact Successfully Edited', 'success')
    }
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        name="name"
                        fullWidth
                        variant="standard"
                        value={updateInfo.name}
                        onChange={handleChange}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phone"
                        label="Phone"
                        name="phone"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={updateInfo.phone}
                        onChange={handleChange}
                    />
                    <Box sx={{ minWidth: 120, marginTop: "1rem" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="gender"
                                value={updateInfo.gender}
                                label="Gender"
                                name="gender"
                                onChange={handleChange}
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={editContact}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}