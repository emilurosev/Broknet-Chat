import React from 'react';
import Paper from '@material-ui/core/Paper'
import { Typography, ListItemText } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Cancel from '@material-ui/icons/Cancel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
//import ListItemText from '@material-ui/core/ListItemText';

const firebase = require('firebase');

class Search extends React.Component {

    constructor() {
        super();
        this.state = {
            email: "",
            photo: "",
            emailVerified: false,
            searchPattern: '',
            found: false,
            searchPatternFinal: '', 
            result: [],
            users: []
        };
    }



    componentDidMount = () => {

        firebase.firestore().collection('users').get()
        .then(querySnapshot => {
          this.setState({ users:  querySnapshot.docs.map(doc => doc.data())});
        });

        firebase.auth().onAuthStateChanged(async _usr => {
            if(!_usr) {
                this.props.history.push('/login');
            }
            else {
                await this.setState({email: _usr.email, emailVerified: _usr.emailVerified, photo: _usr.photoURL});
            }
        });
    }

    _handleTextFieldChange = (e) => {
        this.setState({
            searchPattern: e.target.value
        });
        this.search();
        this.state.result.length>0 ? this.setState({found: true}) : this.setState({found: false});
    }

    // search = async() => {
    //     await firebase.firestore().collection("users").doc(this.state.searchPattern).get().then((doc) => {
    //         if (doc.exists) {
    //             var res = [];
    //             res.push(doc.data().email)
    //             this.setState({found: true, searchPatternFinal: this.state.searchPattern, result: res});
    //             console.log(this.state.result[0]);
    //         } else {
    //             console.log("No such document!");
    //             this.setState({found: false});

    //         }
    //     }).catch(function(error) {
    //         console.log("Error getting document:", error);
    //     });
    // }

    search = () =>{ 
        
        let resultV = this.state.users.filter(user => 
        user.email.toLowerCase().startsWith(this.state.searchPattern.toLowerCase()));

        this.setState({result: resultV});
        
    };

    clear = () => {
        this.setState({found: false, searchPattern: '', searchPatternFinal: '', result: []})
    }

    render() {
        return( 
            <div>
                <Container style={{textAlign: "center"}}>
                    <Paper style={{marginTop: '2rem', padding: '1rem'}}>
                    {
                        this.state.emailVerified ?
                        <div>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item>
                                    <AccountCircle />
                                </Grid>
                                <Grid item>
                                    <TextField value={this.state.searchPattern} id="input-with-icon-grid" label="Enter username" onChange={this._handleTextFieldChange}/>
                                </Grid>
                                <Grid item>
                                    <Button disabled={this.state.found} variant="outlined" color="primary" style={{textTransform: 'none'}} onClick={this.search}>
                                        Search
                                    </Button>
                                </Grid>
                                <div style={{flex: '1 1 auto'}}></div>
                                    {
                                        this.state.found && this.state.searchPatternFinal !== '' ?
                                        <Grid item><Cancel color="secondary" onClick={this.clear}></Cancel></Grid> :
                                        null
                                    }
                                
                            </Grid>
                            <div>
                                {   this.state.found && this.state.searchPattern !== '' ?
                                    <h3>Results: {this.state.result.length} result(s)</h3> :
                                    null
                                }
                            </div>
                            <div>
                                {   this.state.found && this.state.searchPattern !== '' ?
                                    <div>
                                        <List>
                                            {this.state.result.map(i => (
                                                <ListItem button>
                                                    
                                                    <ListItemAvatar>
                                                    <Avatar alt={i.displayName} src={i.photoURL} />
                                                    </ListItemAvatar>
                                                    <ListItemText>{i.email}</ListItemText>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </div> :
                                    null
                                }
                            </div>
                        </div> :
                        <Typography color='error' variant='body2'>Email is NOT verified, search isn't available!</Typography>
                    }         
                    </Paper>
                </Container>
            </div>
        );
    }
}

export default Search;