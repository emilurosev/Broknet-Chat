import React from 'react';
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';

const firebase = require('firebase');

class MyProfile extends React.Component {

    constructor() {
        super();
        this.state = {
            email: "",
            photo: "",
            emailVerified: false
        };
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(async _usr => {
            if(!_usr) {
                this.props.history.push('/login');
            }
            else {
                await this.setState({email: _usr.email, emailVerified: _usr.emailVerified, photo: _usr.photoURL});
            }
        });
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
                    <img style={{marginTop: '1rem'}} src={this.state.photo} alt='profile pic'></img>
                </Paper>
            </Container>
        </div>;
    }
}

export default MyProfile;