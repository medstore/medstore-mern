import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Editdetailform(props) {
  const [open, setOpen] = React.useState(false);
  const [myUser, setMyUser] = useState({firstName: "Sushil Kumar", lastName:"Gupta", email:"abcd@gmail.com", delAddress:"Delivery Address: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt quis consectetur temporibus"})

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setMyUser({ ...myUser, [name]: value })
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async () => {
    
  }

  const handleClose = async () => {
    setOpen(false);
  };

  return (

    <div>
      {
        props.signal ?
          <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
              Edit Details
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Update Profile</DialogTitle>
              <DialogContent>
                <DialogContentText>
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="firstName"
                  name="firstName"
                  onChange={handleChange}
                  value={myUser.firstName}
                  label="First Name"
                  type="text"
                  fullWidth />
                <TextField
                  autoFocus
                  margin="dense"
                  id="lastName"
                  name="lastName"
                  onChange={handleChange}
                  value={myUser.lastName}
                  label="Last Name"
                  type="text"
                  fullWidth
                />
                <TextField
                  autoFocus
                  margin="dense"
                  id="delAddress"
                  name="delAddress"
                  onChange={handleChange}
                  value={myUser.delAddress}
                  label="Delivery Address"
                  type="text"
                  fullWidth
                />
                
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                  Save Changes
                </Button>
              </DialogActions>
            </Dialog>
          </>
          : null
      }

    </div>
  );
}
