import React, { useContext, useEffect, useRef, useState } from 'react';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

const Home = () => {
    const isSearch = useRef(false);

    const { categoryId, sort, currentPage, searchValue } = useSelector((state) => state.filter);
    const { status, items } = useSelector((state) => state.pizza);
    const dispatch = useDispatch();

    const onChangePage = (number) => {
      dispatch(setCurrentPage(number));
    }

    const getPizzas = async () => {
      const sortBy = sort.sort.replace('-', '');
      const order = sort.sort.includes('-') ? 'asc' : 'desc';
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `search=${searchValue}` : '';

      dispatch(fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage
      }));

      window.scrollTo(0, 0);
    };
  
    // Если был первый рендер, то запрашиваем пиццы
    React.useEffect(() => {
      window.scrollTo(0, 0);
  
      if (!isSearch.current) {
        getPizzas();
      }
  
      isSearch.current = false;
    }, [categoryId, sort.sort, searchValue, currentPage]);


  const pizzas = items.map(pizza => <PizzaBlock {...pizza} key={pizza.id} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const onChangeCategory = (index) => {
    dispatch(setCategoryId(index))
  }

  return (
    <div className="container">
        <div className="content__top">
        <Categories value={categoryId} onClickCategory={(index) => onChangeCategory(index)} />
        <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {
          status === 'error' ? (
            <div className='content__error-info'>
              <h2>Произошла ошибка 😕</h2>
              <p>К сожалению не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
            </div>
          ) : <div className="content__items"> { status === 'loading' ? skeletons : pizzas } </div>
        }
        <Pagination currentPage={currentPage} onPageChange={onChangePage} />
    </div>
  )
}

export default Home

