import { useState } from 'react'

import './Home.css'

import Menu from '../../components/Menu/Menu'
import Portfolio from '../Portfolio/Portfolio.jsx'

import data from '../../data.json';
import { useUserContext } from '../../context/UserContext';
import { useEffect } from 'react';

function Home() {

  useEffect(()=> {
    if(localStorage.getItem("displayTrending") === null){
      localStorage.setItem("displayTrending", true)
    }
  },[])

  const [filter, setFilter] = useState("all"); 

  const [searchValue, setSearchValue] = useState("");

  const [items, setItems] = useState(data);

  const [menuSelected, setMenuSelected] = useState(0);

  const changeFilter = (filter) => setFilter(filter);

  const changeSearch  = (searchValue) => setSearchValue(searchValue);

  // const {user} = useUserContext();

  const initialProfileName = localStorage.getItem("profileName");
  const [profileName, setProfileName] = useState(initialProfileName);

  const initialStateDisplayTrending = JSON.parse(localStorage.getItem("displayTrending"));
  const [displayTrending, setDisplayTrending] = useState(initialStateDisplayTrending);

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

  return(
    <>
      <div className='app-container'>
        <div className='app-menu'>
          <Menu
            changeFilter={changeFilter} filter={filter} 
            menuSelected={menuSelected} setMenuSelected={setMenuSelected}
            profileName={profileName}
          />
        </div>
        <div className='main-app'>
          <Portfolio
            data={data}
            filteredData={filteredData}
            changeSearch={changeSearch}
            changeBookmarked={changeBookmarked}
            displayTrending={displayTrending}
          />
        </div>
      </div>
    </>
  )
}

export default Home
