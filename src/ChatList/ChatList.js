import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import styles from './styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NotificationImportant from '@material-ui/icons/NotificationImportant';
import { Link } from 'react-router-dom';

class ChatList extends React.Component {
    constructor() {
        super();
        this.selectChat.bind(this);
    };

    render() {

        const { classes } = this.props;

        if(this.props.chats instanceof Array && this.props.chats.length > 0) {
            return(
                <main className={classes.root}>
                    <Link to='/search'>
                    <Button variant='contained' fullWidth color='primary'
                    className={classes.newChatBtn}
                    >New Message</Button>
                    </Link>
                    <List>
                        {   
                            this.props.chats.map((_chat, _index) => {
                                return(
                                    <div key={_index}>
                                        <ListItem className={classes.listItem} 
                                            onClick={() => this.selectChat(_index)}
                                            selected={this.props.selectChatIndex === _index}
                                            alignItems='flex-start'>
                                                {console.log(_chat.users)}
                                                <ListItemAvatar>
                                                    <Avatar alt='Remy Sharp'>{_chat.users instanceof Array && _chat.users.length <3 ? _chat.users.filter(_user => _user !== this.props.userEmail)[0].split('')[0] : 'Global chat'}</Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={_chat.users instanceof Array && _chat.users.length <3 ? _chat.users.filter(_user => _user !== this.props.userEmail)[0] : 'Global chat'}
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography component='span' color='textPrimary'>
                                                                {_chat.messages[_chat.messages.length - 1].message.substring(0, 30)}
                                                            </Typography>
                                                        </React.Fragment>
                                                    }>
    
                                                </ListItemText>
                                                {
                                                    _chat.receiverHasRead === false && !this.userIsSender(_chat) ?
                                                    <ListItemIcon>
                                                        <NotificationImportant className={classes.unreadMessage}></NotificationImportant>
                                                    </ListItemIcon> :
                                                    null
                                                }
                                        </ListItem>
                                        <Divider></Divider>
                                    </div>
                                );
                            })
                        }
                    </List>
                </main>
            );
        }
        else {
            return(
                <main className={classes.root}>
                    <Button color='primary' variant='contained' onClick={this.newChat}
                        fullWidth className={classes.newChatBtn}>
                        New Message
                    </Button>
                    <List></List>
                </main>
            );
        }

        
    }

    newChat = () => {
        this.props.newChatBtnFn();
    }

    selectChat = (index) => {
        this.props.selectChatFn(index);
    }

    userIsSender = (chat) => chat.messages[chat.messages.length - 1].sender === this.props.userEmail;

}

export default withStyles(styles)(ChatList);