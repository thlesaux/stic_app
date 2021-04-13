import { createStore, combineReducers } from 'redux';


import rooms from './reducers/rooms';
import houseEquipment from './reducers/houseEquipment';

const reducer = combineReducers({
    rooms : rooms,
    houseEquipment: houseEquipment
})

export default createStore(reducer);