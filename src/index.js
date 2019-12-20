import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router} from 'react-router-dom';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import DashBoard from './DashBoard/DashBoard';

const firebase = require('firebase');
require("firebase/firestore");

firebase.initializeApp({
    apiKey: "AIzaSyDUwCTNwbK65aouZCO0sAzU50dE9X5b578",
    authDomain: "broknet-684ba.firebaseapp.com",
    databaseURL: "https://broknet-684ba.firebaseio.com",
    projectId: "broknet-684ba",
    storageBucket: "broknet-684ba.appspot.com",
    messagingSenderId: "45171908800",
    appId: "1:45171908800:web:b405d459b98b16afcd8d25",
    measurementId: "G-CQSXDBTFPE"
});

const routing = (
  <Router>
    <div id='routing-container'>
      <Route path='/(signup|)/' exact component={SignUp}></Route>
      <Route path='/dashboard' exact component={DashBoard}></Route>
      <Route path='/login' exact component={Login}></Route>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
