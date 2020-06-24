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
import RedditIcon from '@material-ui/icons/Reddit';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import PeopleIcon from '@material-ui/icons/People';
import AddCircle from '@material-ui/icons/AddCircle';
import Close from '@material-ui/icons/Close';
import Search from '@material-ui/icons/Search';

const firebase = require('firebase');

export default class MainAppBar extends React.Component {
  
  constructor() {
    super();
    this.state = {
      left: false,
      loggedIn: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async _usr => {
      if(!_usr) {
        this.setState({loggedIn: false})
      }
      else {
        await firebase
          this.setState({loggedIn: true})
      }
    });

  }

  signOut = () => {
    firebase.auth().signOut();
    this.setState({loggedIn: false})
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
          <ListItem button component={Link} to='/'>
            <ListItemIcon><HomeRoundedIcon></HomeRoundedIcon></ListItemIcon>
            <ListItemText primary={'Home Page'}></ListItemText>
          </ListItem>
          <Divider></Divider>
          {
            this.state.loggedIn ?
            null :
            <div>
              <ListItem button component={Link} to='/login'>
                <ListItemIcon><RedditIcon></RedditIcon></ListItemIcon>
                <ListItemText primary={'Log In'}></ListItemText>
              </ListItem>
              <Divider></Divider>
            </div>    
          }
          {
            this.state.loggedIn ?
            null :
            <div>
              <ListItem button component={Link} to='/signup'>
                <ListItemIcon><AddCircle></AddCircle></ListItemIcon>
                <ListItemText primary={'Register'}></ListItemText>
              </ListItem>
              <Divider></Divider>
            </div>
          }
          {
            this.state.loggedIn ?
            <div>
              <ListItem button component={Link} to='/dashboard'>
                <ListItemIcon><ChatBubble></ChatBubble></ListItemIcon>
                <ListItemText primary={'Chat Dashboard'}></ListItemText>
              </ListItem> 
              <Divider></Divider>
            </div> :
            null
          }
          {
            this.state.loggedIn ?
            <div>
              <ListItem button component={Link} to='/profile'>
                <ListItemIcon><PeopleIcon></PeopleIcon></ListItemIcon>
                <ListItemText primary={'My Profile'}></ListItemText>
              </ListItem>
              <Divider></Divider>
            </div> :
            null
          }
          {
            this.state.loggedIn ?
            <div>
              <ListItem button component={Link} to='/search'>
                <ListItemIcon><Search></Search></ListItemIcon>
                <ListItemText primary={'Search'}></ListItemText>
              </ListItem>
              <Divider></Divider>
            </div> :
            null
          }
          {
            this.state.loggedIn ?
            <div>
              <ListItem button onClick={this.signOut}>
                <ListItemIcon><Close></Close></ListItemIcon>
                <ListItemText primary={'Log out'}></ListItemText>
              </ListItem>
              <Divider></Divider>
            </div> :
            null
          }
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
            <Button color='inherit' className={classes.title} component={Link} style={{textTransform: 'none'}} to='/'>
              BrokNet Social Network
            </Button>
            <div style={{flex: '1 1 auto'}}></div>
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
