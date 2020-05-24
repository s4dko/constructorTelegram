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
import Container from "@material-ui/core/Container";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AddIcon from "@material-ui/icons/Add";
import {withStyles} from "@material-ui/core/styles";
import {logout} from "../actions/user_action";


const styles = theme => ({
    buttonCreateBot: {
        background: '#2261c6',
        color: '#FFFFFF',
        fontWeight: 'bold',
        borderRadius: '10px',
        padding: '10px ',
        '&:hover': {
            background: '#1b5ac3de;'
        }
    }
});


export class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            type: 'default',
            name: ''
        }
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
            this.props.logout();
            this.props.history.push({ pathname: '/login' });
        });




        // const state = store.getState();
        // const isAuth = state.user.isAuth;
        // if (!isAuth) {
        //     return this.props.history.push('/login');
        // }
    }


    handleClickOpen = () => {
        this.setState({
            open: true
        });
    };

    handleClose = () => {
        this.setState({
            open: false
        });
    };

    handleChange = (e) => {
        this.setState({
            type: e.target.value
        });
    }


    handleSubmit = e => {
        e.preventDefault();

        const datasend = {
            type: this.state.type,
            name: this.state.name
        }

        this.props.blockedUI();
        this.handleClose();
        BotService.create(datasend).then( (data) => {
            const res = data.status;
            if ( res == 200){
                this.props.getBots(data.result);
                this.props.unblockedUI();
            }
        }).catch((e) => {
            console.log( e.message );
        });
    }

    handleInputChange = e => {
        this.setState({
            name: e.target.value
        })
    }



    render() {
        const { classes } = this.props;

        return (
            <Container className={'wrapper'}>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <form onSubmit={this.handleSubmit}>
                        <DialogTitle id="form-dialog-title">Create new Telegram bot</DialogTitle>
                        <DialogContent>

                            <div>
                                <FormControl variant="outlined"  fullWidth >
                                    <InputLabel id="type_input" >Type</InputLabel>
                                    <Select
                                        labelId="type_input"
                                        id="type_select"
                                        value={this.state.type}
                                        onChange={this.handleChange}
                                        label="Type"
                                    >
                                        <MenuItem value={'default'}>Default</MenuItem>
                                        <MenuItem value={'shop'}>Shop</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div>
                                <TextField
                                    id="name_input"
                                    label="Name"
                                    placeholder="Enter name your Telegram bot"
                                    fullWidth
                                    margin="normal"
                                    style={ {width: 400}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    onChange={this.handleInputChange}
                                    required={true}
                                />
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button type={'submit'} color="primary">
                                Create
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>







                    <div style={ { height:'100%'}}>

                        <div className={'pt-5'} >
                            <div className={'botList_caption '}>
                                <span style={ { fontWeight: '100'}}>My bots ({this.props.bots.count})</span>
                                <Button
                                    className={classes.buttonCreateBot}
                                    startIcon={<AddIcon />}
                                    onClick={this.handleClickOpen}
                                    style={ {float:'right'}}
                                >
                                    Create new bot
                                </Button>
                            </div>
                            <div className={'pt-3'}>
                                { this.props.bots.count > 0 ?
                                    this.props.bots.botlist.map( (item) =>
                                        <BotPanel key={item.id} name={item.name} id={item.unique_id} item={item} />
                                    )
                                    :
                                    <div>text2</div>
                                }
                            </div>
                        </div>
                    </div>
            </Container>
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
    },
    logout: function(){
        dispatch( logout())
    }
})


export default withRouter( connect(mapStateToProps,mapDispatchToProps) (withStyles(styles)(Dashboard) ));
