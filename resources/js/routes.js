import React, {Component} from "react";
import {setCurrentUser} from "./actions/user_action";
import {connect, Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import {history} from "./helpers/history";
import Navbar from "./components/Navbar";
import BlockUi from "react-block-ui";
import {Route, Switch, withRouter} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {PrivateRoute} from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import {store} from "./app";
import EditBot from "./pages/EditBot";
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from  './theme'
import SettingsBot from "./pages/SettingsBot";

const theme = createMuiTheme;


class Routes extends Component{
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <MuiThemeProvider theme={theme}>
                    <Switch>
                        <BlockUi tag="div" blocking={this.props.ui.isLoading} >
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register}  />
                            <PrivateRoute path="/dashboard" component={Dashboard} />
                            <PrivateRoute path="/bot/:id" exact component={EditBot} />
                            <PrivateRoute path="/bot/:id/settings" component={SettingsBot} />
                            <Route path="/" exact component={Home} />
                        </BlockUi>
                    </Switch>
            </MuiThemeProvider>

        //     <div>
        //     <Backdrop open={this.props.ui.isLoading} >
        //     <CircularProgress color="inherit" />
        //     </Backdrop>
        // <Switch>
        //     <Route path="/login" component={Login} />
        //     <Route path="/register" component={Register}  />
        //     <PrivateRoute path="/dashboard" component={Dashboard} />
        //     <PrivateRoute path="/bot/:id" component={EditBot} />
        //     <Route path="/" exact component={Home} />
        //
        // </Switch>
        // </div>
        );
    }
}

const mapStateToProp = state => ({
    ui: state.ui
})

export default connect(mapStateToProp)(Routes);