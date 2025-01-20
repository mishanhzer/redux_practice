// Разделяем на два разных редьюсера - heroes и filters и удаляем в них ненужные строки (в heroes оставляем, что относится к heroes, и в filters аналогично)
// Чтобы использовать потом в одном компоненте два разных состояния - необходимо юзать функцию createSelector из библиотеки reselect
const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroes = (state = initialState, action) => {
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
            }

        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HERO_CREATED':
            return {
                ...state,
                heroes: [...state.heroes, action.payload] 
            }
        case 'HERO_DELETED': 
            return {
                ...state,
                heroes: state.heroes.filter(item => item.id !== action.payload) // делаем аналогично
            }
        default: return state
    }
}

export default heroes;

