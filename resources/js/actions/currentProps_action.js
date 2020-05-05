
export const setCurrentProps = data => ({
    type: 'SET_CURRENT_PROPS',
    index: data.index,
    id: data.id,
    payload: data.props
})

export const updateProps = data => ({
    type: 'UPDATE_PROPS',
    payload: data.props
})