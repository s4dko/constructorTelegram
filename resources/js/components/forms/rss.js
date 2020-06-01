import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import '../../css/style.css'

import TextFieldsIcon from '@material-ui/icons/TextFields';
import Grid from "@material-ui/core/Grid";
import {blockedUI} from "../../actions/ui_action";
import {deleteCurrentComponent, setCurrentComponent} from "../../actions/currentComponent_action";
import {setCurrentProps} from "../../actions/currentProps_action";
import {Base} from "./base";
import RssFeedIcon from '@material-ui/icons/RssFeed';


export class Request extends Base {

    constructor(props) {
        super(props);

        this.state = {
            name: "rss",
            props: {
                file: "",
                signature: ""
            }
        }
    }

    componentDidMount(){
    }


    render(){
        const active = this.activity();

        return (
            <div className={ active }  onClick={this.handleClick} >
                <div >
                    <Grid container>
                        <Grid item xs={2} className={'component_icon'}>
                            <RssFeedIcon />
                        </Grid>
                        <Grid items xs={10} className={'component_text'}>
                            Rss
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
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


export default withRouter( connect(mapStateToProps,mapDispatchToProps)(Request) );