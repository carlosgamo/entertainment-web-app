import Billboard from "../Billboard/Billboard";
import SearchBar from "../../components/SearchBar";
import Carousel from "react-multi-carousel";
import ItemTrending from "../Trending/ItemTrending";

const Portfolio = ({profile, categories, sectionTitle, setSectionTitle, displayTrending, filteredData, changeSearch, changeBookmarked}) => { 

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 1
  }
};

  return(
      <> 
        <SearchBar changeSearch={changeSearch} />
        {displayTrending 
          ? <div>
              <Carousel 
                responsive={responsive}
                swipeable={true}
                draggable={true}
                showDots={false}
                ssr={false} // means to render carousel on server-side.
                infinite={true}
                autoPlaySpeed={1000}
                // // customTransition="all .5"
                // transitionDuration={500}
                containerClass="carousel-container"
                className="ml-2 mr-32"
                itemClass="carousel-item-padding-2-px"
              >
                {filteredData.filter(trend => trend.isTrending).map((item, index) => {
                  return (
                    <div key={index}>
                      <ItemTrending key={item.title} item={item} changeBookmarked={changeBookmarked}/>
                    </div>
                )})}
              </Carousel> 
            </div>

          : ""
        }

        {/* {displayTrending 
          ? <Trending data={filteredData}  changeBookmarked={changeBookmarked}/> 
          : ""
        } */}
        
        <Billboard 
          data={filteredData} 
          profile={profile}
          changeBookmarked={changeBookmarked}
          categories={categories}
          sectionTitle={sectionTitle} setSectionTitle={setSectionTitle}
        />
      </>
  )
 }

 export default Portfolio;