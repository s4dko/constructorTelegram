import React, { Component } from "react";
import {Redirect, withRouter} from "react-router-dom";


import {blockedUI} from "../actions/ui_action";
import {unblockedUI} from "../actions/ui_action";
import {connect} from "react-redux";


import Grid from "@material-ui/core/Grid";


import '../css/style.css';
import BotService from "../service/BotService";
import {getAllBots} from "../actions/bots_action";

import BotPanel from "../components/BotPanel";
import LeftMenu from "../components/LeftMenu";

export class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){

        this.props.blockedUI();
        BotService.getAll().then( (data) => {
            const res = data.status;
            if ( res == 200) {
                this.props.getBots(data.result);
                this.props.unblockedUI();
            }
        }).catch((e) => {
            console.log( e.message);
        });




        // const state = store.getState();
        // const isAuth = state.user.isAuth;
        // if (!isAuth) {
        //     return this.props.history.push('/login');
        // }
    }



    render() {

        return (
            <Grid container>
                <Grid item xs={2}>
                    <div style={ {height:900, backgroundColor: '#2261c6'}}></div>
                </Grid>
                <Grid item xs={10}>
                    <div style={ {paddingRight: 20, paddingLeft:20}}>
                        <div className={'botList_caption my-5'}>
                            <span>My Bots ({this.props.bots.count})</span>
                        </div>
                        <div >
                            { this.props.bots.count > 0 ?
                                this.props.bots.botlist.map( (item) =>
                                    <BotPanel key={item.id} name={item.name} id={item.unique_id} item={item} />
                                )
                                :
                                <div>text2</div>
                            }
                        </div>
                    </div>
                </Grid>
            </Grid>

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


export default withRouter( connect(mapStateToProps,mapDispatchToProps)(Dashboard) );
