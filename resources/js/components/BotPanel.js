import React, { Component } from "react";


import IconButton from "@material-ui/core/IconButton";
import SettingsIcon from "@material-ui/icons/Settings";
import CreateIcon from "@material-ui/icons/Create";
import MessageIcon from "@material-ui/icons/Message";
import ScheduleIcon from "@material-ui/icons/Schedule";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class BotPanel extends Component{
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            id: this.props.id,
            item: this.props.item
        };
    }


    handleClick = (e) => {
        this.props.history.push({ pathname: '/bot/' + this.state.id });
    }



    render(){
        return(
            <div className={'bot_panel'} onClick={this.handleClick}>
                <div>
                    <div className={'bot_caption'}>{this.state.name}</div>
                    <div className={'bot_buttons'}>
                        <IconButton color="mygray" aria-label="Settings" ><SettingsIcon /></IconButton>
                        <IconButton color="mygray" aria-label="Constructor"><CreateIcon /></IconButton>
                        <IconButton color="mygray" aria-label="Messages"><MessageIcon /></IconButton>
                    </div>
                    <div className={'bot_date'}>
                        <div className={'bot_date_caption'}>Date create</div>
                        <ScheduleIcon fontSize={'small'}/>
                        <span>{this.state.item.date}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter( BotPanel )