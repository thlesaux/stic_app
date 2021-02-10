const initialState = {
    test: null
}

function test(state = initialState, action) {
    switch (action.type) {
        case 'idFridge':
            return {
                id: action.value
            }
        default:
            return state
    }
}
export default test;