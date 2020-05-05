import React, {Component} from 'react';
import {blockedUI, unblockedUI} from "../actions/ui_action";
import {getAllBots} from "../actions/bots_action";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Dashboard} from "../pages/Dashboard";
import TextField from "@material-ui/core/TextField";
import translate from '../translate'
import {updateForms} from "../actions/currentBot_action";
import {update} from "sweetalert2";
import {updateProps} from "../actions/currentProps_action";

export class PanelProperties extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nameProps: '',
            valueProps: ''
        }
    }

    componentDidMount(){

    }

    handleChange = (e) => {
        const valueProps = e.target.value;
        const nameProps = e.target.id.toString().split('-')[2];

        // update forms
        const currentBotForm = this.props.currentBotForms;
        const [nameForm] = Object.entries(currentBotForm[this.props.currentProps.index]);
        if ( nameForm[0] == this.props.currentProps.id){ // значит форма
             currentBotForm[this.props.currentProps.index][nameForm[0]][nameProps] = valueProps;
             this.props.updateForm(currentBotForm);
            //console.log( currentBotForm[this.props.currentProps.index][nameForm[0]][nameProps] );
        }

        // update props
        const currentProps = this.props.currentProps;
        currentProps.props[nameProps] = valueProps;
        this.props.updateProps( currentProps );
        // console.log( currentProps );
    }

    render() {
        const items = [];
        if (this.props.currentProps.index != null){
            for (let [key, value] of Object.entries(this.props.currentProps.props)) {

                items.push(<TextField
                    id={this.props.currentProps.id+ '-edit-'+ key}
                    name={'fffff'}
                    label={ translate(key) }
                    style={{ margin: 8 }}
                    placeholder="Enter your value"
                    fullWidth
                    margin="normal"
                    value={value}
                    data-key={key}
                    variant="outlined"
                    onChange={this.handleChange}
                /> )
            }
        }else {
            items.push(<div>Neytu</div>);
        }


        return (
            <div className={'property_panel'}>
                <div className={'panel_caption'}>Properties</div>
                <div>
                    {items}
                </div>
            </div>
        );
    }

}


const mapStateToProps  = (state) => ({
    currentProps: state.currentProps,
    currentBotForms: state.currentBot.forms
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
    },
    updateForm: function (data) {
        dispatch( updateForms(data) )
    },
    updateProps: function (data) {
        dispatch( updateProps(data) )
    }
})


export default withRouter( connect(mapStateToProps,mapDispatchToProps)(PanelProperties) );