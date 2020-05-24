import React, {Component} from 'react';
import {blockedUI, unblockedUI} from "../actions/ui_action";
import {getAllBots} from "../actions/bots_action";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import '../css/style.css'
import {setCurrentProps} from "../actions/currentProps_action";
import Label from "./forms/label";
import Container from "@material-ui/core/Container";

export class Footer extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }


    render(){
        return (
            <div className={'footer'}>
                <Container style={ { display: 'table', height: '100%'}}>
                    <div style={ {display:'table-cell', color: '#FFFFFF', verticalAlign:"middle"}}><b>s4dko</b> (c) 2020</div>
                </Container>
            </div>
        );
    }

}



export default withRouter((Footer)) ;