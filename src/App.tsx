import './scss/app.scss';
import Header from './components/Header.tsx';
import Home from './pages/Home.tsx';
import NotFound from './pages/NotFound.tsx';
import Cart from './pages/Cart.tsx';
import { Routes, Route } from 'react-router-dom';
import { useState, createContext } from 'react';

type SearchContextType = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

export const SearchContext = createContext<SearchContextType>({
  searchValue: '',
  setSearchValue: () => {},
});

function App() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div className="wrapper">
      <div>
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SearchContext.Provider>
      </div>
    </div>
  );
}

export default App;
