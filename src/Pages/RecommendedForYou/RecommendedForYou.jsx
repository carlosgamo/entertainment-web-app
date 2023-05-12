import ItemRecommended from './ItemRecommended';
import './Recommended.css'

const RecommendedForYou = ({data, profile, changeBookmarked}) => { 
    return(
        <>
            <div className='bg-white dark:bg-slate-800 pl-4 ml-2'>
                <div id="title" className='recommended-title'>
                    Recommended for you
                </div>
                <div className='recommended-display'>
                    {data.map(item => (
                        <ItemRecommended key={item.title} item={item} profile={profile} changeBookmarked={changeBookmarked}/>
                    ))}
                 </div>
            </div>          
        </>
    )
};

export default RecommendedForYou;