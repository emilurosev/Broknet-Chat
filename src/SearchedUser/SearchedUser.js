import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper'

const firebase = require('firebase');

class SearchedUser extends React.Component{
    constructor() {
        super();
        this.state = {
            searchedUser: []
        };
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(async _usr => {
            if(!_usr) {
                this.props.history.push('/login');
            }
            /*else {
                this.setState({email: _usr.email, emailVerified: _usr.emailVerified, photo: _usr.photoURL});
            }*/
        });
        const userDoc = firebase.firestore().collection('users').doc(this.props.match.params.id);
        userDoc.get().then(usr => { this.setState({ searchedUser: usr.data() }) } );
    

    }

    render() {
        return <div>
            <Container style={{textAlign: "center"}}>
                <Paper style={{marginTop: '2rem', padding: '1rem'}}>
                    <h2>{this.state.searchedUser.email}</h2>
                    <img src={this.state.searchedUser.photoURL}></img>
                    <div>Test: {JSON.stringify(this.state.searchedUser.portfolio)}</div>
                </Paper>
            </Container>
        </div>
    }
}

export default SearchedUser;