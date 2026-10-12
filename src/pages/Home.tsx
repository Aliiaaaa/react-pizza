import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Sort, { type SortItem } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';

type Pizza = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
  search: string;
};

const Home = () => {
  const [items, setItems] = useState<Pizza[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState<SortItem>({
    name: 'популярности',
    sortProperty: 'rating',
  });

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}&` : '';
    const sortBy = sortType.sortProperty;

    fetch(`https://6ac356c7ae53bf25b80e5e61.mockapi.io/items?${category}sortBy=${sortBy}&order=asc`)
      .then((res) => res.json())
      .then((arr) => setItems(arr))
      .finally(() => setIsLoading(false));

    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={setCategoryId} />
        <Sort value={sortType} onChangeSort={setSortType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;
