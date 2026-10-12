import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Sort, { type SortItem } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

type Pizza = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

type HomeProps = {
  searchValue: string;
};

const LIMIT = 4; // пицц на странице

const Home = ({ searchValue }: HomeProps) => {
  const [items, setItems] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState<SortItem>({
    name: 'популярности',
    sortProperty: 'rating',
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId, sortType, searchValue]);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}&` : '';
    const sortBy = sortType.sortProperty;

    fetch(`https://6ac356c7ae53bf25b80e5e61.mockapi.io/items?${category}sortBy=${sortBy}&order=asc`)
      .then((res) => (res.ok ? res.json() : []))
      .then((arr) => setItems(Array.isArray(arr) ? arr : []))
      .catch(() => setItems([]))
      .finally(() => setIsLoading(false));

    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  // 1. фильтруем по названию
  const filtered = items.filter((obj) =>
    obj.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  // 2. считаем страницы и берём нужный кусок списка
  const pageCount = Math.ceil(filtered.length / LIMIT);
  const start = (currentPage - 1) * LIMIT;

  const pizzas = filtered
    .slice(start, start + LIMIT)
    .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(LIMIT)].map((_, i) => <Skeleton key={i} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={setCategoryId} />
        <Sort value={sortType} onChangeSort={setSortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading ? skeletons : pizzas.length > 0 ? pizzas : <p>Ничего не найдено</p>}
      </div>
      {!isLoading && (
        <Pagination currentPage={currentPage} pageCount={pageCount} onChangePage={setCurrentPage} />
      )}
    </>
  );
};

export default Home;
