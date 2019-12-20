import React from 'react';
import MainAppBar from './AppBar/AppBar';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import DashBoard from './DashBoard/DashBoard';
import News from './News/News';


class App extends React.Component {

    render() {

        const routing = (
            <Router>
              <div id='routing-container'>
                <Switch>
                    <Route path='/(signup|)/' exact component={SignUp}></Route>
                    <Route path='/dashboard' exact component={DashBoard}></Route>
                    <Route path='/login' exact component={Login}></Route>
                    <Route path='/news' exact component={News}></Route>
                </Switch>
              </div>
            </Router>
          );

        return(
            <div>
                <MainAppBar></MainAppBar>
                {routing}
            </div>
        );
    }

}

export default App;