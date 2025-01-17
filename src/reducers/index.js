const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filtersLoadingStatus: 'idle', // добавим статус для фильтров
    activeFilter: 'all', // добавим активность
    // Убираем состояние filteredHeroes (заменили на использолвание филтрации внутри useSelector)
}

// 1. Отфильровал героев относительно стандартного расположения класса active при загрузке персонажей
// 2. фильтруем геров относительного того на какую кнопку мы нажали
// 3. Фильтруем героев относительно нового массива (где мы добавили нового персонажа)
// 4. Фильтруем героев относительного нового массива (где мы удаляем персонажа)

// Вместо этого мы выносим всю филтрацию в использование ее внутри useSelector в компоненте HeroesList
// В reducer мы оставляем только самые простые операции (назначение данных без условий)

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
            }
        default: return state
    }
}

export default reducer;

