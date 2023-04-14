import { useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import './Home.css'

import Menu from '../../components/Menu/Menu'
import Portfolio from '../Portfolio/Portfolio.jsx'
import Dashboard from '../Dashboard/Dashboard.jsx'

import data from '../../data.json';
import { useEffect } from 'react'


function Home() {

  const location = useLocation();

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


  const [displayTrending, setDisplayTrending] = useState(true);

      return(
        <>
          <div className='app-container'>
            <div className='app-menu'>
              <Menu
                changeFilter={changeFilter} filter={filter} 
                menuSelected={menuSelected} setMenuSelected={setMenuSelected}
                profileName={location.state.newProfile}
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
                                    // profile={profile} 
                                    displayTrending={displayTrending}
                                    setDisplayTrending={setDisplayTrending}
                                />} 
                       path="/dashboard"></Route>
              </Routes>
             
            </div>
          </div>
        </>
      )
  }
export default Home
