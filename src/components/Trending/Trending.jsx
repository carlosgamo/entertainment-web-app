import data from '../../data.json';
import ItemTrending from './ItemTrending';

const RecommendedForYou = () => { 
    return(
        <>
            <div className='bg-gray-900 pl-4 pr-4'>
                <div id="title" className='text-gray-300 text-xl mb-4 pt-2 pl-2'>
                    Trending
                </div>
                <div className='ml-2'>
                    {data.filter(trend => trend.isTrending).map(item =>(
                        <ItemTrending id={item.title} item={item}/>
                    ))}
                </div>
                
            </div>       
        </>
    )
};

export default RecommendedForYou;