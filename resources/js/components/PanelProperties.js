import React, {Component} from 'react';
import {blockedUI, unblockedUI} from "../actions/ui_action";
import {getAllBots} from "../actions/bots_action";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import TextField from "@material-ui/core/TextField";
import translate from '../translate'
import {updateForms} from "../actions/currentBot_action";
import {updateProps} from "../actions/currentProps_action";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from "@material-ui/core/FormControl";

const styles = theme => ({
    buttonDelete: {
        color: '#e74c3c',
        fontWeight: 'bold',
        borderColor: '#e74c3c',
        borderRadius: '5px',
        padding: '10px ',
        '&:hover': {
            background: 'rgba(232, 83, 70, 0.05);'
        }
    }
});


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
        var id = null;

        if ( e.target.hasOwnProperty('name') )
            id = e.target.name.toString().split('-');
        else
             id = e.target.id.toString().split('-');


        const valueProps = e.target.value;
        // const id = e.target.id.toString().split('-');
        const nameProps = id[2];

        // update forms
        const currentBotForm = this.props.currentBotForms;
        const [nameForm] = Object.entries(currentBotForm[this.props.currentProps.index]);
        if ( nameForm[0] === this.props.currentProps.id){ // значит форма
             currentBotForm[this.props.currentProps.index][nameForm[0]][nameProps] = valueProps;
             this.props.updateForm(currentBotForm);
            //console.log( currentBotForm[this.props.currentProps.index][nameForm[0]][nameProps] );
        }else{
            if( nameProps == 'buttons'){
                const nameButton = id[3];
                const namePropsButton = id[4];

                currentBotForm[this.props.currentProps.index][nameForm[0]].child[this.props.currentProps.id].buttons[nameButton][namePropsButton] = valueProps ;
                this.props.updateForm(currentBotForm);

                const currentProps = this.props.currentProps;
                currentProps.props[nameProps][nameButton][namePropsButton] = valueProps;
                this.props.updateProps( currentProps );
            }else{
                currentBotForm[this.props.currentProps.index][nameForm[0]].child[this.props.currentProps.id][nameProps] = valueProps;
                this.props.updateForm(currentBotForm);

                const currentProps = this.props.currentProps;
                currentProps.props[nameProps] = valueProps;
                this.props.updateProps( currentProps );
            }

            //console.log( currentBotForm );
            //
        }

        // update props

        // console.log( currentProps );
    }

    render() {
        const { classes } = this.props;

        var status = false;

        const forms = [];
        for (let [key, value] of Object.entries(this.props.currentBotForms)) {
            for (let [key2, value2] of Object.entries(this.props.currentBotForms[key])) {
                forms.push(<MenuItem value={key2} >{this.props.currentBotForms[key][key2].name}</MenuItem>);
            }
        }

        const items = [];
        if (this.props.currentProps.index != null){
            for (let [key, value] of Object.entries(this.props.currentProps.props)) {

                // component - edit - nameProps
                // inlineButtons_1-edit-buttons
                // inlineButtons_1-edit-buttons-btn_1-type
                //console.log(this.props.currentProps.id+ '-edit-'+ key);

                if ( key === 'buttons'){
                    const btns = [];
                    // проход по кнопкам
                    for (let [key2, value2] of Object.entries(this.props.currentProps.props.buttons)) {
                        const numButton = key2.toString().split('_')[1];
                        items.push(
                            <div class={'props_buttons_all_block'}>
                                <div className={'props_buttons_block'}>
                                    <div className={'props_buttons_name'}>
                                        <span>Button #{numButton}</span>
                                    </div>

                                    <TextField
                                        id={this.props.currentProps.id + '-edit-' + key + '-' + key2 + '-name'}
                                        label={translate('name')}
                                        style={{marginTop: 0, marginBottom: 5}}
                                        placeholder="Enter your value"
                                        fullWidth
                                        margin="normal"
                                        value={(value2.name == null) ? "" : value2.name}
                                        onChange={this.handleChange}
                                    />


                                    <FormControl fullWidth style={{marginTop: 0, marginBottom: 5}}>
                                        <InputLabel id={'select-' +key2 + '-type'}>{translate('type')}</InputLabel>
                                        <Select
                                            labelId={'select-' +key2 + '-type'}
                                            fullWidth
                                            value={(value2.type == null) ? "" : value2.type}
                                            onChange={this.handleChange}
                                            name={this.props.currentProps.id + '-edit-' + key + '-' + key2 + '-type'}
                                        >

                                            <MenuItem value={'goForm'}>Show form</MenuItem>
                                        </Select>
                                    </FormControl>


                                    {/*<TextField*/}
                                    {/*    id={this.props.currentProps.id + '-edit-' + key + '-' + key2 + '-type'}*/}
                                    {/*    label={translate('type')}*/}
                                    {/*    style={{marginTop: 0, marginBottom: 5}}*/}
                                    {/*    placeholder="Enter your value"*/}
                                    {/*    fullWidth*/}
                                    {/*    margin="normal"*/}
                                    {/*    value={(value2.type == null) ? "" : value2.type}*/}
                                    {/*    onChange={this.handleChange}*/}
                                    {/*/>*/}

                                    <FormControl fullWidth style={{marginTop: 0, marginBottom: 5}}>
                                        <InputLabel id={'select-' +key2 + '-data'}>{translate('data')}</InputLabel>
                                        <Select
                                            labelId={'select-' +key2 + '-data'}
                                            fullWidth
                                            value={(value2.data == null) ? "" : value2.data}
                                            onChange={this.handleChange}
                                            name={this.props.currentProps.id + '-edit-' + key + '-' + key2 + '-data'}
                                        >

                                            {forms}
                                        </Select>
                                    </FormControl>

                                    {/*<TextField*/}
                                    {/*    id={this.props.currentProps.id + '-edit-' + key + '-' + key2 + '-data'}*/}
                                    {/*    label={translate('data')}*/}
                                    {/*    style={{marginTop: 0, marginBottom: 5}}*/}
                                    {/*    placeholder="Enter your value"*/}
                                    {/*    fullWidth*/}
                                    {/*    margin="normal"*/}
                                    {/*    value={(value2.data == null) ? "" : value2.data}*/}
                                    {/*    onChange={this.handleChange}*/}
                                    {/*/>*/}
                                </div>
                            </div>
                        );
                    }
                    status = true;
                    // items.push(
                    //     <div>
                    //         <span>Button</span>
                    //
                    //     </div>
                    // )

                }else{
                    items.push(<TextField
                        id={this.props.currentProps.id + '-edit-' + key}
                        label={translate(key)}
                        style={{marginTop: 10, marginBottom: 0}}
                        placeholder="Enter your value"
                        fullWidth
                        multiline
                        margin="normal"
                        value={(value == null) ? "" : value}
                        data-key={key}
                        variant="outlined"
                        onChange={this.handleChange}
                    />)
                    status = true;
                }
            }
        }else {
            status = false;
            items.push(<div className={'props_empy'}>
                            <div style={ {paddingTop: 310}}>
                                <div><HelpOutlineIcon /></div>
                                <div>Dont select any component</div>
                            </div>
                        </div>);
        }


        return (
            <div className={'property_panel'}>
                <div className={'panel_caption'}>Properties</div>
                <div>
                    <div id={'props_id'} style={ {
                        minHeight: 'calc(90vh - 110px)',
                        height: 'calc(90vh - 110px)',
                        overflow: 'auto',
                        paddingRight: 5
                    }}>
                        {items}
                    </div>
                    { status == true &&
                        <div style={{
                            paddingTop: 5
                        }}>
                            <Button className={ classes.buttonDelete } variant="outlined" fullWidth>
                                Delete component
                            </Button>
                        </div>
                    }
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


export default withRouter( connect(mapStateToProps,mapDispatchToProps) (withStyles(styles)(PanelProperties)));