import { Link } from 'react-router-dom';
import React from 'react';
import styles from './styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const firebase = require('firebase');

class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            email: null,
            password: null, 
            loginError: ''
        }
    }

    render() {

        const { classes } = this.props;

        return(
            <main className={classes.main}>
                <CssBaseline></CssBaseline>
                <Paper className={classes.paper}>
                    <Typography component='h1' variant='h5'>
                        Log In!
                    </Typography>
                    <form className={classes.form} onSubmit={(e) => this.submitLogin(e)}>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor='login-email-input'>Enter Your Email</InputLabel>
                            <Input autoComplete='email' autoFocus id='login-email-input' onChange={(e) => this.userTyping('email', e)}></Input>
                        </FormControl>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor='login-password-input'>Enter Your Password</InputLabel>
                            <Input type='password' autoFocus id='login-password-input' onChange={(e) => this.userTyping('password', e)}></Input>
                        </FormControl>
                        <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                            Log In!
                        </Button>
                    </form>
                    {
                        this.state.loginError ?
                        <Typography className={classes.errorText} component='h5' variant='h6'>
                            Incorrect Login Information
                        </Typography> :
                        null
                    }
                    <Typography className={classes.noAccountHeader} component='h5' variant='h6'>
                        Don't Have Account?
                    </Typography>
                    <Button component={Link} to='signup'>Sign Up</Button>
                    <Typography component='h5' variant='h6'>
                        OR
                    </Typography>
                    <Button onClick={this.loginWithGoogle}>Sign In With Google</Button>
                </Paper>
            </main>
        );
    
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(async _usr => {
            if(_usr) {
                this.props.history.push('/profile');
            }
        });
    }

    submitLogin = (e) => {
        e.preventDefault();
        
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => {
                console.log(res.user.emailVerified);
            })
            .then(() => {
                this.props.history.push('/dashboard');
            }, err => {
                this.setState({loginError: "Server error"});
                console.log(err);
            })
    }

    userTyping = (type, e) => {
        switch(type) {
            case 'email':
                this.setState({ email: e.target.value });
                break;
            case 'password':
                this.setState({ password: e.target.value});
                break;
            default:
                break;
        }
    }

    loginWithGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var user = result.user;
            const userObj = {
                email: user.email
            };
            firebase
                .firestore()
                .collection('users')
                .doc(user.email)
                .set(userObj); 
        }).then(() => {
            this.props.history.push('/dashboard');
        }).catch(function(error) {
            console.log(error.message);
        });
    }

  
    

}

export default withStyles(styles)(Login);