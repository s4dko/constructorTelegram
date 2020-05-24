import React, { Component } from "react";

import {Redirect, withRouter} from "react-router-dom";
import {blockedUI, unblockedUI} from "../actions/ui_action";
import {connect} from "react-redux";
import {Dashboard} from "./Dashboard";
import BotPanel from "../components/BotPanel";
import {setCurrentBot, updateForms} from "../actions/currentBot_action";
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
import {deleteCurrentProps} from "../actions/currentProps_action";
import SaveIcon from '@material-ui/icons/Save';
import Alert from '@material-ui/lab/Alert';
import UserService from "../service/UserService";
import {logout} from "../actions/user_action";
import GridLines from 'react-gridlines';


const styles = theme => ({
    absolute: {
        position: 'absolute',
        bottom: theme.spacing(8),
        right: theme.spacing(43),
        zIndex: '9999'

    },
    absoluteSave: {
        position: 'absolute',
        bottom: theme.spacing(8),
        right: theme.spacing(53),
        zIndex: '9999'
    },

    save:{
        background: '#27ae60'
    }
});



export class EditBot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: false,
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
                this.props.logout();
                this.props.history.push({ pathname: '/login' });
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

    onClick = () => {
        this.props.deleteCurrentProps();
    }

    handleDrag = (e, ui) => {
        const currentBotForm = this.props.currentBot.forms;
        currentBotForm[this.props.currentProps.index][this.props.currentProps.id].top =  ui.y;
        currentBotForm[this.props.currentProps.index][this.props.currentProps.id].left =  ui.x;

        this.props.updateForm(currentBotForm);
    };

    save = () => {
        this.props.blockedUI();

        const id = this.props.match.params.id;
        const data = {
            botId: id,
            data: this.props.currentBot
        };
        BotService.save(data).then( (data) => {
            if ( data.status == 200){
                this.props.unblockedUI();
            }
        }).catch((e) => {
        });
    }

    stCurBot = () => {
        // console.log('text');
        const id = this.props.match.params.id;

        this.props.bots.botlist.map((item) => {
                if (item.unique_id == id) {
                    const data = {
                        name: item.name,
                        token: item.token,
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
            return <div className={'wrapper'}>
                <div style={ {height:'100%', textAlign:'center'}}></div>
            </div>;



        const obj = this.props.currentBot.forms;
        const items = [];

        for (var i in obj) {
            for (var idForm in obj[i]) {
                const name = obj[i][idForm].name; // название формы
                const child = obj[i][idForm].child;
                const x = obj[i][idForm].left;
                const y = obj[i][idForm].top;

                items.push(<Draggable defaultPosition={ {x: x, y:y }} onDrag={this.handleDrag} grid={[25, 25]}>
                                <div style={ {width: 200}}>
                                    <Form name={name} id={idForm} index={i} child={child}/>
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

                    <Grid container className={'wrapper'}>
                        <Grid item xs={2}>
                            <div style={ { height:'100%',backgroundColor: '#FFFFFF'}}>
                                <PanelComponent />
                            </div>
                        </Grid>
                        <Grid item xs={8}>
                            <Tooltip title="Save" aria-label="Save" className={classes.absoluteSave} >
                                <Fab color="secondary" onClick={this.save } >
                                    <SaveIcon />
                                </Fab>
                            </Tooltip>

                            <Tooltip title="Add" aria-label="add" className={classes.absolute} >
                                <Fab color="primary" >
                                    <AddIcon />
                                </Fab>
                            </Tooltip>


                            <div style={{ height: '839px', position: 'relative', overflow: 'auto', padding: '0'}}>
                                <div style={{ padding: '10px'}}>

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
                            <div style={ { height:'100%', backgroundColor: '#FFFFFF'}}>
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
    },
    deleteCurrentProps: function(){
        dispatch( deleteCurrentProps() );
    },
    updateForm: function (data) {
        dispatch( updateForms(data) )
    },
    logout: function(){
        dispatch( logout())
    }
})

const mapStateToProp = state => ({
    bots: state.bots,
    currentBot: state.currentBot,
    currentProps: state.currentProps
})

export default withRouter( connect(mapStateToProp,mapDispatchToProps) (withStyles(styles)(EditBot)) );

