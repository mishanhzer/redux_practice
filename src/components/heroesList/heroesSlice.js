import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit"; 
import { useHttp } from '../../hooks/http.hook'; 

const heroesAdapter = createEntityAdapter() // создаем адаптер

const initialState = heroesAdapter.getInitialState({ // cоздаем начальное значение из адаптера
    heroesLoadingStatus: 'idle',
})

export const fetchHeroes = createAsyncThunk( 
    'heroes/fetchHeroes', 
    () => { 
        const {request} = useHttp(); 
        return request("http://localhost:3001/heroes") 
    }
)

const heroesSlice = createSlice({ 
    name: 'heroes', 
    initialState, // передаем начальное состояние из адаптера
    reducers: { 
        heroCreated: (state, action) => {heroesAdapter.addOne(state, action.payload)}, // используем метод адаптера по добавлению сущности - аргументы (стейт, данные)
        heroDeleted: (state, action) => {heroesAdapter.removeOne(state, action.payload)} 
    },
    extraReducers: (builder) => { 
        builder 
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'}) 
            .addCase(fetchHeroes.fulfilled, (state, action) => { 
                state.heroesLoadingStatus = 'idle' // тут не юзаем адаптер, потому что он нам тут не нужен
                // используем метод адаптера установления всех сущностей (тут внимательно, потому что будет обьект в обьекте - entities)
                heroesAdapter.setAll(state, action.payload) // заменили эту строку код - state.heroes = action.payload 
            })
            .addCase(fetchHeroes.rejected, state => {state.heroesLoadingStatus = 'error'})
            .addDefaultCase(() => {}) 
    }
})

const {actions, reducer} = heroesSlice 

export default reducer 

const {selectAll} = heroesAdapter.getSelectors(state => state.heroes) // экспортируем селектор адаптера (вытаскиваем кусочек стейта - переделав его из обьекта в массив)

export const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter, 
    selectAll, // подставляем кусочек, который лежит в selectAll - (state) => state.heroes
    (activeFilter, heroes) => { 
        if (activeFilter === 'all') { 
            return heroes
        } else {
            return heroes.filter(hero => hero.element === activeFilter)
        }
    }
)

export const { 
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} = actions

