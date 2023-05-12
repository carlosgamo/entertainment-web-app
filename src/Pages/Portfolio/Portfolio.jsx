import RecommendedForYou from "../RecommendedForYou/RecommendedForYou";
import SearchBar from "../../components/SearchBar";
import Trending from "../Trending/Trending"

const Portfolio = ({data, profile, displayTrending, filteredData, changeSearch, changeBookmarked}) => { 

  return(
      <> 
          <div className='search-bar'>
              <SearchBar changeSearch={changeSearch} />
            </div>
            <div className='trending'>
              {displayTrending ? <Trending data={filteredData()} changeBookmarked={changeBookmarked}/> : ""}
            </div>
            <div className='recommended-for-you'>
              <RecommendedForYou 
                data={filteredData()} 
                profile={profile}
                changeBookmarked={changeBookmarked}
              />
            </div>
      </>
  )
 }

 export default Portfolio;