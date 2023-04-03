import Carousel from './Carousel';
import './Trending.css';

const Trending = ({data}) => { 
    return(
        <>
            <div className='trending-container'>
                <div id="title" className='trending-title'>
                    Trending  
                </div>
                
                <Carousel data={data}/>                
            </div>       
        </>
    )
};

export default Trending;