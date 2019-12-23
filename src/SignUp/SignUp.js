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
import { Link } from 'react-router-dom';
const firebase = require("firebase");


class SignUp extends React.Component {

    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
            passwordConfirmation: null,
            signupError: ''
        };
    }

    render() {

        const { classes } = this.props;

        return(
            <main className={classes.main}>
                <CssBaseline></CssBaseline>
                <Paper className={classes.paper}>
                    <Typography component='h1' variant='h5'>
                        Sign Up!
                    </Typography>
                    <form onSubmit={(e) => this.submitSignUp(e)} className={classes.form}>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor="signup-email-input">
                                Enter Your Email
                            </InputLabel>
                            <Input autoComplete='email' onChange={(e) => this.userTyping('email', e)} autoFocus id='signup-email-input'>
                            </Input>
                        </FormControl>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor='signup-password-input'>
                                Create Your Password
                            </InputLabel>
                            <Input onChange={(e) => this.userTyping('password', e)} type='password' id='signup-password-input'></Input>
                        </FormControl>
                        <FormControl required fullWidth margin='normal'>
                            <InputLabel htmlFor='signup-password-confirmation-input'>
                                Confirm Your Password
                            </InputLabel>
                            <Input onChange={(e) => this.userTyping('passwordConfirmation', e)} type='password' id='signup-password-confirmation-input'></Input>
                        </FormControl>
                        <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>Submit</Button>
                    </form>
                    {
                        this.state.signupError ? 
                        <Typography className={classes.errorText} component='h5' variant='h6'>
                            {this.state.signupError}
                        </Typography> :
                        null
                    }
                    <Typography component='h5' variant='h6' className={classes.hasAccountHeader}>Already Have An Account?</Typography>
                    <Button component={Link} to='/login'>Log In</Button>
                </Paper>
            </main>
        );
    }

    submitSignUp = (e) => {
        e.preventDefault();
        //console.log(this.state);

        if(!this.formIsValid()) {
            this.setState({ signupError: 'Password do not match!' });
            return;
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(authRes => {
                const userObj = {
                    email: authRes.user.email
                };
                firebase
                    .firestore()
                    .collection('users')
                    .doc(this.state.email)
                    .set(userObj)
                    .then(() => {
                        this.props.history.push('/dashboard');
                    })
            }, authError => {
                console.log(authError);
                this.setState({signupError: 'Failed to add user'});
            }, dbError => {
                console.log(dbError);
                this.setState({signupError: 'Failed to add user'});
            })
    }

    formIsValid = () => this.state.password === this.state.passwordConfirmation;

    userTyping = (type, e) => {
        switch(type) {
            case 'email':
                this.setState({ email: e.target.value})
                break;

            case 'password':
                this.setState({ password: e.target.value})
                break;

            case 'passwordConfirmation':
                this.setState({ passwordConfirmation: e.target.value})
                break;
            
            default: 
                break;
        }
    }

}

export default withStyles(styles)(SignUp);