import React, {  useRef } from 'react';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/slices/filter/selectors';
import { setCategoryId, setCurrentPage } from '../redux/slices/filter/slice';
import { selectPizzaData } from '../redux/slices/pizza/selectors';
import { fetchPizzas } from '../redux/slices/pizza/asyncActions';

const Home: React.FC = () => {
    const isSearch = useRef(false);

    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
    const { status, items } = useSelector(selectPizzaData);
    const dispatch = useAppDispatch();

    const onChangePage = (page: number) => {
      dispatch(setCurrentPage(page));
    }

    const getPizzas = async () => {
      const sortBy = sort.sort.replace('-', '');
      const order = sort.sort.includes('-') ? 'asc' : 'desc';
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `search=${searchValue}` : '';

      dispatch(
        fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryId, sort.sort, searchValue, currentPage]);

  const pizzas = items.map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const onChangeCategory = React.useCallback((index: number) => {
    dispatch(setCategoryId(index))
  }, [])

  return (
    <div className="container">
        <div className="content__top">
        <Categories value={categoryId} onClickCategory={(index: number) => onChangeCategory(index)} />
        <Sort value={sort} />
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

