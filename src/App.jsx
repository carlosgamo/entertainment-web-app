import './App.css'
import MenuMobile from './components/MenuMobile'
import RecommendedForYou from './components/RecommendedForYou/RecommendedForYou'
import SearchBar from './components/SearchBar'
import Trending from './components/Trending/Trending'

function App() {

  return (
    <>
      <div>
        <MenuMobile/>
      </div>
      <div className='search-bar'>
        <SearchBar/>
      </div>
      <div className='trending'>
        <Trending/>
      </div>
      <div className='recommended-for-you'>
        <RecommendedForYou/>
      </div>
    </>
  )
}

export default App
