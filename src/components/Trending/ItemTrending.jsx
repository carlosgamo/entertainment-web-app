import IconBookMarkEmpty from '../icons/IconBookmarkEmpty.jsx';
import './Trending.css'

const Item = ({item}) => { 
    return (
        <>
            <div className="item-trending-container">
                <img className="item-trending-image" src={item.thumbnail.trending.large}/>
                <div className='icon-bookmark-trending'>
                    <IconBookMarkEmpty item={item.isTrending}/>
                </div>
                    <div className="item-trending-info">{item.year} - {item.category}</div>
                    <div className="item-trending-title">{item.title}</div>
                    <div className='item-trending-rating'>
                            {item.rating}
                    </div>
                    
                
            </div>
        </>
    )
 };

 export default Item;