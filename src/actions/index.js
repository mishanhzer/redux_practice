export const fetchHeroes = (request) => (dispatch) => { 
    dispatch(heroesFetching());  
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data))) 
        .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching()); 
    request("http://localhost:3001/filters") 
        .then(data => dispatch(filtersFetched(data))) 
        .catch(() => dispatch(filtersFetchingError()))
}

export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

// Если фильтры загрузились то в payload помещаем filters и меняем тип (по нему менется стейт в reducers)
export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

// export const activeFilterChanged = (filter) => {
//     return {
//         type: 'ACTIVE_FILTER_CHANGED',
//         payload: filter
//     }
// }

// Добавляем функцию (потому что с помощью thunk, action может теперь возвращать и функции)
// теперь этот action creator будет возвращать функцию, которая в себя принимает dispatch (если мы юзаем thunk middleware, то dispatch приходит сюда автоматически)
export const activeFilterChanged = (filter) => (dispatch) => {
    setTimeout(() => { // используем setTimeout
        dispatch({ // т.к у нас есть dispatch, которйы приходит в аргумент автоматически - используем его и передаем в него наш обьект
            type: 'ACTIVE_FILTER_CHANGED',
            payload: filter
        })
    }, 1000)
}
// Мы возвращаем функцию, которая через 1 секунду будет запускать нужным нам dispatch

export const heroCreated = (hero) => {
    return {
        type: 'HERO_CREATED',
        payload: hero
    }
}

// Если персонаж удалился, то в payload помещаем id
export const heroDeleted = (id) => {
    return {
        type: 'HERO_DELETED',
        payload: id
    }
}

