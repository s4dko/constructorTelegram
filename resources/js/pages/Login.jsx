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


export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            password: null,
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

    handleclick = e => {
        // e.preventDefault();
        // //this.props.blockedUI();
        // this.props.loginPost({
        //     name: this.state.name,
        //     password: this.state.password
        // });


        if (e) {
            e.preventDefault();
            this.props.blockedUI();
        }

        UserService.login(this.state).then((data) => {
            // this.props.unblockUiAction();
            this.props.setCurrentUser(data.result.message.user  );
            this.props.history.push({ pathname: '/dashboard' });
        }).catch((e) => {
            // this.props.unblockUiAction();
            // if (e.message) {
            //     this.props.showNotificationAction({text: e.message, type: 'error'});
            // }
        });
    };

    render() {
        if ( this.props.user.isAuth ) {
            return <Redirect to={'/dashboard'} />
        }

        return (

                <Container maxWidth="md">
                    <Paper variant={'outlined'} className={'my-3'}>
                        <h3 className="card-header">LOGIN</h3>
                        <div className="card-body">
                            <form onSubmit={this.handlesubmit}>
                                <div className="form-group">
                                    <TextField onChange={this.handlechange} id="name" label="Name" variant="outlined" fullWidth={true}/>
                                </div>
                                <div className="form-group">
                                    <TextField onChange={this.handlechange} id="password" label="Password" variant="outlined" fullWidth={true}/>
                                </div>
                            </form>

                            <Button onClick={this.handleclick} variant="contained" color="primary" fullWidth={true} size={'large'}>
                                Login
                            </Button>
                        </div>
                    </Paper>
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
    user: state.user
})

export default withRouter( connect(mapStateToProp,mapDispatchToProps)(Login) );
