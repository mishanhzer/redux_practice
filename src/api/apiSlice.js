import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react' // импортируем 2 главные функции RKT Query

// Когда мы делаем запрос на сервер при помощи RTK, данные кэшируются

// создаем срез с помощью функции createApi и сразу экспортируем его
export const apiSlice = createApi({ // передаем обьект с настройками
    reducerPath: 'api', // название редьюсера 
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}), // адрес для базового запроса
    tagTypes: ['Heroes'], // обозначили, какие теги (метки) у нас существуют в этом api
    endpoints: builder => ({ // эндпоинты - операции, по базовому адресу (бывают query - запрос, mutation - мутация), передаем функцию, которая возвращает обьект с настройками 
        getHeroes: builder.query({ // первый эндпоинт - получение героев (это query) (передаем обьект с настройкой запроса)
            query: () => '/heroes', // query - функция возвращает строку - адрес /heroes (после действия будет http://localhost:3001/heroes)
            providesTags: ['Heroes'] // указываем к какому тегу данные относятся
        }),
        createHero: builder.mutation({ // создание персонажа (это mutation), передаем в аргумент обьект с настройками
            query: hero => ({ // функция, передаем в аргумент героя и возвращаем обьект с настройками
                url: '/heroes', // url - адрес, где будем мутацию проводить
                method: 'POST', // метод запроса
                body: hero // тело запроса (он автоматически будет превращен в JSON формат)
            }),
            invalidatesTags: ['Heroes'] // если данные мутировали, то по какому тегу мы должны получить актуальные данные
        }),
        deleteHero: builder.mutation({ // добавляем эндпоинт - удаление персонажа (тоже мутация)
            query: id => ({
                url: `/heroes/${id}`, 
                method: 'DELETE', 
            }),
            invalidatesTags: ['Heroes'] 
        })
    })
})

// createApi автоматически генерирует react хуки на каждое наше действие и createApi создает редьюсер

export const { 
    useGetHeroesQuery, 
    useCreateHeroMutation, 
    useDeleteHeroMutation 
} = apiSlice

