import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Patient(props) {

    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [dOpen, setdOpen] = React.useState(false);
    const [did, setDid] = React.useState(0);
    const [update, setUpdate] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
    };

    React.useEffect(
        () => {
            getData();
        }, []);

    const getData = () => {
        let localData = JSON.parse(localStorage.getItem("Patient"));
        if (localData !== null) {
            setData(localData);
        }
    }

    const handleAdd = (values) => {

        let id = Math.floor(Math.random() * 1000);

        let data = {
            id: id,
            ...values
        }

        let localData = JSON.parse(localStorage.getItem("Patient"));

        if (localData === null) {
            localStorage.setItem("Patient", JSON.stringify([data]));
        } else {
            localData.push(data)
            localStorage.setItem("Patient", JSON.stringify(localData));
        }

        getData();
        setUpdate(false)
        handleClose();
    }

    const handleUpdate = (data) => {

        let localData = JSON.parse(localStorage.getItem("Patient"));

        let uData = localData.map((l) =>{
            if(l.id === data.id){
                return data;
            }else{
                return l;
            }
        })

        localStorage.setItem("Patient", JSON.stringify(uData))
        setData(uData);
        handleClose();
    }

    let schema = yup.object().shape({
        name: yup.string().required("Please Enter Name."),
        age: yup.number().required("Please Enter Age."),
        number: yup.string().required("Please Enter Mobile Number.")
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            age: '',
            number: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            update ? 
            handleUpdate(values) :
            handleAdd(values);
        },
    });

    const { handleChange, handleBlur, handleSubmit, errors, touched, values} = formik;

    const handleDelete = (data) => {
        setdOpen(true)
        setDid(data.id)
    }

    const handleDeleteData = () => {

        let localData = JSON.parse(localStorage.getItem("Patient"));

        let Ddata = localData.filter((l) => l.id !== did)

        localStorage.setItem("Patient", JSON.stringify(Ddata))

        setData(Ddata)
        setdOpen(false)

    }

    const handleEdit = (data) => {
        setOpen(true)

        formik.setValues(data)
        setUpdate(true)
    }

    const columns = [

        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'NAME', width: 130 },
        { field: 'age', headerName: 'AGE', width: 130 },
        {
            field: 'number',
            headerName: 'NUMBER',
            width: 90
        },
        {
            field: '',
            headerName: 'ACTIONS',
            width: 90,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                </>
            )
        }

    ];

    return (
        <div>
            <h1>Patient</h1>

            <>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Patient
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Add Patient</DialogTitle>
                    <Formik values={formik}>
                        <Form onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    value={values.name}
                                    label="Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p>{errors.name && touched.name ? errors.name : ''}</p>
                                <TextField
                                    margin="dense"
                                    id="age"
                                    name="age"
                                    value={values.age}
                                    label="Age"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p>{errors.age && touched.age ? errors.age : ''}</p>
                                <TextField
                                    margin="dense"
                                    id="number"
                                    name="number"
                                    value={values.number}
                                    label="Mobile Number"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <p>{errors.number && touched.number ? errors.number : ''}</p>

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleAdd} type='submit' >{update ? "Update" : "Add" }</Button>
                            </DialogActions>
                        </Form>
                    </Formik>
                </Dialog>
            </>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                />
            </div>
            <Dialog open={dOpen} onClose={handleClose}>
                <DialogTitle>Delete</DialogTitle>
                <DialogContent>
                    Are You Sure?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={() => handleDeleteData()} type='submit' >Yes</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default Patient;