import { stringify } from 'postcss'
import { useState } from 'react'
import './App.css'
import MenuMobile from './components/MenuMobile'
import RecommendedForYou from './components/RecommendedForYou/RecommendedForYou'
import SearchBar from './components/SearchBar'
import data from './data.json';

function App() {
  const [filter, setFilter] = useState("all"); 

  const [items, setItems] = useState(data);

  const changeFilter = (filter) => setFilter(filter);

  const filteredData = () => {
    switch (filter) {
      case "all":
        return items;
      case "Movie":
        return items.filter((items) => items.category === "Movie");
      case "TV Series":
        return items.filter((items) => items.category === "TV Series");
      case "isBookmarked":
        return items.filter((items) => items.isBookmarked);
      default:
        // return items.filter((items) => items.title.includes(filter));
        return items.filter((items) => (items.title.includes(filter)));
    }
  }


  const changeBookmarked = (title) => {
    setItems(items.map(item => item.title === title ? {...item, isBookmarked: !item.isBookmarked} : item))
  };


  return (
    <>
      <div>
        <MenuMobile changeFilter={changeFilter} filter={filter}/>
      </div>
      <div className='search-bar'>
        <SearchBar data={filteredData()} changeFilter={changeFilter} filter={filter}/>
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
    </>
  )
}

export default App
