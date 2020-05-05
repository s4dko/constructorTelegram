import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import {Redirect, withRouter} from "react-router-dom";
import {blockedUI, unblockedUI} from "../actions/ui_action";
import {connect} from "react-redux";

import {setCurrentBot} from "../actions/currentBot_action";
import {getAllBots} from "../actions/bots_action";


import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import HttpIcon from '@material-ui/icons/Http';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
});


export class PanelComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true,
            open2: true
        }
    }

    componentDidMount(){

    }

    handleClick = (e) => {
        this.setState({
            open: !this.state.open
        });
    };

    handleClick2 = (e) => {
        this.setState({
            open2: !this.state.open2
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <div style={ {padding: 10}}>
                            <div className={'panel_caption'}>Components list</div>
                        </div>
                    }
                >
                    <ListItem button onClick={this.handleClick}>
                        <ListItemText primary="Standart" />
                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <TextFieldsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Text" />
                            </ListItem>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <RadioButtonCheckedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Buttons" />
                            </ListItem>
                        </List>
                    </Collapse>


                    <ListItem button onClick={this.handleClick2}>
                        <ListItemText primary="Extended" />
                        {this.state.open2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested}>
                                <ListItemIcon>
                                    <HttpIcon />
                                </ListItemIcon>
                                <ListItemText primary="Http request" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    blockedUI: function(){
        dispatch(blockedUI());
    },
    unblockedUI: function(){
        dispatch(unblockedUI());
    },
    setCurrentBot: function(data){
        dispatch( setCurrentBot(data) );
    },
    getBots: function(bots){
        dispatch( getAllBots(bots) );
    }
})

const mapStateToProp = state => ({
    bots: state.bots
})

export default withRouter( connect(mapStateToProp,mapDispatchToProps)(withStyles(styles)(PanelComponent)) );
