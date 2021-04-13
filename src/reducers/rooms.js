const initialState = {
    rooms: null
}

function rooms(state = initialState, action) {
    switch (action.type) {
        case 'kitchen':
            return {
                name: "kitchen"
            }
        case 'salon':
            return {
                name: "salon"
            }
        case 'bedroom':
            return {
                name: "bedroom"
            }
        case 'bathroom':
            return {
                name: "bathroom"
            }
        default:
            return state
    }
}
export default rooms;