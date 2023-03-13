import data from '../../data.json';
import Item from './ItemRecommended';

const RecommendedForYou = () => { 
    return(
        <>
            <div className='bg-gray-900 pl-4 pr-4'>
                <div id="title" className='text-gray-300 text-xl mb-4 pt-2 pl-2'>
                    Recommended for you
                </div>
                <div className='ml-2 grid grid-cols-2'>
                    {data.map(item => (
                        <Item id={item.title} item={item}/>
                    ))}
                </div>
                
            </div>       
        </>
    )
};

export default RecommendedForYou;