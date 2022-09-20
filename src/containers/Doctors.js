import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';

function Doctors(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <div>
            <h1>Doctors</h1>
            <div>
                <Button variant="outlined" startIcon={<AddIcon/>} onClick={handleClickOpen}>
                    ADD DOCTOR DETAILS
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>ADD DOCTOR DETAILS</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            name='name'
                            label="Doctor Name"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="age"
                            name='age'
                            label="Age"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="experience"
                            name='experience'
                            label="Experience"
                            type="text"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Add</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default Doctors;