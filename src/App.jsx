import { stringify } from 'postcss'
import { useEffect, useState } from 'react'
import './App.css'
import Menu from './components/Menu/Menu'
import Trending from './components/Trending/Trending'
import RecommendedForYou from './components/RecommendedForYou/RecommendedForYou'
import SearchBar from './components/SearchBar'
import data from './data.json';
import Login from './Login'

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

  const loggedInUser = localStorage.getItem("authenticated");

  const [authenticated, setAuthenticated] = useState(loggedInUser);
  
  useEffect(() => {
    console.log(authenticated)
    // if (loggedInUser) {
    //   setAuthenticated(loggedInUser);
    // }
  }, []);

  // DISABLED DURING DEVELOPMENT (!authenticated)
  if (authenticated) {
      return(
        <>
          <Login/>
        </> 
      )
    } else {
      return(
        <>
          <div className='app-container'>
            {/* var accessToken = gapi.auth.getToken().access_token; */}
            <div className='app-menu'>
              <Menu 
                changeFilter={changeFilter} filter={filter} 
                menuSelected={menuSelected} setMenuSelected={setMenuSelected}
                authenticated={authenticated} setAuthenticated={setAuthenticated}
              />
            </div>
            <div className='main-app'>
              <div className='search-bar'>
                <SearchBar filteredData={filteredData().length} changeSearch={changeSearch} searchCounter={searchCounter}/>
              </div>
              <div className='trending'>
                <Trending data={data}/>
              </div>
              <div className='recommended-for-you'>
                <RecommendedForYou 
                  data={filteredData()} 
                  changeBookmarked={changeBookmarked}
                />
              </div>
            </div>
          </div>
        </>
      );
    }
}

export default App
