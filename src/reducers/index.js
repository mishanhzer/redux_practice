const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle', // добавим статус для фильтров
    activeFilter: 'all', // добавим активность
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
                // Убираем фильтрацию (используем ее в useSelector в HeroesList)
            }

        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
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
                // Аналогично удаляем фильтрацию
            }
        // Самая сложная часть - это показывать новые элементы по фильтрам
        // при создании или удалении
        case 'HERO_CREATED':
            return {
                ...state,
                heroes: [...state.heroes, action.payload] // Вместо переменной (она нам уже не нужна) - напрямую подставляем нового персонажа в массив
                // И тут убираем фильтрацию
            }
        case 'HERO_DELETED': 
            return {
                ...state,
                heroes: state.heroes.filter(item => item.id !== action.payload) // делаем аналогично
                // И тут убираем фильтрацию
            }
        default: return state
    }
}

export default reducer;

