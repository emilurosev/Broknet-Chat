import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import { blue } from '@material-ui/core/colors';

const firebase = require('firebase');


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [email, setEmail] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  

  const check = () => {
    firebase.auth().onAuthStateChanged(_usr => {        
      if(_usr) {  
          setEmail(_usr.email);
          setEmailVerified(_usr.emailVerified);
      }
    });
  }

  const getData = async() => {
    await firebase.firestore().collection('users').get().then(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
          if(doc.data().email === email) {
              setUserInfo(doc.data());
          }
      });
   });

  }


  const union = () => {
    check();
    getData();
    handleClickOpen();
  }

  return (
    <div>
      <Button variant="contained" color="primary" onClick={union}>
        Requests
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Follow requests
        </DialogTitle>
        <DialogContent dividers>
            {
              userInfo.followers !== undefined ?
              <List>
                {userInfo.followRequests.map((email) => (
                <ListItem button key={email}>
                  <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                      <PersonIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={email} />
                </ListItem>
                ))}
              </List> :
              <Typography gutterBottom>No requests</Typography>
              

            }
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}