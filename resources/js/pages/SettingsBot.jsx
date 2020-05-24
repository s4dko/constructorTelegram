import React, { Component } from "react";
import {Redirect, withRouter} from "react-router-dom";

import {connect} from "react-redux";

import Paper from "@material-ui/core/Paper";
import {Button, Container, TextField} from "@material-ui/core";

import 'react-block-ui/style.css';

import {setCurrentUser} from '../actions/user_action'
import {blockedUI, unblockedUI} from '../actions/ui_action'
import UserService from "../service/UserService";
import BlockUi from "react-block-ui";
import BotService from "../service/BotService";


export class SettingsBot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: this.props.currentBot.token || "",
            nameBot: this.props.currentBot.name || "",
        };
    }

    componentDidMount(){
        this.props.unblockedUI();
    }

    handlechange = e => {
        const name = e.target.id;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    };

    handleclick = () => {
        const botId = this.props.location.pathname.split('/')[2];
        const data = {
            botId: botId,
            name: this.state.nameBot,
            token:  this.state.token
        }

        BotService.saveSettings(data).then( (data) => {

        }).catch((e) => {
            console.log( e.message);
        });
    };


    render() {
        const botId = this.props.location.pathname.split('/')[2];
        if ( this.props.currentBot.name == ""){
            return <Redirect to={'/bot/'+botId} />
        }

        return (

            <Container className={'wrapper'}>
                <div style={ {paddingTop:'25px'}}>
                <Paper variant={'outlined'} >
                    <div className="card-body">
                        <form onSubmit={this.handlesubmit}>

                            <div className="form-group">
                                <TextField onChange={this.handlechange} id="nameBot" label="Name bot" variant="outlined" value={this.state.nameBot} fullWidth={true}/>
                            </div>

                            <div className="form-group">
                                <TextField onChange={this.handlechange} id="token" label="Token" variant="outlined" value={this.state.token} fullWidth={true}/>
                            </div>



                            {/*<div className="form-group">*/}
                            {/*    <TextField onChange={this.handlechange} id="avatar" label="Avatar" variant="outlined" fullWidth={true}/>*/}
                            {/*</div>*/}

                            {/*<div className="form-group">*/}
                            {/*    <TextField multiline={true} onChange={this.handlechange} id="description" label="Description" variant="outlined" fullWidth={true}/>*/}
                            {/*</div>*/}

                        </form>

                        <Button onClick={this.handleclick} variant="contained" color="primary"  size={'large'}>
                            Save settings
                        </Button>
                    </div>
                </Paper>
                </div>
            </Container>
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
    setCurrentUser: function(user){
        dispatch( setCurrentUser(user) );
    }
})

const mapStateToProp = state => ({
    currentBot: state.currentBot
})

export default withRouter( connect(mapStateToProp,mapDispatchToProps)(SettingsBot) );
