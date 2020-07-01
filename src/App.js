import React from 'react';
import MainAppBar from './MainAppBar/MainAppBar';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import DashBoard from './DashBoard/DashBoard';
import News from './News/News';
import HomePage from './HomePage/HomePage';
import MyProfile from './MyProfile/MyProfile';
import Search from './Search/Search';
import SearchedUser from './SearchedUser/SearchedUser';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from './theme';
import { themeDark } from './theme-dark';


class App extends React.Component {

    constructor() {
      super();
      this.state = {
        dark: false
      };
    }

    goDark = () => {
      this.setState({dark: !this.state.dark});
      console.log(this.state.dark);
    }

    render() { 
        const routing = (  
          <Router>
            <MainAppBar goDarkFn={this.goDark}></MainAppBar> 
            <Route path='/' exact component={HomePage}></Route>
            <Route path='/signup' exact component={SignUp}></Route>
            <Route path='/dashboard' exact component={DashBoard}></Route>
            <Route path='/dashboard/:email' exact component={DashBoard}></Route>
            <Route path='/login' exact component={Login} changeLoggedInStateFn={this.changeLoggedInState}></Route>
            <Route path='/login/:cred' exact component={Login} changeLoggedInStateFn={false}></Route>
            <Route path='/news' exact component={News}></Route> 
            <Route path='/profile' exact component={MyProfile}></Route>
            <Route path='/search' exact component={Search}></Route>
            <Route path='/user/:id' exact component={SearchedUser}></Route>
          </Router>
          );

        return(
          <MuiThemeProvider theme={this.state.dark ? themeDark : theme}>
            <CssBaseline></CssBaseline>
            <div>
              {routing}   
            </div> 
          </MuiThemeProvider>       
              
        );
    } 

}

export default App;