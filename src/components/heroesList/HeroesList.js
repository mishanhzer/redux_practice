import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const filteredHeroes = useSelector(state => {
        if (state.activeFilter === 'all') {
            return state.heroes
        } else {
            return state.heroes.filter(hero => hero.element === state.activeFilter)
        }
    })

    const heroesLoadingStatus = useSelector(state => state.heroesLoadingStatus); // аналогично вытаскиваем состояния (возвращаем обьект стейта и из него деструктуризируем два состояния)
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => { // отправляем action загрузки персонажей
        dispatch(heroesFetching());
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
