import { useState } from 'react';

import './Home.css';

import Menu from '../../components/Menu/Menu';
import Portfolio from '../Portfolio/Portfolio.jsx';

import data from '../../data.json';
import { useEffect } from 'react';
import { useUserContext } from '../../context/UserContext';
import { fetchUserProfile } from '../../config/firebase';

function Home() {

  const {user} = useUserContext();

  const [profile, setProfile] = useState("");
  const [displayTrending, setDisplayTrending] = useState(true);

  useEffect(()=> {
    fetchUserProfile(user.uid) //user.uid
      .then((profileData) => {
        setProfile(profileData)
        setDisplayTrending(profileData.displayTrending)

      })
      .catch((error) => {
        console.log(error)
      })

      if (profile) { // DARKMODE
        if (profile.darkMode){
            document.documentElement.classList.add('dark')
        }else{
            document.documentElement.classList.add('light')
            document.documentElement.classList.remove('dark')
        }
    }
  },[profile])

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
        return items.filter((items) => profile.isBookmarked.includes(items.id) && items.title.toLowerCase().includes(searchValue));
      default:
        return;
    }
  }

  const changeBookmarked = (title) => {
    setItems(items.map(item => item.title === title ? {...item, isBookmarked: !item.isBookmarked} : item))
  };

    return(
      
      (profile ? 
      <>
        <div className='app-container'>
          <div className='app-menu'>
            <Menu
              changeFilter={changeFilter} filter={filter} 
              menuSelected={menuSelected} setMenuSelected={setMenuSelected}
              profileName={profile.name}
            />
          </div>
          <div className='main-app'>
            <Portfolio
              data={data}
              profile={profile}
              filteredData={filteredData}
              changeSearch={changeSearch}
              changeBookmarked={changeBookmarked}
              displayTrending={displayTrending}
            />
          </div>
        </div>
      </>
      : <div>Loading app...</div>)
    )
  }

export default Home
