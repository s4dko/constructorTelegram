
import {applyMiddleware, createStore, compose, combineReducers} from "redux";
import allReducers from "./reducers";
import thunk from "redux-thunk";
import UserReducer from "./reducers/user";
import UiReducer from "./reducers/ui";
import BotReducer from "./reducers/bot";
import currentBotReducer from './reducers/currentBot'
import currentPropsReducer from './reducers/currentProps'
import currentComponentReduer from './reducers/currentComponent'

import {connectRouter} from 'connected-react-router'

// const store = routerHistory => {
//     const store  = createStore(
//         allReducers,
//         compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f)
//     );
// }
//
// export default store;




export default function configureStore(routerHistory) {


    const rootReducer = combineReducers({
        router: connectRouter(routerHistory),
        user: UserReducer,
        ui: UiReducer,
        bots: BotReducer,
        currentBot: currentBotReducer,
        currentProps: currentPropsReducer,
        currentComponent: currentComponentReduer
    });


    const store = createStore(
        connectRouter(routerHistory)(rootReducer),
        compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f)
    );

    //store.subscribe(() => console.log(store.getState()))
    return store;
};
