import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ChatBubble from '@material-ui/icons/ChatBubble';

const firebase = require('firebase');

class SearchedUser extends React.Component{
    constructor() {
        super();
        this.state = {
            searchedUser: [],
            stocks: [],
            totalUserInvestment: 0,
            totalShareValue: 0,
            profit: 0, 
            private: false

        };

        this.findStockByID = this.findStockByID.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount = async () => {
        firebase.auth().onAuthStateChanged(async _usr => {
            if(!_usr) {
                this.props.history.push('/login');
            }
        });
        const userDoc = firebase.firestore().collection('users').doc(this.props.match.params.id);
        await userDoc.get().then(usr => { this.setState({ searchedUser: usr.data() }) } );
        if(this.state.searchedUser.private) {
            this.setState({private:true});
        }
        else {
            const arr = [];
            await firebase.firestore().collection('stocks').get().then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    let item = doc.data();
                    arr.push(item);
                    this.setState({ stocks: arr });
                })
            });
            if(this.state.portfolio !== undefined) {
                this.state.searchedUser.portfolio.forEach(item => this.setState({totalUserInvestment: this.state.totalUserInvestment+item.investment}));
                // this.state.searchedUser.portfolio.forEach(item => this.setState({totalShareValue: this.totalShareValue+item.amount*((this.findStockByID(item.id)).last) }));
                this.setState({profit: this.state.totalShareValue-this.state.totalUserInvestment});
                this.state.searchedUser.portfolio.forEach(item => {if(item.amount == 0) this.state.searchedUser.portfolio.splice(this.state.searchedUser.portfolio.indexOf(item))});
              
            }
        }
    }

    findStockByID = (id) => {
        console.log(this.state.stocks.filter(item => item.id == id)[0])
        return this.state.stocks.filter(item => item.id == id)[0];
    }

    render() {
        return <div>
            <Container style={{textAlign: "center"}}>
                <Paper style={{marginTop: '2rem', padding: '1rem'}}>
                    {
                        this.state.private ?
                        <div>
                            <h3>Private profile</h3>
                        </div>
                        :
                        <div>
                             <h2>{this.state.searchedUser.email}</h2>
                            <img src={this.state.searchedUser.photoURL}></img>
                            <p>Total Investment: {this.state.totalUserInvestment}</p>
                            <p>Total Share Value: {this.state.totalShareValue}</p>
                            <p>Total Profit: {this.state.profit}</p>
                            <IconButton color='primary' component={Link} to={`/dashboard/${this.state.searchedUser.email}`}>Send Message<ChatBubble></ChatBubble></IconButton>
                        </div>
                    }
                   
                </Paper>
            </Container>
        </div>
    }
}

export default SearchedUser;