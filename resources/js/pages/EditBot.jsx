import React, { Component } from "react";

import {Redirect, withRouter} from "react-router-dom";
import {blockedUI, unblockedUI} from "../actions/ui_action";
import {connect} from "react-redux";
import {Dashboard} from "./Dashboard";
import BotPanel from "../components/BotPanel";
import {setCurrentBot} from "../actions/currentBot_action";
import BotService from "../service/BotService";
import {getAllBots} from "../actions/bots_action";
import Grid from '@material-ui/core/Grid';
import PanelComponent from "../components/PanelComponent";
import PanelProperties from "../components/PanelProperties";
import Form from "../components/Form";
import Draggable from 'react-draggable';
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
    }
});



export class EditBot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: false
        }
    }


    componentDidMount(){

        this.props.blockedUI();

        if (this.props.bots.count == 0) {
            BotService.getAll().then((data) => {
                const res = data.status;
                if (res == 200) {
                    this.props.getBots(data.result);
                    this.stCurBot();
                }
            }).catch((e) => {
                console.log(e.message);
            });
        }else{
            this.stCurBot();
        }

        //const id = this.props.match.params.id;

        // if( this.props.bots.count > 0 ) {
        //     this.props.bots.botlist.map((item) => {
        //             if (item.unique_id == id) {
        //                 const data = {
        //                     name: item.name,
        //                     forms: JSON.parse( item.data )
        //                 };
        //                 this.props.setCurrentBot(data);
        //                 return true;
        //             }
        //         }
        //     )
        // }
    }

    stCurBot = () => {
        // console.log('text');
        const id = this.props.match.params.id;

        this.props.bots.botlist.map((item) => {
                if (item.unique_id == id) {
                    const data = {
                        name: item.name,
                        forms: JSON.parse( item.data ).forms
                    };
                    this.props.setCurrentBot(data);
                    this.props.unblockedUI();
                    this.setState({
                        status: true
                    })
                    return true;
                }
            }
        )
    }

    render() {
        const { classes } = this.props;

        if ( this.state.status == false)
            return <div>Loading...</div>;



        const obj = this.props.currentBot.forms;
        const items = [];

        for (var i in obj) {
            for (var idForm in obj[i]) {
                const name = obj[i][idForm].name; // название формы

                items.push(<Draggable bounds="parent" grid={[25, 25]}>
                                <div style={ {width: 200}}>
                                    <Form name={name} id={idForm} index={i}/>
                                </div>
                            </Draggable>);
                // for (var nameComponent in obj[i][idForm].child ) {
                //     for (var nameProperty in obj[i][idForm].child[nameComponent] ) {
                //         const value = obj[i][idForm].child[nameComponent][nameProperty];
                //
                //     }
                // }
            }
        }

        return (
                <div>
                    <Grid container>
                        <Grid item xs={2}>
                            <div style={ {height:900, backgroundColor: '#FFFFFF'}}>
                                <PanelComponent />
                            </div>
                        </Grid>
                        <Grid item xs={8}>


                            <div style={{height: '890px', position: 'relative', overflow: 'auto', padding: '0'}}>
                                <Tooltip title="Add" aria-label="add" className={classes.absolute}>
                                    <Fab color="primary" >
                                        <AddIcon />
                                    </Fab>
                                </Tooltip>
                                <div style={{height: '1000px', width: '1000px', padding: '10px'}}>

                                    { items }

                                </div>

                            </div>
                            {/*<Draggable*/}
                            {/*    handle=".handle"*/}
                            {/*    defaultPosition={{x: 0, y: 0}}*/}
                            {/*    position={null}*/}
                            {/*    grid={[25, 25]}*/}
                            {/*    scale={1}>*/}

                            {/*    <Form name={'Название формы'} />*/}
                            {/*</Draggable>*/}
                        </Grid>
                        <Grid item xs={2}>
                            <div style={ {height:900, backgroundColor: '#FFFFFF'}}>
                                <PanelProperties />
                            </div>
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
    },
    setCurrentBot: function(data){
        dispatch( setCurrentBot(data) );
    },
    getBots: function(bots){
        dispatch( getAllBots(bots) );
    }
})

const mapStateToProp = state => ({
    bots: state.bots,
    currentBot: state.currentBot
})

export default withRouter( connect(mapStateToProp,mapDispatchToProps) (withStyles(styles)(EditBot)) );
