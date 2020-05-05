const initialState = {
    index: null,
    id: "",
    props: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_CURRENT_PROPS':
            return {...state, index: action.index, id: action.id, props: action.payload }
        case 'UPDATE_PROPS':
            return {...state, props: action.payload }
        default:
            return state;
    }

}