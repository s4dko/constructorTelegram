import React, { Component } from "react";

import {Redirect, withRouter} from "react-router-dom";
import {blockedUI, unblockedUI} from "../actions/ui_action";
import {connect} from "react-redux";
import {Dashboard} from "./Dashboard";

export class Home extends Component {
    render() {
        return (
            <div>
                <span>Lading</span>
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
    }
})

const mapStateToProp = state => ({
    user: state.user
})

export default withRouter( connect(mapStateToProp,mapDispatchToProps)(Home) );
