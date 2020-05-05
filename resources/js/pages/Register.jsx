import React, { Component } from "react";
import {Redirect, withRouter} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import {Container,Button,TextField} from '@material-ui/core';
import {connect} from 'react-redux'
import {blockedUI, unblockedUI} from "../actions/ui_action";
import {Login} from "./Login";
import UserService from "../service/UserService";
import {setCurrentUser} from "../actions/user_action";

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            email: null,
            password: null,
            passwordRepeat: null
        };
    }

    handlechange = e => {
        const name = e.target.id;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    };

    handleclick = e => {
        e.preventDefault();
        UserService.register(this.state).then( () => {
            this.props.history.push({ pathname: '/login' });
        });
    };


    render() {
        if ( this.props.user.isAuth ) {
            return <Redirect to={'/dashboard'} />
        }
        return (
            <Container maxWidth="md">
                <Paper variant={'outlined'} className={'my-3'}>
                    <h3 className="card-header">REGISTER</h3>
                    <div className="card-body">

                        <div className="form-group">
                            <TextField id="name" onChange={this.handlechange}  label="Name" variant="outlined" fullWidth={true}/>
                        </div>
                        <div className="form-group">
                            <TextField onChange={this.handlechange} id="email" label="E-mail address" variant="outlined" fullWidth={true}/>
                        </div>
                        <div className="form-group">
                            <TextField onChange={this.handlechange}  id="password" label="Password" variant="outlined" fullWidth={true} />
                        </div>
                        <div className="form-group">
                            <TextField onChange={this.handlechange}  id="passwordRepeat" label="Repeat password" variant="outlined" fullWidth={true}/>
                        </div>

                        <Button onClick={this.handleclick} variant="contained" color="primary" fullWidth={true} size={'large'}>
                            Register
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

export default withRouter( connect(mapStateToProp,mapDispatchToProps)(Register) );
