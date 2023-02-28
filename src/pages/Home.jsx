import React, { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import axios from 'axios';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const { searchValue } = useContext(SearchContext);
    const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
    const sortType = sort.sort;
    const dispatch = useDispatch();

    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    const onChangePage = (number) => {
      dispatch(setCurrentPage(number));
    }
  
    useEffect(() => {
      setLoading(true);
      // fetch(`https://63e4c1e08e1ed4ccf6e54873.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
      // .then(res => res.json()).then(json => {
      //   setItems(json); 
      //   setLoading(false);
      // });
      axios.get(`https://63e4c1e08e1ed4ccf6e54873.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        .then((res) => {
          setItems(res.data); 
          setLoading(false);
        });
      window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage])

  const pizzas = items.map(pizza => <PizzaBlock {...pizza} key={pizza.id} />);
  // const pizzas = items.filter(pizza => { ФИЛЬТРАЦИЯ В REACT
  //   if (pizza.title.toLowerCase().includes(searchValue.toLowerCase())) {
  //     return true;
  //   }

  //   return false;
  // }).map(pizza => <PizzaBlock {...pizza} key={pizza.id} />);
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
        <div className="content__items"> { isLoading ? skeletons : pizzas } </div>
        <Pagination currentPage={currentPage} onPageChange={onChangePage} />
    </div>
  )
}

export default Home

