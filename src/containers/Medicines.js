import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import * as yup from 'yup';
import { useFormik, Form, Formik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Medicines(props) {

    const [open, setOpen] = React.useState(false);
    const [dOpen, setdOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [did, setDid] = React.useState([]);
    const [update, setUpdate] = React.useState(false);

    let schema = yup.object().shape({
        name: yup.string().required("Please Enter Name."),
        quantity: yup.string().required("Please Enter Quantity."),
        price: yup.string().required("Please Enter Price."),
        expiry: yup.string().required("Please Enter Expiry.")
    });

    const formikObj = useFormik({
        initialValues: {
            name: '',
            quantity: '',
            price: '',
            expiry: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            handleAdd(values)
        },
    });

    const { handleBlur, handleChange, errors, touched, values, handleSubmit } = formikObj;

    const handleDelete = (data) => {
        setdOpen(true)
        setDid(data.id)
    }

    const handleEdit = (data) => {
        setOpen(true)
        setUpdate(true)
        console.log(data);
        formikObj.setValues(data)
    }

    const handleDeletData = () => {
        console.log(did);

        let localData = JSON.parse(localStorage.getItem("Medicines"))

        let Ddata = localData.filter((l) => l.id !== did)

        localStorage.setItem("Medicines", JSON.stringify(Ddata))

        setData(Ddata)

        setdOpen(false)
        console.log(Ddata);
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'quantity', headerName: 'Quantity', width: 130 },
        { field: 'price', headerName: 'Price', width: 130 },
        { field: 'expiry', headerName: 'Expiry', width: 130 },
        {
            field: '',
            headerName: 'Actions',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                </>
            )
        }

    ];

    React.useEffect(
        () => {
            getData()
        }, []
    )

    const getData = () => {
        let localData = JSON.parse(localStorage.getItem("Medicines"))
        setData(localData)
    }

    const handleClickOpen = () => {
        setOpen(true);
        setUpdate(false);
        formikObj.resetForm()
    };

    const handleClose = () => {
        setOpen(false);
        setdOpen(false)
    };

    const handleAdd = (values) => {

        let localData = JSON.parse(localStorage.getItem("Medicines"));

        let id = Math.floor(Math.random() * 100000)

        let data = { id: id, ...values };

        if (localData === null) {
            localStorage.setItem("Medicines", JSON.stringify([data]));
        } else {
            localData.push(data)
            localStorage.setItem("Medicines", JSON.stringify(localData));
        }


        setOpen(false);
        formikObj.resetForm()
    };

    

    return (
        <div>
            <h1>Add Medicines</h1>
            <div>
                <Button variant="outlined" onClick={handleClickOpen} startIcon={<AddIcon />}>
                    ADD MEDICINES
                </Button>

                <br /><br />

                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                    />
                </div>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>ADD MEDICINES</DialogTitle>
                    <Formik values={formikObj}>
                        <Form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    margin="dense"
                                    id="name"
                                    name='name'
                                    label="Medicines Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p>{errors.name && touched.name ? errors.name : ''}</p>
                                <TextField
                                    margin="dense"
                                    id="quantity"
                                    name='quantity'
                                    label="Quantity"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={values.quantity}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p>{errors.quantity && touched.quantity ? errors.quantity : ''}</p>
                                <TextField
                                    margin="dense"
                                    id="price"
                                    name='price'
                                    label="Price"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={values.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p>{errors.price && touched.price ? errors.price : ''}</p>
                                <TextField
                                    margin="dense"
                                    id="expiry"
                                    name='expiry'
                                    label="Expiry"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    value={values.expiry}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p>{errors.expiry && touched.expiry ? errors.expiry : ''}</p>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type='submit'>{ update ? "Update" : "Add"}</Button>
                            </DialogActions>
                        </Form>
                    </Formik>
                </Dialog>

                <Dialog open={dOpen} onClose={handleClose}>
                    <DialogTitle>ADD MEDICINES</DialogTitle>
                    <DialogContent>
                        Are You Sure?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>No</Button>
                        <Button onClick={handleDeletData}>Yes</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>

    );
}

export default Medicines;