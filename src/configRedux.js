import { createStore, combineReducers } from 'redux';

import test from './reducers/test';

const reducer = combineReducers({
    test : test
})

export default createStore(reducer);