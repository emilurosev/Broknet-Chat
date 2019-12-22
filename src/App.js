import React from 'react';
import MainAppBar from './MainAppBar/MainAppBar';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import DashBoard from './DashBoard/DashBoard';
import News from './News/News';
import HomePage from './HomePage/HomePage';
import {MuiThemeProvider, ThemeProvider} from '@material-ui/core/styles';
import { theme } from './theme';
import { CssBaseline } from '@material-ui/core';

const firebase = require('firebase');


class App extends React.Component {

    constructor() {
      super();
      this.state = {
        loggedIn: false,
        email: ''
      };
    }

    componentDidMount() {
      firebase.auth().onAuthStateChanged(async _usr => {
        if(!_usr) {
          this.setState({loggedIn: false, email: ''})
        }
        else {
          await firebase
            this.setState({loggedIn: true, email: _usr.email})
            console.log(this.state.email);
        }
      });
    }

    render() { 

        const routing = (  
          <Router>
            <MainAppBar loggedIn={this.state.loggedIn} showEmail={this.state.email?this.state.email:''} signOutFn={this.signOut}></MainAppBar>
            <Route path='/' exact component={HomePage}></Route>
            <Route path='/signup' exact component={SignUp}></Route>
            <Route path='/dashboard' exact component={DashBoard}></Route>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/news' exact component={News}></Route>     
          </Router>
          );

        return(       
          <div>
            {routing}   
          </div>     
        );
    }
    
    signOut = () => {
      firebase.auth().signOut();
      this.setState({loggedIn: false, email: ''})
    }

}

export default App;