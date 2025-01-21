import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { fetchFilters, activeFilterChanged } from '../../actions';
import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {
    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters); 
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchFilters(request));
    }, []);

    if (filtersLoadingStatus === "loading") { // если статус филтров загрузка, то помещаем спинер
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") { // если ошибка, то вернем кусочек верстки
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    
    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Фильтры не найдены</h5>
        }

        return arr.map(({name, className, label}) => {
            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });

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

