import {combineReducers} from 'redux';
import UserReducer from './user'
import UiReducer from './ui'
import BotsReducer from './bot'
import currentBotReducer from './currentBot'

const allReducers = combineReducers({
    user: UserReducer,
    ui: UiReducer,
    bots: BotsReducer,
    currentBot: currentBotReducer
});

export default allReducers;