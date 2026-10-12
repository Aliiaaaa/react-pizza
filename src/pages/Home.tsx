import { useState, useEffect, useContext } from 'react';
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
  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState<SortType>({
    name: 'популярности (DESC)',
    sortProperty: 'rating',
  });

  // при смене категории или поиска возвращаемся на первую страницу
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId, searchValue]);
  console.log('Home changed');
  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);

    const params = new URLSearchParams({
      page: String(currentPage),
      limit: '4',
      sortBy: sortType.sortProperty.replace('-', ''),
      order: sortType.sortProperty.includes('-') ? 'desc' : 'asc',
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
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(i: number) => setCategoryId(i)} />
        <Sort value={sortType} onChangeSort={(i: SortType) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={setCurrentPage} />
    </div>
  );
};

export default Home;
