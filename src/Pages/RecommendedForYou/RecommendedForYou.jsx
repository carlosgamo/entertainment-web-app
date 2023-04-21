import ItemRecommended from './ItemRecommended';
import './Recommended.css'

const RecommendedForYou = ({data, changeBookmarked}) => { 
    return(
        <>
            <div className='bg-white pl-4 ml-2'>
                <div id="title" className='text-slate-800 text-xl mb-4 pt-8 pl-2'>
                    Recommended for you
                </div>
                <div className='recommended-display'>
                    {data.map(item => (
                        <ItemRecommended key={item.title} item={item} changeBookmarked={changeBookmarked}/>
                    ))}
                 </div>
            </div>          
        </>
    )
};

export default RecommendedForYou;