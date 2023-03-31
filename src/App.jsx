import { stringify } from 'postcss'
import { useEffect, useState } from 'react'
import './App.css'
import Menu from './components/Menu/Menu'
import Trending from './components/Trending/Trending'
import RecommendedForYou from './components/RecommendedForYou/RecommendedForYou'
import SearchBar from './components/SearchBar'
import data from './data.json';

import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

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

  const [ user, setUser ] = useState(null);
  const [ profile, setProfile ] = useState([]);

  const login = useGoogleLogin({
      onSuccess: (codeResponse) => setUser(codeResponse),
      onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(
      () => {
          if (user) {
              axios
                  .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                      headers: {
                          Authorization: `Bearer ${user.access_token}`,
                          Accept: 'application/json'
                      }
                  })
                  .then((res) => {
                      setProfile(res.data);
                  })
                  .catch((err) => console.log(err.message));
          }
      },
      [ user ]
  );

  const logOut = () => {
      googleLogout();
      setProfile(null);
  };

      return(
        <>
        {profile ? (
          <div className='app-container'>
            <div className='app-menu'>
              <Menu 
                changeFilter={changeFilter} filter={filter} 
                menuSelected={menuSelected} setMenuSelected={setMenuSelected}
                profile={profile}
                logOut={logOut}
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
            ) : (
              <button className='text-white font-bold text-xl mt-10 ml-10 border-2 rounded-md p-4 hover:bg-slate-300 hover:text-slate-700' onClick={() => login()}>Sign in with Google 🚀 </button>
            )}
        </>
      )
  }
export default App
