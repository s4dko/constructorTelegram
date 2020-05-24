import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import '../../css/style.css'

import TextFieldsIcon from '@material-ui/icons/TextFields';
import Grid from "@material-ui/core/Grid";
import {blockedUI} from "../../actions/ui_action";
import {deleteCurrentComponent, setCurrentComponent} from "../../actions/currentComponent_action";
import {setCurrentProps} from "../../actions/currentProps_action";

export class Base extends Component {

    constructor(props) {
        super(props);

    }


    handleClick = () => {
        if ( this.props.status === 'component') { // если я нажимаю на панеле компонентов
            if (this.props.currentComponent.name === this.state.name)
                this.props.deleteCurrentComponent();
            else
                this.props.setCurrentComponent(this.state);
        }else if ( this.props.status === 'form') { // если я нажимаю на форме
            const currentComponentProps = this.props.currentBot.forms[this.props.indexForm][this.props.idForm].child[this.props.id];
            const data = {
                index: this.props.indexForm,
                id: this.props.id,
                props: currentComponentProps
            };
            this.props.setCurrentProps(data);
        }
    }

    activity = () => {
        let active = 'component';
        if ( this.props.status === 'component') {
            if ( this.props.currentComponent ) {
                if (this.props.currentComponent.name === this.state.name)
                    active = 'component_active';
            }
        }else if ( this.props.status === 'form') {
            if ( this.props.currentProps ) {
                if (this.props.currentProps.id === this.props.id && this.props.currentProps.index === this.props.indexForm ) {
                    active = 'component_active';
                }
            }
        }

        return active;
    }

}

const mapStateToProps  = (state) => ({
    currentComponent: state.currentComponent,
    currentProps: state.currentProps,
    currentBot: state.currentBot
});


const mapDispatchToProps = dispatch => ({
    setCurrentComponent: function(data){
        dispatch(setCurrentComponent(data));
    },
    deleteCurrentComponent: function(){
        dispatch(deleteCurrentComponent());
    },
    setCurrentProps: function(data){
        dispatch( setCurrentProps(data) );
    }
})


export default withRouter( connect(mapStateToProps,mapDispatchToProps)(Base) );