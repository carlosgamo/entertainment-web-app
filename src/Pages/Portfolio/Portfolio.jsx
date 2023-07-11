import Billboard from "../Billboard/Billboard";
import SearchBar from "../../components/SearchBar";
import Carousel from "react-multi-carousel";
import ItemTrending from "../Trending/ItemTrending";

const Portfolio = ({profile, categories, sectionTitle, setSectionTitle, displayTrending, setDisplayTrending, filteredData, changeSearch, changeBookmarked}) => { 

const responsive = {
  largeDesktop: {
    breakpoint: { max: 4000, min: 992 },
    items: 4,
    slidesToSlide: 1
  },
  laptop: {
    breakpoint: { max: 992, min: 768 },
    items: 3,
    slidesToSlide: 1
  },
  tablet: {
    breakpoint: { max: 768, min: 576 },
    items: 2,
    slidesToSlide: 1
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 1,
    slidesToSlide: 1,
  }
};

  return(
      <> 
        <SearchBar changeSearch={changeSearch} setDisplayTrending={setDisplayTrending} />
        {displayTrending? 
          <div>
            <Carousel 
              responsive={responsive}
              swipeable={true}
              draggable={true}
              showDots={false}
              ssr={false} // means to render carousel on server-side.
              infinite={true}
              autoPlaySpeed={1000}
              partialVisbile={false}
              // // customTransition="all .5"
              // transitionDuration={500}
              containerClass="carousel-container"
              className="ml-4 mr-4 rounded-md"
              itemClass="carousel-item-padding-2-px"
            >
              {filteredData.filter(trend => trend.isTrending).map((item, index) => {
                return (
                  <div key={index}>
                    <ItemTrending key={item.title} item={item} profile={profile} changeBookmarked={changeBookmarked}/>
                  </div>
              )})}
            </Carousel> 
          </div>

          : ""
        }

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