import React from "react";

require('./bootstrap');

import ReactDOM from "react-dom";
import App from './app';
import {Provider} from 'react-redux'
import store from './store'
import setAuthorizationToken from "./utils/setAuthorizationToken";
import {setCurrentUser} from "./actions/user_action";

// if ( localStorage.token ){
//     setAuthorizationToken( localStorage.token )
//     store.dispatch( setCurrentUser( localStorage.user ) );
// }


if (document.getElementById('root')) {
    ReactDOM.render( <App />, document.getElementById('root'));
}


