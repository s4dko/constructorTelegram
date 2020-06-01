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
import {deleteCurrentProps, setCurrentProps} from "../actions/currentProps_action";
import SaveIcon from '@material-ui/icons/Save';
import Alert from '@material-ui/lab/Alert';
import UserService from "../service/UserService";
import {logout} from "../actions/user_action";
import GridLines from 'react-gridlines';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import Zoom from '@material-ui/core/Zoom';
import CallToActionOutlinedIcon from '@material-ui/icons/CallToActionOutlined';
import ViewStreamIcon from '@material-ui/icons/ViewStream';

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
        zIndex: '9997'
    },

    save:{
        background: '#27ae60'
    }
});

const transitionDuration = theme => ({
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
});



export class EditBot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: false,
            open: false,
            dragStatus: true,
            x: 0,
            y: 0
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
        // this.setState({
        //     x: ui.x,
        //     y: ui.y
        // });
        //console.log(this.state.dragStatus) ;
       // if ( this.state.dragStatus == true ){
            const currentBotForm = this.props.currentBot.forms;
            currentBotForm[this.props.currentProps.index][this.props.currentProps.id].top = ui.y ;
            currentBotForm[this.props.currentProps.index][this.props.currentProps.id].left =  ui.x;
            this.props.updateForm(currentBotForm);
            // this.setState({
            //     dragStatus: false
            // });
        //}
        // const currentBotForm = this.props.currentBot.forms;
        // currentBotForm[this.props.currentProps.index][this.props.currentProps.id].top =  ;
        // currentBotForm[this.props.currentProps.index][this.props.currentProps.id].left =  ui.x;

        // this.props.updateForm(currentBotForm);
    };

    handleStop = () =>{
        // const currentBotForm = this.props.currentBot.forms;
        // currentBotForm[this.props.currentProps.index][this.props.currentProps.id].top = this.state.y;
        // currentBotForm[this.props.currentProps.index][this.props.currentProps.id].left =  this.state.x;
        //
        // this.props.updateForm(currentBotForm);
        this.setState({
            dragStatus: true
        })
    }

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

    handleOpen = () => {
        this.setState({
            open: true
        });
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    };

    buttonClick = () =>{
        const currentBotForm = this.props.currentBot.forms;
        const [nameForm] = Object.entries(currentBotForm[this.props.currentProps.index]);

        const allButtons = currentBotForm[this.props.currentProps.index][nameForm[0]].child[this.props.currentProps.id].buttons;
        var max = 0;
        for (let [key2, value2] of Object.entries(allButtons)) {
            const expl = key2.toString().split('_');
            if ( expl[1] > max ){
                max = parseInt(expl[1]);
            }
        }
        max += 1;

        // change form
        const newname = 'btn_' + max;
        currentBotForm[this.props.currentProps.index][nameForm[0]].child[this.props.currentProps.id].buttons[newname] = {
            name: "",
            type: "goForm",
            data: ""
        }
        this.props.updateForm(currentBotForm);

        // change props
        const data = {
            index: this.props.currentProps.index,
            id: this.props.currentProps.id,
            props: {
                buttons: currentBotForm[this.props.currentProps.index][nameForm[0]].child[this.props.currentProps.id].buttons
            }
        };

        this.props.setCurrentProps(data);

        this.handleClose();
    }

    createForm = () => {
        var currentBotForm =  Object.assign({},this.props.currentBot.forms);
        var max = 0;
        for (let [key, value] of Object.entries(currentBotForm)) {
            if ( key > max ){
                max = parseInt(key);
            }
        }

        max += 1;
        const form_id = max +1;
        currentBotForm[max] = {
            ['form_'+form_id]: {
                name: "Форма " + form_id,
                command: null,
                top: 0,
                left: 0,
                child: {}
            }
        };


        this.props.updateForm(currentBotForm);
        this.handleClose();
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

                items.push(<Draggable defaultPosition={ {x: x, y:y }} onDrag={this.handleDrag} grid={[5, 5]}>
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

        const actions = [
            { icon: <CallToActionOutlinedIcon />, name: 'Form', onClick: this.createForm },
        ];

        if( this.props.currentProps.props.hasOwnProperty('buttons') ){
            actions.push({
                icon: <ViewStreamIcon />, name: 'Button', onClick: this.buttonClick
            })
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
                            <Zoom timeout={{
                                enter: '100ms',
                                exit: '100ms',
                            }}
                                  in={true}
                                  style={{
                                      transitionDelay: '30ms'
                                  }}>
                                <Tooltip title="Save" aria-label="Save" className={classes.absoluteSave} >
                                    <Fab color="secondary" onClick={this.save } >
                                        <SaveIcon />
                                    </Fab>
                                </Tooltip>
                            </Zoom>

                            {/*<Tooltip title="Add" aria-label="add" className={classes.absolute} >*/}
                            {/*    <Fab color="primary" >*/}
                            {/*        <AddIcon />*/}
                            {/*    </Fab>*/}
                            {/*</Tooltip>*/}

                            <Backdrop open={this.state.open} style={{zIndex: '9998'}}/>
                            <SpeedDial
                                ariaLabel="SpeedDial tooltip example"
                                className={classes.absolute}
                                icon={<SpeedDialIcon />}
                                onClose={this.handleClose}
                                onOpen={this.handleOpen}
                                open={this.state.open}
                            >
                                {actions.map((action) => (
                                    <SpeedDialAction
                                        key={action.name}
                                        icon={action.icon}
                                        tooltipTitle={action.name}
                                        tooltipOpen
                                        onClick={action.onClick}
                                    />
                                ))}
                            </SpeedDial>

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
    },
    setCurrentProps: function(data){
        dispatch( setCurrentProps(data) );
    }
})

const mapStateToProp = state => ({
    bots: state.bots,
    currentBot: state.currentBot,
    currentProps: state.currentProps
})

export default withRouter( connect(mapStateToProp,mapDispatchToProps) (withStyles(styles)(EditBot)) );

