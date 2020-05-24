const initialState = {
    name: "",
    props: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CURRENT_COMPONENT':
            return {...state, name: action.name, props: action.payload }
        case 'DELETE_CURRENT_COMPONENT':
            return { ...state, name: "", props: ""}
        default:
            return state;
    }
}