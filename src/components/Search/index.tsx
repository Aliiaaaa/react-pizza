import { useRef } from 'react';
import styles from './Search.module.scss';

type SearchProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

export const Search = ({ searchValue, setSearchValue }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    setSearchValue('');
    inputRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        ref={inputRef}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {searchValue && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      )}
    </div>
  );
};

export default Search;
