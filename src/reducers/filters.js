const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle', // добавим статус для фильтров
    activeFilter: 'all', // добавим активность
}

const filters = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTERS_FETCHING': // когда фильтры загружаются, ставим состояния фильтров в loading
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED': // если фильтры загрузились, то меняем состояния filters - помещаем туда массив и состояние филтров ставим в idle
            return {
                ...state,
                filters: action.payload,
                filtersLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error' // если ошибка ставим состояние фильтров в error
            }
        case 'ACTIVE_FILTER_CHANGED': // меняем активный фильтр
            return {
                ...state,
                activeFilter: action.payload,
            }
        default: return state
    }
}

export default filters;

