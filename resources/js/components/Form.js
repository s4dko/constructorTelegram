import React, {Component} from 'react';
import {blockedUI, unblockedUI} from "../actions/ui_action";
import {getAllBots} from "../actions/bots_action";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import '../css/style.css'
import {setCurrentProps} from "../actions/currentProps_action";

export class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false
        }
    }

    componentDidMount(){

    }


    handleClick = () => {
        const obj = Object.assign({},this.props.currentBot.forms[this.props.index][this.props.id]);
        delete obj.child; // только копию надо
        const data = {
            index: this.props.index,
            id: this.props.id,
            props: obj
        };
        this.props.setCurrentProps(data);

        // this.setState({
        //     active: this.props.currentProps.id == this.props.id
        // });
    }

    render(){
        return (
                <div className={'form'} style={ this.props.currentProps.id == this.props.id ? { border: '1px solid #2261c6'} : { border: '1px solid #EAEAEA'} }>
                    <div onClick={this.handleClick} >
                        <div className={'form_caption'}>{this.props.name}</div>
                        <div>
                            <div>компоненты</div>
                        </div>
                    </div>
                </div>
        );
    }

}

const mapStateToProps  = (state) => ({
    currentBot: state.currentBot,
    currentProps: state.currentProps
});


const mapDispatchToProps = dispatch => ({
    blockedUI: function(){
        dispatch(blockedUI());
    },
    unblockedUI: function(){
        dispatch(unblockedUI());
    },
    setCurrentProps: function(data){
        dispatch( setCurrentProps(data) );
    }
})


export default withRouter( connect(mapStateToProps,mapDispatchToProps)(Form) );