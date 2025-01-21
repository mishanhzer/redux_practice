import { configureStore } from '@reduxjs/toolkit'; // импортируем configureStore

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

const store = configureStore({ 
    reducer: {heroes, filters}, // подключение редьюсеров (так же как в сombineReducers)
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware), // подключение middleware - сначала встроенные middleware, а потом добавляем наш (middleware хранятся в массиве, concat используем, чтобы не мутировать массив)
    devTools: process.env.NODE_ENV !== 'production', // подключение девтулзов (булевое значение) - если разработка, то подключить, если прод, то отключить
})


export default store;



