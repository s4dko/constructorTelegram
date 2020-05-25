import React, {Component} from 'react';
import {blockedUI, unblockedUI} from "../actions/ui_action";
import {getAllBots} from "../actions/bots_action";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import '../css/style.css'
import {setCurrentProps} from "../actions/currentProps_action";
import {updateForms} from "../actions/currentBot_action";
import Label from "./forms/label";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {deleteCurrentComponent} from "../actions/currentComponent_action";
import InlineButtons from "./forms/inlineButtons";
import Picture from "./forms/picture";
import {isEmpty} from "lodash";

export class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false
        }
    }

    componentDidMount(){

    }


    addClick = () => {
        const currentBotForm = this.props.currentBot.forms;
        const [nameForm] = Object.entries(currentBotForm[this.props.index]);

        const currentFormComponents =  this.props.currentBot.forms[this.props.index][nameForm[0]].child;
        //const namePropsComponent =  Object.entries(currentFormComponents);

        var max = 0;
        for( var name in currentFormComponents ){
            const expl = name.split('_');
            const originalName = expl[0];
            const number = expl[1];


            if ( originalName == this.props.currentComponent.name ){
                console.log(number+ ' > ' + max );
                if ( number > max )
                    max = parseInt(number);
            }
        }

        max += 1;

        const newname = this.props.currentComponent.name + '_' + max;
        // const data = {
        //     index: this.props.index,
        //     nameForm: nameForm,
        //     data: {
        //         name: newname,
        //         props:
        //     }
        // }

        // console.log(newname);
        currentBotForm[this.props.index][nameForm[0]].child[newname] = this.props.currentComponent.props
        this.props.updateForm(currentBotForm);
        this.props.deleteCurrentComponent();
    }

    handleClick = () => {
        const obj = Object.assign({},this.props.currentBot.forms[this.props.index][this.props.id]);
        delete obj.child; // только копию надо
        delete obj.top;
        delete obj.left;

        const data = {
            index: this.props.index,
            id: this.props.id,
            props: obj
        };
        this.props.setCurrentProps(data);
    }

    render(){
        const items = [];

        if ( !isEmpty(this.props.child)){
            for ( var idComponent in this.props.child ){
                const nameComponent = idComponent.split('_')[0];
                switch( nameComponent){
                    case 'label':
                        items.push(<Label status="form"  idForm={this.props.id} indexForm={this.props.index} id={idComponent} />)
                        break;
                    case 'inlineButtons':
                        items.push(<InlineButtons status="form"  idForm={this.props.id} indexForm={this.props.index} id={idComponent}/>);
                        break;
                    case 'picture':
                        items.push(<Picture status="form"  idForm={this.props.id} indexForm={this.props.index} id={idComponent}/>);
                        break;
                }
            }
        }else{
            items.push(<div className={'component_clear'}>No components</div>)
        }


        return (
            <div className={'form'} style={ this.props.currentProps.id == this.props.id ? { border: '2px solid #2261c6'} : { border: '2px solid #EAEAEA'}}>
                { (this.props.currentComponent.name != "" ) &&
                    <div className={'addBtnOverForm'} onClick={this.addClick}><AddCircleIcon style={ { position: 'relative', top:'36%'}} /></div>
                }
                <div>
                    <div onClick={this.handleClick}  className={'form_caption'}>{this.props.name}</div>
                    <div>
                        {items}
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps  = (state) => ({
    currentBot: state.currentBot,
    currentProps: state.currentProps,
    currentComponent: state.currentComponent
});


const mapDispatchToProps = dispatch => ({
    blockedUI: function(){
        dispatch(blockedUI());
    },
    unblockedUI: function(){
        dispatch(unblockedUI());
    },
    setCurrentProps: function(data) {
        dispatch(setCurrentProps(data));
    },
    updateForm: function (data) {
        dispatch( updateForms(data) )
    },
    deleteCurrentComponent: function(){
        dispatch(deleteCurrentComponent());
    }
})


export default withRouter( connect(mapStateToProps,mapDispatchToProps)(Form) );