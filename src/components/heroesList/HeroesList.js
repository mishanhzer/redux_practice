import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import { createSelector } from 'reselect' // Импортируем библиотеку

import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

const HeroesList = () => {
    const filteredHeroesSelector = createSelector(
        (state) => state.filters.activeFilter, 
        (state) => state.heroes.heroes, 
        (activeFilter, heroes) => { 
            if (activeFilter === 'all') { 
                return heroes
            } else {
                return heroes.filter(hero => hero.element === activeFilter)
            }
        }
    )

    const filteredHeroes = useSelector(filteredHeroesSelector) 
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => { 
        // dispatch(heroesFetching());
        // Мы значем, что в dispatch мы передаем обьект со свойством type и доп. полями, если нужно
        // Но как сделать так, чтобы не было ошибки, если мы передадим туда строку (используем store enhancers)
        dispatch('HEROES_FETCHING'); 
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data))) 
            .catch(() => dispatch(heroesFetchingError()))
    }, []);

    const onDelete = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(data => console.log(data, 'Deleted'))
            .then(dispatch(heroDeleted(id))) 
            .catch(err => console.log(err));
    }, [request]); 

    // Аналогично HeroesFilters
    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        // Если массив пустой, то добавим анимацию с текстом, что героев пока нет
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }

        // Перебираем массив, добавляем анимацию, и возвращаем компонент списка героев, куда прокидываем метод по удалению персонажа
        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition 
                    key={id}
                    timeout={500}
                    classNames="hero">
                    <HeroesListItem  {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes); // в elements помещаем компоненты, которые вернули из функции renderHeroesList
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;
