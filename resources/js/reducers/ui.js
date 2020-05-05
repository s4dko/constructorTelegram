const initialState = {
    isLoading: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'BLOCK_UI':
            return {...state, isLoading: true}
        case 'UNBLOCK_UI':
            return {...state, isLoading: false}
        default:
            return state;
    }
}