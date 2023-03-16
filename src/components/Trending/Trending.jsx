import data from '../../data.json';
import ItemTrending from './ItemTrending';
import './Trending.css';

const RecommendedForYou = () => { 
    return(
        <>
            <div className='bg-gray-900 ml-2 pr-4 '>
                <div id="title" className='text-gray-300 text-xl mb-4 pt-2 pl-2'>
                    Trending
                </div>
                <div className='trending-display'>
                    {data.filter(trend => trend.isTrending).map(item =>(
                        <ItemTrending id={item.title} item={item}/>
                    ))}
                </div>
                
            </div>       
        </>
    )
};

export default RecommendedForYou;