import { useState } from 'react';

export type SortItem = { name: string; sortProperty: string };

type Props = {
  value: SortItem;
  onChangeSort: (item: SortItem) => void;
};

const list: SortItem[] = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];

function Sort({ value, onChangeSort }: Props) {
  const [open, setOpen] = useState(false);

  const onClickListItem = (obj: SortItem) => {
    onChangeSort(obj);
    setOpen(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {list.map((obj) => (
              <li
                key={obj.sortProperty}
                onClick={() => onClickListItem(obj)}
                className={value.sortProperty === obj.sortProperty ? 'active' : ''}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
