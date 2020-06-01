import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import { deepOrange, deepPurple } from '@material-ui/core/colors';

import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonIcon from '@material-ui/icons/Person';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'


import {logout} from "../actions/user_action";
import {blockedUI} from "../actions/ui_action";
import UserService from "../service/UserService";
import Grid from "@material-ui/core/Grid";
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import AppsIcon from '@material-ui/icons/Apps';
import SettingsIcon from '@material-ui/icons/Settings';
import ForumIcon from '@material-ui/icons/Forum';
import DashboardIcon from '@material-ui/icons/Dashboard';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

import '../css/style.css'

const styles = theme => ({


});


class MenuAppBar extends Component{
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            anchorEl: null
        };
    }

    handleMenu = (event) => {
        this.setState({
            open: true,
            anchorEl: event.currentTarget
        })
    };

    handleClose = () => {
        this.setState({
            open: false
        })
    };

    handleLogOut = () => {
        this.props.blockedUI();

        UserService.logout().then( () => {
                this.props.logout();
                this.props.history.push({ pathname: '/login' });
            }
        );
        this.handleClose();
    }


    render(){
        const { classes } = this.props;
        const { history } = this.props;
        const name = this.props.location.pathname.split('/')[1];
        const botId = this.props.location.pathname.split('/')[2];
        const botParam = this.props.location.pathname.split('/')[3];

        return (
            <div className={classes.root}>
                <AppBar position="static" color={'white'} elevation={0} style={ {borderBottom: '1px solid #bdbdbd'}}>
                    <Toolbar style={ {paddingLeft:0 }}>
                        <Grid container alignItems={'center'}>
                            <Grid item xs={2}>
                                <div class={'logo'}>
                                    <span>
                                        <img src="/images/logo.png" />
                                    </span>
                                    <span>
                                        <span style={ {color: '#1b5ac3', fontWeight: '700'}}>Bot</span><span>paint</span>
                                    </span>
                                </div>
                            </Grid>





                            <Grid item xs={8}>

                                { name == 'bot' ? (
                                    <div style={ {paddingLeft: 20}}>
                                        <IconButton
                                            id={'icon_back'}
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            color="inherit"
                                            onClick={() => history.push('/dashboard')}
                                        ><KeyboardArrowLeftIcon /></IconButton>
                                        <label className={'nameBot'} htmlFor={'icon_back'}>{this.props.currentBot.name}</label>

                                        <span className={'bot_menu'}>
                                            <span className={`menuButton ${name == 'bot' && botParam == null ? 'activeButton' : ''}`}  onClick={() => history.push( {pathname: '/bot/'+botId})}><AppsIcon fontSize={'small'}/> Constructor</span>
                                            <span className={`menuButton ${botParam == 'settings' ? 'activeButton' : ''}`} onClick={() => history.push( {pathname: '/bot/'+botId+'/settings' })} ><SettingsIcon fontSize={'small'}/> Settings</span>
                                            <span className={`menuButton ${botParam == 'messages' ? 'activeButton' : ''}`} ><ForumIcon fontSize={'small'}/> Messages</span>
                                        </span>
                                    </div>
                                ) : (
                                    <div style={ {paddingLeft: 20}}>
                                        <span className={`menuButton ${name == 'dashboard' ? 'activeButton' : ''}`} onClick={() => history.push('/dashboard')} ><DashboardIcon /> Dashboard</span>
                                        <span className={`menuButton ${name == 'settings' ? 'activeButton' : ''}`} onClick={() => history.push('/settings')} ><SettingsIcon /> Settings</span>
                                    </div>
                                )}





                            </Grid>





                            <Grid item xs={2} className={'gridItemRight'}>
                                { this.props.user.isAuth == false? (
                                    <div>
                                        <Button onClick={() => history.push('/login')} color="inherit" startIcon={<VpnKeyIcon />}>Login</Button>
                                        <Button onClick={() => history.push('/register')} color="inherit" startIcon={<PersonIcon />}>Register</Button>
                                    </div>
                                ) : (
                                    <div>
                                        <span className={'username'} >
                                            {this.props.user.currentUser.name}
                                        </span>
                                        <IconButton
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={this.handleMenu}
                                            color="inherit"
                                        >
                                            { this.props.user.avatar != "noavatar" ?
                                                (<Avatar alt={this.props.user.currentUser.name} src={'/images/avatar/' + this.props.user.currentUser.avatar} />)
                                                :
                                                ( <Avatar className={classes.avatar}>H</Avatar>)
                                            }

                                        </IconButton>



                                        <Menu
                                            id="menu-appbar"
                                            anchorEl={this.state.anchorEl}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={this.state.open}
                                            onClose={this.handleClose}
                                        >
                                            <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                            <MenuItem onClick={this.handleLogOut}>Log out</MenuItem>
                                        </Menu>
                                    </div>
                                )}

                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

// get user in store
const mapStateToProp = state => ({
    user: state.user,
    currentBot: state.currentBot
})

// get functions
const mapDispatchToProps = dispatch => ({
    blockedUI: function(){
        dispatch(blockedUI());
    },
    logout: function(){
        dispatch( logout())
    }
})


export default  withRouter( connect(mapStateToProp,mapDispatchToProps) (withStyles(styles)(MenuAppBar)) )
