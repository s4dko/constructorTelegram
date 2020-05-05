const initialState = {
    count: 0,
    botlist: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_BOTS':
            return {...state, count: action.payload.count, botlist: action.payload.list }
        default:
            return state;
    }
}