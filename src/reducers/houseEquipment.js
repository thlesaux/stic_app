const initialState = {
    equipment: null
}

function houseEquipment(state = initialState, action) {
    switch (action.type) {
        case 'light':
            return {
                name: "light"
            }
        case 'temperature':
            return {
                name: "temperature"
            }
        case 'others':
            return {
                name: "others"
            }
        default:
            return state
    }
}
export default houseEquipment;