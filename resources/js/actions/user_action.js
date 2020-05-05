
export const setCurrentUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})

export const logout = userObj => ({
    type: 'LOGOUT_USER'
})



