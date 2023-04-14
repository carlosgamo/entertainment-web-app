import Carousel from '../../components/Carousel';
import './Trending.css';

const Trending = ({data, changeBookmarked}) => { 
    return(
        <>
            <div className='trending-container'>
                <div id="title" className='trending-title'>
                    Trending  
                </div>
                
                <Carousel id="carousel" data={data} changeBookmarked={changeBookmarked}/>                
            </div>       
        </>
    )
};

export default Trending;