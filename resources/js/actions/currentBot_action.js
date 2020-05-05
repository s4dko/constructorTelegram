
export const setCurrentBot = data => ({
    type: 'SET_CURRENT_BOT',
    name: data.name,
    payload: data.forms
})

export const updateForms = data => ({
    type: 'UPDATE_FORMS',
    payload: data
})

