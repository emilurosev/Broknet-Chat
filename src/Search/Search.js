import React from 'react';

const firebase = require('firebase');

class Search extends React.Component {

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
        return( 
            <div>
                <h1>Search</h1>
                {
                    this.state.emailVerified ?
                    <div>Email verified, search available</div> :
                    <div>Email not verified, search not available</div>
                }
            </div>
        );
    }
}

export default Search;