import { useState } from 'react';
import BillboardItem from './BillboardItem';
import './Billboard.css'

const Billboard = ({data, profile, sectionTitle, changeBookmarked, categories}) => { 

    const TITLES_PER_ROW_MOBILE = 10;
    const TITLES_PER_ROW_DESKTOP = 30;

    const isMobile = window.innerWidth <= 768;
    
    const [titlesPerRow, setTitlesPerRow] = useState(() => isMobile === true ? TITLES_PER_ROW_MOBILE : TITLES_PER_ROW_DESKTOP)
    
    const [next, setNext] = useState(titlesPerRow);

    const handleMoreTitles = () => {
        setNext(next + titlesPerRow);
    }

    return(
        <>
            <div className='container'>
                <div id="title" className='recommended-title'>
                    {sectionTitle}
                </div>
                <div className='recommended-display'>
                    {data?.slice(0, next)?.map(item => (
                        <BillboardItem 
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

export default Billboard;