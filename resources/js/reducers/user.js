const initialState = {
    isAuth: false,
    currentUser: {},
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_USER':
            return {...state, isAuth: true, currentUser: action.payload }
        case 'LOGOUT_USER':
            return {...state, isAuth: false, currentUser: {}}
        default:
            return state;
    }
}