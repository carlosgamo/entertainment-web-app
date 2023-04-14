import { useState } from 'react';
import IconBookMarkEmpty from '../../icons/IconBookmarkEmpty';
import './Trending.css'
import { useEffect } from 'react';

const ItemTrending = ({item, changeBookmarked}) => { 

    return (
        <>
            <div className="item-trending-container">
                <img className="item-trending-image" src={item.thumbnail.trending.large}/>
                <button className='icon-bookmark-trending'
                        onClick={()=> changeBookmarked(item.title)}
                >
                    <IconBookMarkEmpty item={item}/>
                </button>
                    <div className="item-trending-info">{item.year} - {item.category}</div>
                    <div className="item-trending-title">{item.title}</div>
                    <div className='item-trending-rating'>
                            {item.rating}
                    </div>
                    
                
            </div>
        </>
    )
 };

 export default ItemTrending;