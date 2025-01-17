import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged } from '../../actions';
import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {
    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state); // вытаскиваем состояния из редакса
    const dispatch = useDispatch();
    const {request} = useHttp();

    // Запрос на сервер для получения фильтров и последовательной смены состояния
    useEffect(() => {
        dispatch(filtersFetching()); // отправляем action - филтры загружаются
        request("http://localhost:3001/filters") // запрос
            .then(data => dispatch(filtersFetched(data))) // если успешно, то отправляем action и помещаем туда массив фильтров
            .catch(() => dispatch(filtersFetchingError()))

        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") { // если статус филтров загрузка, то помещаем спинер
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") { // если ошибка, то вернем кусочек верстки
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    
    const renderFilters = (arr) => {
        // Если в массиве фильтров нет, то вернем кусочек верстки
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }

        // Данные в json-файле я расширил классами и текстом
        // Перебираем массив филтров
        return arr.map(({name, className, label}) => {

            // Используем библиотеку classnames и формируем классы динамически
            // active добавляется если name равен activeFilter
            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });

            // Возвращаем кнопки
            return <button 
                        key={name} 
                        id={name} 
                        className={btnClass}
                        onClick={() => dispatch(activeFilterChanged(name))} // отправляем action через клик и помещаем туда name (all, water, fire и т.д)
                        >{label}</button>
        })
    }

    const elements = renderFilters(filters); // элементы с кнопками (которые создали на основе перебора массива filters)

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;

