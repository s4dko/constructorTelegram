import React, {Component} from "react";

import {BrowserRouter as Router, Switch, Route, Link, withRouter} from "react-router-dom";
import { PrivateRoute } from './components/PrivateRoute';
import Home from "./pages/Home";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import BlockUi from "react-block-ui";
import {connect, Provider} from "react-redux";

import {history} from "./helpers/history";


import { ConnectedRouter } from 'connected-react-router';
import {applyMiddleware, compose, createStore} from "redux";
import allReducers from "./reducers";
import thunk from "redux-thunk";
import configureStore from "./store";
import setAuthorizationToken from "./utils/setAuthorizationToken";
import {setCurrentUser} from "./actions/user_action";
import Routes from "./routes";
import Footer from "./components/Footer";
export const store = configureStore(history)



class App extends Component{
    constructor(props) {
        super(props);

        if ( localStorage.token ){
            store.dispatch( setCurrentUser( JSON.parse(localStorage.user) ) );
        }
    }


    render() {

        return (

            <Provider store={store}>
                <ConnectedRouter history={history} >
                    <Navbar/>

                    <Routes />

                    <Footer />
                </ConnectedRouter>
            </Provider>

        );
    }
}


export default App