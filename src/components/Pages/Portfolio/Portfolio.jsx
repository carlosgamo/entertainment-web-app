import RecommendedForYou from "../RecommendedForYou/RecommendedForYou";
import SearchBar from "../../SearchBar";
import Trending from "../Trending/Trending"

const Portfolio = ({data, filteredData, changeSearch, changeBookmarked, displayTrending={displayTrending}}) => { 

    return(
        <> 
            <div className='search-bar'>
                <SearchBar changeSearch={changeSearch} />
              </div>
              <div className='trending'>
                {displayTrending ? <Trending data={data} changeBookmarked={changeBookmarked}/> : null}
                
              </div>
              <div className='recommended-for-you'>
                <RecommendedForYou 
                  data={filteredData()} 
                  changeBookmarked={changeBookmarked}
                />
              </div>
        </>
    )
 }

 export default Portfolio;