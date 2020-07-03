import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Typography, Button, Divider } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import { blue } from '@material-ui/core/colors';



const firebase = require('firebase');

class MyProfile extends React.Component {

    constructor() {
        super();
        this.state = {
            email: "",
            photo: "",
            emailVerified: false,
            private: false,
            userInfo : []
        };
    }

    componentDidMount = async () => {
        firebase.auth().onAuthStateChanged(async _usr => {
            if(!_usr) {
                this.props.history.push('/login');
            }
            else {  
                this.setState({email: _usr.email, emailVerified: _usr.emailVerified, photo: _usr.photoURL});
            }
        });
        await firebase.firestore().collection('users').get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    if(doc.data().email === this.state.email) {
                        this.setState({userInfo: doc.data()})
                    }
                });
        });

    }

    setProfileToPrivate = async() => {
        await firebase.firestore().collection('users').doc(this.state.userInfo.uid).update(
            {private: true}
        );
        window.location.reload();
    }

    setProfileToPublic = async() => {
        await firebase.firestore().collection('users').doc(this.state.userInfo.uid).update(
            {private: false}
        )
        window.location.reload();

    }

    getId = async(email) => {
        let id;
        await firebase.firestore().collection('users').get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    let item = doc.data();
                    if(item.email === email) {
                        id = item.uid;
                    }
                });
        });
        return id;
        
    }


    acceptRequest = async(email) => {
        await firebase.firestore().collection('users').doc(this.state.userInfo.uid).update(
            {
                followRequests: firebase.firestore.FieldValue.arrayRemove(email),
                followers: firebase.firestore.FieldValue.arrayUnion(email)
            }
        )
        let id = await this.getId(email);
     
        await firebase.firestore().collection('users').doc(id).update({
            following: firebase.firestore.FieldValue.arrayUnion(this.state.email)
        });
        window.location.reload();
    }

    declineRequest = async(email) => {
        await firebase.firestore().collection('users').doc(this.state.userInfo.uid).update(
            {
                followRequests: firebase.firestore.FieldValue.arrayRemove(email),
            }
        )
        window.location.reload();
    }

    

    removeFollower = async(email) => {
        await firebase.firestore().collection('users').doc(this.state.userInfo.uid).update(
            {
                followers: firebase.firestore.FieldValue.arrayRemove(email)
            }
        );
        let id = await this.getId(email);
       
        await firebase.firestore().collection('users').doc(id).update({
            following: firebase.firestore.FieldValue.arrayRemove(this.state.email)
        });
        window.location.reload();
    }

    removeFollowing = async(email) => {
        await firebase.firestore().collection('users').doc(this.state.userInfo.uid).update(
            {
                following: firebase.firestore.FieldValue.arrayRemove(email)
            }
        );
        let id = await this.getId(email);
      
        await firebase.firestore().collection('users').doc(id).update({
            followers: firebase.firestore.FieldValue.arrayRemove(this.state.email)
        });
        window.location.reload()
    }


    goToProfile = async(email) => {
        let id = await this.getId(email);
        this.props.history.push('/user/'+id);
    }


    render() {
        return <div>
            <Container style={{textAlign: "center"}}>
                <Paper style={{marginTop: '2rem', padding: '1rem'}}>
                    <Typography variant='h2'>{this.state.email}</Typography>
                
                    {
                        this.state.emailVerified ?
                        <Typography color='primary' variant="body2">Email is verified!</Typography> :
                        <Typography color='error' variant='body2'>Email is NOT verified!</Typography>
                    }
                    {/*
                        this.state.userInfo.private ?
                        <Button variant='outlined' style={{textTransform: 'none'}} color='secondary' onClick={this.setProfileToPublic}>Set profile to public</Button> :
                        <Button color='secondary' variant='outlined' style={{textTransform: 'none'}} onClick={this.setProfileToPrivate}>Set profile to private</Button>
                    */}
                    <br></br>
                    {
                        this.state.photo === '' || this.state.photo == null ? 
                        null :
                        <img style={{marginTop: '1rem'}} src={this.state.photo} alt='profile pic'></img>

                    }
                    <Divider light></Divider>

                    <List>

                        <p>Followers: </p>
                        {
                            this.state.userInfo.followers != null && this.state.userInfo.followers.length > 0  ?
                            <List>
                                {this.state.userInfo.followers.map((email) => (
                                <ListItem button key={email}>
                                <ListItemAvatar>
                                    <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={email} onClick={() => this.goToProfile(email)} />
                                <Button color='secondary' onClick={() => this.removeFollower(email)}>Remove</Button>
                                </ListItem>
                                ))}
                            </List> :
                            <Typography gutterBottom>No followers</Typography>
                        }
                        
                        <Divider light></Divider>

                        <p>Following: </p>
                        { 
                            this.state.userInfo.following != null  && this.state.userInfo.following.length > 0 ?
                            <List>
                                {this.state.userInfo.following.map((email) => (
                                <ListItem button key={email}>
                                <ListItemAvatar>
                                    <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={email} onClick={() => this.goToProfile(email)} />
                                <Button color='secondary' onClick={() => this.removeFollowing(email)}>Remove</Button>
                                </ListItem>
                                ))}
                            </List> :
                            <Typography gutterBottom>No following</Typography>
                            
                        }
                        
                        <Divider light></Divider>


                        <p>New requests: </p>
                        {  
                            this.state.userInfo.followRequests != null  && this.state.userInfo.followRequests.length > 0 ?
                            <List>
                                {this.state.userInfo.followRequests.map((email) => (
                                <ListItem button key={email}>
                                <ListItemAvatar>
                                    <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={email} onClick={() => this.goToProfile(email)} />
                                <Button color='primary' onClick={() => this.acceptRequest(email)}>Accept</Button><Button color='secondary' onClick={() => this.declineRequest(email)}>Decline</Button>
                                </ListItem>
                                ))}
                            </List> :
                            <Typography gutterBottom>No requests</Typography>     
                        }
                    </List>
                </Paper>
            </Container>
        </div>;
    }
}

export default MyProfile;