import { createStore, combineReducers, compose, applyMiddleware } from 'redux'; // импортируем applyMiddleware
import { thunk as ReduxThunk } from "redux-thunk" // подключаем redux-thunk

import heroes from '../reducers/heroes'; 
import filters from '../reducers/filters';

const stringMiddleware = (store) => (next) => (action) => { 
    if (typeof action === 'string') { 
        return next({
            type: action
        })
    }
    return next(action)
}

const store = createStore(
    combineReducers({heroes, filters}), 
    compose(
        applyMiddleware(ReduxThunk, stringMiddleware), // добавляем redux thunk ко всем middleware
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    );

export default store;



