import IconBookMarkEmpty from '../../icons/IconBookmarkEmpty';
import './Trending.css'

const ItemTrending = ({item, changeBookmarked}) => { 

    function handleClick() {
        console.log(item.isBookmarked)
        changeBookmarked(item.title)
    }

    return (
        <>
            <div className="item-trending-container">
                <img className="item-trending-image" src={item.thumbnail.trending.large}/>
                <button className='icon-bookmark-trending'
                        onClick={()=> handleClick()}
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