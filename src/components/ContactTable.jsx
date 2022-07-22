import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {  ref, remove } from 'firebase/database';
import { db } from '../firebase/firebase';
import DialogComponent from './DialogComponent';

export default function ContactTable({ contactList, openSnackbar }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [updateInfo, setUpdateInfo] = React.useState({});
    const [open, setOpen] = React.useState(false);

    const columns = [
        { id: 'name', label: 'Name', minWidth: 150 },
        { id: 'phone', label: 'Phone', minWidth: 150 },
        {
            id: 'gender',
            label: 'Gender',
            minWidth: 150,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        }
    ];

    function createData(name, phone, gender,id) {
        return { name, phone, gender,id };
    }

    const rows = contactList.map((e) => createData(e.name, e.phone, e.gender,e.id))

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    const deleteContact = (id) => {
        remove(ref(db, 'Contacts/' + id))
        openSnackbar('Contact Succesfully Deleted','success')
    }
    const handleEdit = (id,name,phone,gender) => {
        setUpdateInfo({id:id,name:name,phone:phone,gender:gender})
        setOpen(true)
    }
    

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>  
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row,i) => {
                                return (
                                    <TableRow  hover role="checkbox" tabIndex={-1} key={i}>

                                        {columns.map((column,i) => {
                                            const value = row[column.id];                                  
                                            return (
                                                    <TableCell key={i} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                            );
                                        })}
                                        <TableCell><EditIcon sx={{ color: "blue", cursor: "pointer" }} onClick={()=> handleEdit(row.id, row.name, row.phone, row.gender)}/></TableCell>
                                        <TableCell><DeleteIcon sx={{ color: "red", cursor: "pointer" }} onClick={()=> deleteContact(row.id)} /></TableCell>
                                        <DialogComponent updateInfo={updateInfo} open={open} setOpen={setOpen} setUpdateInfo={setUpdateInfo} openSnackbar={openSnackbar}/>
                                    </TableRow>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
