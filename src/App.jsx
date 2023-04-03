import { useEffect, useState } from 'react'
import './App.css'
import Menu from './components/Menu/Menu'
import Portfolio from './components/Pages/Portfolio/Portfolio.jsx'
import Dashboard from './components/Pages/Dashboard/Dashboard.jsx'

import data from './data.json';

import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom'

function App() {
  const [filter, setFilter] = useState("all"); 

  const [searchValue, setSearchValue] = useState("");


  const [items, setItems] = useState(data);

  const [menuSelected, setMenuSelected] = useState(0);

  const changeFilter = (filter) => setFilter(filter);

  const changeSearch  = (searchValue) => setSearchValue(searchValue);

  const filteredData = () => {
    switch (filter) {
      case "all":
        return items.filter((items) => items.title.toLowerCase().includes(searchValue.toLowerCase()));
      case "Movie":
        return items.filter((items) => items.category === "Movie" && items.title.toLowerCase().includes(searchValue));
      case "TV Series":
        return items.filter((items) => items.category === "TV Series" && items.title.toLowerCase().includes(searchValue));
      case "isBookmarked":
        return items.filter((items) => items.isBookmarked && items.title.toLowerCase().includes(searchValue));
      default:
        return;
    }
  }

  const changeBookmarked = (title) => {
    setItems(items.map(item => item.title === title ? {...item, isBookmarked: !item.isBookmarked} : item))
  };

  const [ user, setUser ] = useState([]); //Set to null in order to work or [] for dev
  const [ profile, setProfile ] = useState([]);

  const login = useGoogleLogin({
      onSuccess: (codeResponse) => setUser(codeResponse),
      onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
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
      setUser(null)
      setProfile(null);
  };


  const [displayTrending, setDisplayTrending] = useState(true);

      return(
        <>
        {user ? (
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
              <Routes>
                <Route element={<Portfolio 
                                  data={data}
                                  filteredData={filteredData}
                                  changeSearch={changeSearch}
                                  displayTrending={displayTrending}
                                  changeBookmarked={changeBookmarked}
                                  />} path="/"></Route>
                <Route element={<Dashboard 
                                    profile={profile} 
                                    displayTrending={displayTrending}
                                    setDisplayTrending={setDisplayTrending}
                                />} 
                       path="/dashboard"></Route>
              </Routes>
             
            </div>
          </div>
            ) : (
              <button className="login-button" onClick={() => login()}>Sign in with Google 🚀 </button>
            )}
        </>
      )
  }
export default App
