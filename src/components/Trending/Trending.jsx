import Carousel from './Carousel';
import ItemTrending from './ItemTrending';
import './Trending.css';

const RecommendedForYou = ({data}) => { 
    return(
        <>
            <div className='trending-container'>
                <div id="title" className='text-gray-300 text-xl pt-4 mb-4 ml-6'>
                    Trending  
                </div>
                
                <Carousel data={data}/>                
            </div>       
        </>
    )
};

export default RecommendedForYou;