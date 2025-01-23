// Импортируем action creatorы, которые нам нужны для комплексного action creatora (из среза)
import { heroesFetching, heroesFetched, heroesFetchingError } from "../components/heroesList/heroesSlice";
import { filtersFetching, filtersFetched, filtersFetchingError } from "../components/heroesFilters/filtersSlice";

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

// теперь мы все action creator можем удалить (потому что они создаются у нас в срезе)