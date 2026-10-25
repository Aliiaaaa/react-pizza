import { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId, setSort } from '../redux/slices/filterSlice';
import Categories from '../components/Categories.tsx';
import Sort from '../components/Sort.tsx';
import PizzaBlock from '../components/PizzaBlock/index.tsx';
import { Skeleton } from '../components/PizzaBlock/Skeleton.tsx';
import Pagination from '../components/Pagination/index.tsx';
import { SearchContext } from '../App.tsx';

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
  category: number;
};

type SortType = {
  name: string;
  sortProperty: string;
};

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort } = useSelector((state: any) => state.filter);

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const onChangeSort = (obj: SortType) => {
    dispatch(setSort(obj));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId, searchValue]);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);

    const params = new URLSearchParams({
      page: String(currentPage),
      limit: '4',
      sortBy: sort.sortProperty.replace('-', ''),
      order: sort.sortProperty.includes('-') ? 'desc' : 'asc',
    });
    if (categoryId > 0) params.set('category', String(categoryId));
    if (searchValue) params.set('search', searchValue);

    fetch(`https://6abd88af5121d616d90cefab.mockapi.io/items?${params}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((arr) => {
        setItems(Array.isArray(arr) ? arr : []);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error(err);
          setItems([]);
          setIsLoading(false);
        }
      });

    window.scrollTo(0, 0);
    return () => controller.abort();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} onChangeSort={onChangeSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={setCurrentPage} />
    </div>
  );
};

export default Home;
