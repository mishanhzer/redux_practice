import { createSlice } from "@reduxjs/toolkit"; // импортируем функцию createSlice

// Главное не забывать, что это тот же редакс - внутри createSlice на самом деле все тот же паттерн - вызываются функции dispatch с какими то action, они попадают в редьюсер и редьюсер меняет наш стор (просто теперь он обернут в функцию createSlice и делает использование редакса более удобным)

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroesSlice = createSlice({ 
    name: 'heroes', 
    initialState, 
    reducers: { // создаем action creator и подкрепляем под них дейтсвия (обьединение action и reducer)
        heroesFetching: state => {state.heroesLoadingStatus = 'loading'}, // не возвращаем, чтобы не отключить immer
        heroesFetched: (state, action) => { 
            state.heroesLoadingStatus = 'idle'
            state.heroes = action.payload 
        },
        heroesFetchingError: state => {state.heroesLoadingStatus = 'error'},
        heroCreated: (state, action) => {state.heroes.push(action.payload) },
        heroDeleted: (state, action) => {state.heroes = state.heroes.filter(item => item.id !== action.payload)}
    },
})

const {actions, reducer} = heroesSlice // вытаскиваем сущности

export default reducer 
export const { // вытаскиваем action creatorы
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} = actions

