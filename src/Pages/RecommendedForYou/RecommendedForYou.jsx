import { useEffect, useState } from 'react';
import ItemRecommended from './ItemRecommended';
import './Recommended.css'

const RecommendedForYou = ({data, profile, changeBookmarked, categories}) => { 

    const titlesPerRow = 10;
    const [next, setNext] = useState(titlesPerRow);

    const handleMoreTitles = () => {
        setNext(next + titlesPerRow);
    }

    return(
        <>
            <div className='bg-white dark:bg-slate-800 pl-4'>
                <div id="title" className='recommended-title'>
                    Recommended for you
                </div>
                <div className='recommended-display'>
                    {data?.slice(0, next)?.map(item => (
                        <ItemRecommended 
                            key={item.id} 
                            item={item} 
                            profile={profile} 
                            changeBookmarked={changeBookmarked}
                            categories={categories}
                        />
                        
                    ))}
                </div>
            </div>          
                {next < data?.length && (
                    <div className='flex justify-center'>
                        <button
                            className="control-panel-button"
                            onClick={handleMoreTitles}
                        >
                            Load more
                        </button>
                    </div>
                )}
        </>
    )
};

export default RecommendedForYou;