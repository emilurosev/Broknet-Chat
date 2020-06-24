import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

class ChatView extends React.Component {

    componentDidUpdate = () => {
        const container = document.getElementById('chatview-container');
        if(container) {
            container.scrollTo(0, container.scrollHeight);
        }
    }

    render() {

        const { classes, chat, user } = this.props;

        if(chat === undefined) {
            return(<main id='chatview-container' className={classes.content}></main>)
        }
        else {
            return(
                <div>
                    <div className={classes.chatHeader}>
                        Your conversation with {chat.users instanceof Array && chat.users.length <3 ? chat.users.filter(_usr => _usr !== user)[0] : 'Everyone'}
                    </div>
                    <main style={{paddingTop: '5rem'}} id='chatview-container' className={classes.content}>
                        {
                            chat.messages.map((_msg, _index) => {
                                var timestamp = new Date(_msg.timestamp);
                                return(
                                    <div className={_msg.sender === user ? classes.userSent : classes.friendSent} key={_index}>
                                        {_msg.message} <br></br> <span>{String(timestamp)}</span>
                                    </div>
                                );
                            })
                        }
                    </main> 
                </div>
              
            );
        }
    }
}

export default withStyles(styles)(ChatView);