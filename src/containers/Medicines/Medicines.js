import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Formik, Form, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

function Medicines(props) {
    const [open, setOpen] = React.useState(false);
    const [dopen, setDOpen] = React.useState(false);
    const [did, setDid] = useState(0);
    const [update, setUpdate] = useState(false);

    const [data, setData] = useState([]);

    const handleDClickOpen = () => {
        setDOpen(true);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDOpen(false);
    };

    let schema = yup.object().shape({
        name: yup.string().required("Please enter name"),
        price: yup.number().required("Please enter name").positive().integer(),
        quantity: yup.string().required("Please enter quantity"),
        expiry: yup.string().required("Please enter expiry")
    });

    const handleInsert = (values) => {
        let id = Math.floor(Math.random() * 1000);

        let data = {
            id: id,
            ...values
        }

        const localData = JSON.parse(localStorage.getItem("medicines"));

        if (localData === null) {
            localStorage.setItem("medicines", JSON.stringify([data]));
        } else {
            localData.push(data)
            localStorage.setItem("medicines", JSON.stringify(localData))
        }

        loadData();
        handleClose();
        formikObj.resetForm();
    }

    const handeUpdateData = (values) => {
        let localData = JSON.parse(localStorage.getItem("medicines"));

        let uData = localData.map((l) => {
            if (l.id === values.id) {
                return values
            } else {
                return l
            }
        });

        localStorage.setItem("medicines", JSON.stringify(uData))
        
        handleClose();
        setUpdate(false);
        formikObj.resetForm();
        loadData();
    }

    const formikObj = useFormik({
        initialValues: {
            name: '',
            price: '',
            quantity: '',
            expiry: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            if (update) {
                handeUpdateData(values)
            } else {
                handleInsert(values)
            }
        },
    });

    const handleDelete = () => {
        const localData = JSON.parse(localStorage.getItem("medicines"));

        let fData = localData.filter((l) => l.id !== did);

        localStorage.setItem("medicines", JSON.stringify(fData));

        handleClose();
        setDid(0);
        loadData();
    }

    const handleEdit = (params) => {
        handleClickOpen();

        setUpdate(true);

        formikObj.setValues(params.row)
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        { field: 'quantity', headerName: 'Quantity', width: 130 },
        { field: 'expiry', headerName: 'Expiry', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => { handleDClickOpen(); setDid(params.id) }}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params)}>
                        <EditIcon />
                    </IconButton>
                </>
            )
        }
    ];

    const loadData = () => {
        let localData = JSON.parse(localStorage.getItem("medicines"));

        if (localData !== null) {
            setData(localData);
        }
    }

    useEffect(
        () => {
            loadData();
        },
        [])

    const { handleBlur, handleChange, handleSubmit, errors, touched, values } = formikObj

    console.log(data);
    return (
        <div>
            <h1>Medicines</h1>

            <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Medicines
                </Button>

                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>

                <Dialog
                    open={dopen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Are you sure to delete?"}
                    </DialogTitle>

                    <DialogActions>
                        <Button onClick={handleClose}>No</Button>
                        <Button onClick={handleDelete} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog fullWidth open={open} onClose={handleClose}>
                    <DialogTitle>Add Medicines</DialogTitle>

                    <Formik values={formikObj}>
                        <Form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    value={values.name}
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    label="Medicine Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.name && touched.name ? <p>{errors.name}</p> : ''}
                                <TextField
                                    value={values.price}
                                    margin="dense"
                                    id="price"
                                    name="price"
                                    label="Medicine price"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.price && touched.price ? <p>{errors.price}</p> : ''}
                                <TextField
                                    value={values.quantity}
                                    margin="dense"
                                    name="quantity"
                                    id='quantity'
                                    label="Medicine quantity"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.quantity && touched.quantity ? <p>{errors.quantity}</p> : ''}
                                <TextField
                                    value={values.expiry}
                                    margin="dense"
                                    name="expiry"
                                    id='expiry'
                                    label="Medicine expiry"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.expiry && touched.expiry ? <p>{errors.expiry}</p> : ''}

                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    {
                                        update ?
                                            <Button type="submit">Update</Button>
                                            :
                                            <Button type="submit">Submit</Button>
                                    }
                                </DialogActions>
                            </DialogContent>
                        </Form>
                    </Formik>
                </Dialog>
            </div>
        </div >
    );
}

export default Medicines;