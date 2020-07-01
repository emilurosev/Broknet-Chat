import React from 'react';
import ChatList from '../ChatList/ChatList';
import { Button, withStyles } from '@material-ui/core';
import styles from './styles';
import ChatView from '../ChatView/ChatView';
import ChatTextBox from '../ChatTextBox/ChatTextBox';
import NewChat from '../NewChat/NewChat';

const firebase = require('firebase');

class DashBoard extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedChat: null,
            newChatFormVisible: false,
            email: null,
            chats: []
        };

        this.componentDidMount = this.componentDidMount.bind(this);

    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <ChatList history={this.props.history}
                    newChatBtnFn={this.newChatBtnClicked}
                    selectChatFn={this.selectChat}
                    chats={this.state.chats}
                    userEmail={this.state.email}
                    selectChatIndex={this.state.selectedChat}
                />
                {
                    this.state.newChatFormVisible ?
                        null :
                        <ChatView user={this.state.email}
                            chat={this.state.chats[this.state.selectedChat]}></ChatView>
                }
                {
                    this.state.selectedChat !== null && !this.state.newChatFormVisible ?
                        <ChatTextBox messageReadFn={this.messageRead} submitMessageFn={this.submitMessage}></ChatTextBox> :
                        null
                }
                {
                    this.state.newChatFormVisible ?
                        <NewChat goToChatFn={this.goToChat} newChatSubmitFn={this.newChatSubmit}></NewChat> :
                        null
                }
                <Button className={classes.signOutBtn} onClick={this.signOut}>Sign Out</Button>
            </div>
        );
    }

    signOut = () => {
        firebase.auth().signOut();
    }

    newChatBtnClicked = () => {
        this.setState({ newChatFormVisible: true, selectedChat: null });
    }

    selectChat = (chatIndex) => {
        this.setState({ selectedChat: chatIndex, newChatFormVisible: false });
        // this.messageRead();
    }

    buildDocKey = (friend) => [this.state.email, friend].sort().join(':');

    submitMessage = (msg) => {
        if (msg && msg !== '') {
            const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(_usr => _usr !== this.state.email)[0]);
            firebase
                .firestore()
                .collection('chats')
                .doc(docKey)
                .update({
                    messages: firebase.firestore.FieldValue.arrayUnion({
                        sender: this.state.email,
                        message: msg,
                        timestamp: Date.now()
                    }),
                    receiverHasRead: false
                })
        }
    }

    clickedChatWhereNotSender = (chatIndex) => this.state.chats[chatIndex].messages[this.state.chats[chatIndex].messages.length - 1].sender !== this.state.email;

    messageRead = () => {
        //const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(_usr => _usr !== this.state.email)[0]);
        const docKey = this.state.chats && this.state.chats[this.state.selectedChat].users instanceof Array && this.state.chats[this.state.selectedChat].length > 0 ? this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(_usr => _usr !== this.state.email)[0]) : 'globalChat';
        if (this.clickedChatWhereNotSender(this.state.selectedChat)) {
            firebase
                .firestore()
                .collection('chats')
                .doc(docKey)
                .update({ receiverHasRead: true })
        }
    }

    goToChat = async (docKey, msg = '') => {
        const usersInChat = docKey.split(':');
        const chat = this.state.chats.find(_chat => _chat.users.length === 2 && usersInChat.every(_user => _chat.users.includes(_user)));
        this.setState({ newChatFormVisible: false });
        this.selectChat(this.state.chats.indexOf(chat));
        /*if (msg === '') {
            this.submitMessage(msg);
        }*/
        this.submitMessage(msg);
    }

    newChatSubmit = async (chatObj) => {
        const docKey = this.buildDocKey(chatObj.sendTo);
        await firebase
            .firestore()
            .collection('chats')
            .doc(docKey)
            .set({
                receiverHasRead: false,
                users: [this.state.email, chatObj.sendTo],
                messages: [{
                    message: chatObj.message,
                    sender: this.state.email
                }]
            });
        this.setState({ newChatFormVisible: false });
        this.selectChat(this.state.chats.length - 1);
    }

    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(async _usr => {
            if (!_usr) {
                this.props.history.push('/login');
            }
            else {
                firebase
                    .firestore()
                    .collection('chats')
                    .where('users', 'array-contains', _usr.email)
                    .onSnapshot(async res => {
                        const chats = res.docs.map(_doc => _doc.data());

                        this.setState({
                            email: _usr.email,
                            chats: chats
                        });

                        if (this.props.match.params.email !== undefined) {
                            if (this.props.match.params.email === 'globalChat') {
                                this.goToChat('globalChat')
                            }
                            else {
                                const filtered = this.state.chats.filter(chat => chat.users.includes(this.props.match.params.email) && chat.users.includes(this.state.email) && chat.users.length === 2);
                                //console.log({ filter: filtered })
                                if (filtered.length === 0) {
                                    let date = new Date();
                                    const chatObj = {
                                        sendTo: this.props.match.params.email,
                                        message: 'Hi, ' + this.props.match.params.email.substring(0, this.props.match.params.email.indexOf('@')) + '!',
                                        timestamp:  date.getTime().toString()

                                    };
                                    this.newChatSubmit(chatObj);
                                }
                                else {
                                    this.goToChat(this.buildDocKey(this.props.match.params.email), '');
                                }
                            }
                        }
                    })
            }
        });
    }
}



export default withStyles(styles)(DashBoard);