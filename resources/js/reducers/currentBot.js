const initialState = {
    name: "",
    forms: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CURRENT_BOT':
            return {...state, name: action.name, forms: action.payload }
        default:
            return state;
    }
}