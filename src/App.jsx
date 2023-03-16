import { stringify } from 'postcss'
import { useState } from 'react'
import './App.css'
import Menu from './components/Menu/Menu'
import Trending from './components/Trending/Trending'
import RecommendedForYou from './components/RecommendedForYou/RecommendedForYou'
import SearchBar from './components/SearchBar'
import data from './data.json';

function App() {
  const [filter, setFilter] = useState("all"); 

  const [searchValue, setSearchValue] = useState("");

  const [searchCounter, setSearchCounter] = useState(0);

  const [items, setItems] = useState(data);

  const [menuSelected, setMenuSelected] = useState(0);

  const changeFilter = (filter) => setFilter(filter);

  const changeSearch  = (searchValue) => setSearchValue(searchValue);

  const filteredData = () => {
    switch (filter) {
      case "all":
        return items.filter((items) => items.title.toLowerCase().includes(searchValue.toLowerCase()));
      case "Movie":
        return items.filter((items) => items.category === "Movie" && items.title.includes(searchValue));
      case "TV Series":
        return items.filter((items) => items.category === "TV Series" && items.title.includes(searchValue));
      case "isBookmarked":
        return items.filter((items) => items.isBookmarked && items.title.includes(searchValue));
      default:
        return;
    }
  }

  const changeBookmarked = (title) => {
    setItems(items.map(item => item.title === title ? {...item, isBookmarked: !item.isBookmarked} : item))
  };

  return (
    <>
    <div className='app-container'>
      <div className='app-menu'>
        <Menu 
          changeFilter={changeFilter} filter={filter} 
          menuSelected={menuSelected} setMenuSelected={setMenuSelected}/>
      </div>
      <div className='main-app'>
        <div className='search-bar'>
          {/* <SearchBar data={filteredData()} changeFilter={changeFilter} filter={filter}/> */}
          <SearchBar filteredData={filteredData().length} changeSearch={changeSearch} searchCounter={searchCounter}/>
        </div>
        {/* <div className='trending'>
          <Trending/>
        </div> */}
        <div className='recommended-for-you'>
          <RecommendedForYou 
            data={filteredData()} 
            changeBookmarked={changeBookmarked}
          />
        </div>
      </div>
    </div>
    </>
  )
}

export default App
