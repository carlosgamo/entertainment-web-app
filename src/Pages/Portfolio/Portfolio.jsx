import RecommendedForYou from "../RecommendedForYou/RecommendedForYou";
import SearchBar from "../../components/SearchBar";
import Trending from "../Trending/Trending"

const Portfolio = ({data, filteredData, changeSearch, changeBookmarked}) => { 

    return(
        <> 
            <div className='search-bar'>
                <SearchBar changeSearch={changeSearch} />
              </div>
              <div className='trending'>
                <Trending data={filteredData()} changeBookmarked={changeBookmarked}/>
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