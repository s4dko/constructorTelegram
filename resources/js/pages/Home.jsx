import React, { Component } from "react";

import {Redirect, withRouter} from "react-router-dom";
import {blockedUI, unblockedUI} from "../actions/ui_action";
import {connect} from "react-redux";
import {Dashboard} from "./Dashboard";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";

export class Home extends Component {
    render() {
        return (
            <div>
                <Grid container>
                    <Grid item xs={6}>
                        <div style={ {paddingLeft:'174px', paddingTop: '140px'}}>
                            <div class={'lading_caption'}>Create your bot</div>
                            <div class={'lading_description'}>Use drawing methods and create bots without programming knowledge for Telegram messager</div>
                            <span className={'lading_button'}>Get started</span>
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div style={ {textAlign: 'right'}}>
                            <img src="/images/lading.png" width={860} style={ {marginTop: '-70px'}}/>
                        </div>
                    </Grid>
                </Grid>

                <Grid container style={ {background: '#e9e7f961'}}>
                    <Grid item xs={5} style={ {textAlign: 'right'}}>
                        <img src="/images/lading2.png" width={630} style={{paddingTop:'10px'}}/>
                    </Grid>
                    <Grid item xs={6} style={ {textAlign: 'left', paddingRight:'160px', paddingLeft: '40px'}}>
                        <div style={{fontSize: '38px', paddingTop: '60px'}}>What is a bot and how can it work for you?</div>
                        <div style={{fontSize: '23px'}}>A bot is short for robot. The bot is a virtual assistant that will respond to 95% of the same calls or clarifications

                            You will get rid of elementary, but constantly distracting you discussions and answers to questions that have been stealing your time daily for many years

                            A bot is the best option for automating the provision of information in any business business</div>
                    </Grid>
                </Grid>
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
