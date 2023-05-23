import { useState } from 'react';

import './Home.css';

import Menu from '../../components/Menu/Menu';
import Portfolio from '../Portfolio/Portfolio.jsx';

//import data from '../../data.json';
import { useEffect } from 'react';
import { useUserContext } from '../../context/UserContext';
import { fetchCategories, fetchTitles, fetchUserProfile, updateBookmarked, updateTitle } from '../../config/firebase';

function Home() {

  const {user} = useUserContext();

  const [profile, setProfile] = useState("");
  const [displayTrending, setDisplayTrending] = useState(true);

  const [items, setItems] = useState([]);

  const [filter, setFilter] = useState("all"); 
  const [searchValue, setSearchValue] = useState("");
  
  const [menuSelected, setMenuSelected] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    fetchUserProfile(user.uid)
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
  },[profile]) //[profile] Quota exceeded.

  useEffect(() => {
    fetchTitles()
      .then((data) => {
        setItems(data)
      })
      .catch((error) => {
        console.log("Error loading titles: " + error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const [categories, setCategories] = useState("");
  useEffect(() => {
    fetchCategories()
        .then((data) =>{
            setCategories(data)
        })
        .catch((error) => {
            console.log("Error fetching categories "+ error)
        })
  }, [])

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

  const changeBookmarked = (id) => {
    updateBookmarked(user, id, profile.isBookmarked.includes(id))
      .catch((error) => {
          console.log("Error updating bookmkark -> " + error)
      })
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
            items={items}
            profile={profile}
            filteredData={filteredData}
            changeSearch={changeSearch}
            changeBookmarked={changeBookmarked}
            displayTrending={displayTrending}
            categories={categories}
          />
        </div>
      </div>
    </>
    : <div>Loading app...</div>)
  )
}

export default Home
