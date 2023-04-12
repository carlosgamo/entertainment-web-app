import Carousel from './Carousel';
import './Trending.css';

const Trending = ({data, changeBookmarked}) => { 
    return(
        <>
            <div className='trending-container'>
                <div id="title" className='trending-title'>
                    Trending  
                </div>
                
                <Carousel data={data} changeBookmarked={changeBookmarked}/>                
            </div>       
        </>
    )
};

export default Trending;