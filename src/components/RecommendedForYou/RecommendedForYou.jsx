import Item from './ItemRecommended';
import './Recommended.css'

const RecommendedForYou = ({data, changeBookmarked,searchCounter, setSearchCounter}) => { 
    return(
        <>
            <div className='bg-gray-900 pl-4 ml-2'>
                <div id="title" className='text-gray-300 text-xl mb-4 pt-8 pl-2'>
                    Recommended for you
                </div>
                <div className='recommended-display'>
                    {data.map(item => (
                        <Item key={item.title} item={item} changeBookmarked={changeBookmarked}/>
                    ))}
                    
                 </div>
            </div>          
        </>
    )
};

export default RecommendedForYou;