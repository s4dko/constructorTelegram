import React, {Component} from 'react';
import {blockedUI, unblockedUI} from "../actions/ui_action";
import {getAllBots} from "../actions/bots_action";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Dashboard} from "../pages/Dashboard";


export class PanelProperties extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    render(){
        return (
            <div >
                <div className>Properties</div>
                <div></div>
            </div>
        );
    }

}


const mapStateToProps  = (state) => ({
    bots: state.bots
});


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


export default withRouter( connect(mapStateToProps,mapDispatchToProps)(PanelProperties) );