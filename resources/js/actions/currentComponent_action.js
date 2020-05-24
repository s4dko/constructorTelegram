

export const setCurrentComponent = data => ({
    type: 'SET_CURRENT_COMPONENT',
    name: data.name,
    payload: data.props
})

export const deleteCurrentComponent = () => ({
    type: 'DELETE_CURRENT_COMPONENT',
})

