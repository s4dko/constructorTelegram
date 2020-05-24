import React, { Component } from "react";

import '../css/style.css';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";
import {withStyles, withTheme} from '@material-ui/core/styles';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import BotService from "../service/BotService";
import Fab from "@material-ui/core/Fab";
import {blockedUI, unblockedUI} from "../actions/ui_action";
import {getAllBots} from "../actions/bots_action";
import {connect} from "react-redux";


const styles = theme => ({
    buttonCreateBot: {
        background: '#FFFFFF',
        color: '#2261c6',
        fontWeight:'bold',
        borderRadius: '50px',
        padding: '10px ',
        '&:hover': {
            background: '#f6f6f6'
        }
    },

    buttonMenu: {
        color: '#FFFFFF !important',
        textTransform: 'uppercase',
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight:'bold',
        textAlign: 'left',
        padding: '10px',
        cursor: 'pointer',
        transition: '.2s',
        '&:hover': {
            color: '#6a9dec !important'
        }
    },

    menuDown: {
        marginTop: '55px'
    }
});


class LeftMenu extends Component{
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            type: 'default',
            name: ''
        }
    }


    handleClickOpen = () => {
        this.setState({
            open: true
        });
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    };

    handleChange = (e) => {
        this.setState({
            type: e.target.value
        });
    }


    handleSubmit = e => {
        e.preventDefault();

        const datasend = {
            type: this.state.type,
            name: this.state.name
        }

        this.props.blockedUI();
        this.handleClose();
        BotService.create(datasend).then( (data) => {
            const res = data.status;
            if ( res == 200){
                this.props.getBots(data.result);
                this.props.unblockedUI();
            }
        }).catch((e) => {
            console.log( e.message );
        });
    }

    handleInputChange = e => {
        this.setState({
            name: e.target.value
        })
    }


    render(){
        const { classes } = this.props;

        return(
            <div>





                <div className={'leftMenu'} style={ {background: this.props.theme.palette.primary.main}} >
                    <div><Button
                        fullWidth={true}
                        className={classes.buttonCreateBot}
                        startIcon={<AddIcon />}
                        onClick={this.handleClickOpen}
                    >
                        Create new bot
                    </Button></div>

                    <div className={classes.menuDown}>
                        <div className={classes.buttonMenu}>
                            <a fullWidth={true} >
                                <DashboardIcon /> Dashboard
                            </a>
                        </div>
                        <div className={classes.buttonMenu}>
                            <a fullWidth={true}>
                                <SettingsIcon /> Settings
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    blockedUI: function(){
        dispatch(blockedUI());
    },
    unblockedUI: function(){
        dispatch(unblockedUI());
    },
    getBots: function(bots){
        dispatch( getAllBots(bots) );
    }
})


export default  connect(null,mapDispatchToProps)(withTheme( (withStyles(styles)(LeftMenu)) ))