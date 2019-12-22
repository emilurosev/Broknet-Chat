import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChatBubble from '@material-ui/icons/ChatBubble'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import RedditIcon from '@material-ui/icons/Reddit';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';


export default class MainAppBar extends React.Component {
  
  constructor() {
    super();
    this.state = {
      left: false,
    };
  }

  

  render() {
    
    const classes = makeStyles(theme => ({
      root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
    }));

    const classesDrawer = makeStyles({
      list: {
        width: 250,
      },
      fullList: {
        width: 'auto',
      },
    });
    

   

    const sideList = side => (
      <div
        className={classesDrawer.list}
        role="presentation"
        onClick={this.toggleDrawer(side, false)}
        onKeyDown={this.toggleDrawer(side, false)}
      >
        <List>
          {
            this.props.loggedIn ?
            null :
            <div>
              <ListItem component={Link} to='/login'>
                <ListItemIcon><RedditIcon></RedditIcon></ListItemIcon>
                <ListItemText primary={'Log In'}></ListItemText>
              </ListItem>
              <Divider></Divider>
            </div>    
          }
          {
            this.props.loggedIn ?
            null :
            <div>
              <ListItem component={Link} to='/signup'>
                <ListItemIcon><SupervisorAccountIcon></SupervisorAccountIcon></ListItemIcon>
                <ListItemText primary={'Register'}></ListItemText>
              </ListItem>
              <Divider></Divider>
            </div>
          }
          {
            this.props.loggedIn ?
            <div>
              <ListItem component={Link} to='/dashboard'>
                <ListItemIcon><ChatBubble></ChatBubble></ListItemIcon>
                <ListItemText primary={'Chat Dashboard'}></ListItemText>
              </ListItem> 
              <Divider></Divider>
            </div> :
            null
          }
          <ListItem component={Link} to='/news'>
            <ListItemIcon><ViewComfyIcon></ViewComfyIcon></ListItemIcon>
            <ListItemText primary={'News'}></ListItemText>
          </ListItem>
          <Divider></Divider>
        </List>
      </div>
    );

    

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Button color='inherit' className={classes.title} component={Link} to='/'>
              BrokNet Social Network
            </Button>
            <div style={{flex: '1 1 auto'}}></div>
            {
              this.props.loggedIn ?
              <Button onClick={this.props.signOutFn} color='inherit' >Sign Out</Button> :
              <Button component={Link} to="/login" color="inherit">Log In</Button> 
            }
          </Toolbar>
        </AppBar>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          {sideList('left')}
        </Drawer>
      </div>
    );
  }


  toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    this.setState({[side]: open });
  };

}
