
export const setCurrentBot = data => ({
    type: 'SET_CURRENT_BOT',
    name: data.name,
    token: data.token,
    payload: data.forms
})

export const updateForms = data => ({
    type: 'UPDATE_FORMS',
    payload: data
})

export const addNewComponent = data => ({
    type: 'ADD_COMPONENT',
    payload: data
})