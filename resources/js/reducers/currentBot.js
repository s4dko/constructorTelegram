const initialState = {
    name: "",
    forms: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CURRENT_BOT':
            return {...state, name: action.name, token: action.token, forms: action.payload }
        case 'UPDATE_FORMS':
            return {...state, forms: action.payload }
        case 'ADD_COMPONENT':
            return {...state, forms: state.forms.map( (item, index ) => {

                                        console.log( index )

                               })
            }
        default:
            return state;
    }
}