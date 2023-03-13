import { useState } from 'react'
import './App.css'
import MenuMobile from './components/MenuMobile'
import RecommendedForYou from './components/Recommended'
import SearchBar from './components/SearchBar'

function App() {

  return (
    <>
      <div className='menu-bar'>
        <MenuMobile/>
      </div>
      <div className='search-bar'>
        <SearchBar/>
      </div>
      <div className='recommended-for-you'>
        <RecommendedForYou/>
      </div>
    </>
  )
}

export default App
