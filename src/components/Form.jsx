import React from 'react'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState,useEffect } from 'react';
import { db } from '../firebase/firebase';
import { set, ref, push, onValue, } from 'firebase/database';


const Form = ({setContactList}) => {
    const [gender, setGender] = useState('');
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const writeToDatabase = (e) => {
        e.preventDefault()
        const contactRef = ref(db, 'Contacts');
        // console.log(contactRef);
        const newContactRef = push(contactRef)
        // console.log(newContactRef);
        set(newContactRef, {
            name: name,
            phone: phone,
            gender: gender
        })
        // console.log(db);
        setName('');
        setPhone('');
        setGender('');
    };
    useEffect(() => {
        const userRef = ref(db, "Contacts");
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            const contactArr = [];
            for (let id in data) {
                contactArr.push({
                    id,
                    ...data[id]
                })
            }
            // console.log(contactArr);
            setContactList(contactArr);
        })
    }, [])

    return (
        <form style={{ padding: "4rem" }} onSubmit={writeToDatabase}>

            <Typography variant="h4" component="h3">
                New Contact
            </Typography>

            <TextField fullWidth label={'Name'} id="margin-none" margin="normal" InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <AccountCircle />
                    </InputAdornment>
                ),
            }} onChange={(e) => setName(e.target.value)} value={name}
                required />

            <TextField fullWidth label={'Phone'} id="margin-dense" margin="normal" InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <PhoneIcon />
                    </InputAdornment>
                ),
            }} onChange={(e) => setPhone(e.target.value)} value={phone}
                required type="number"/>

            <Box sx={{ minWidth: 120, marginTop: "1rem" }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gender}
                        label="Gender"
                        onChange={(e)=>setGender(e.target.value)}
                    >
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <br />
            <Button variant="contained" type="submit">ADD</Button>
        </form>

    )
}

export default Form