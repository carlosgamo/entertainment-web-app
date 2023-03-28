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
                <div className="text-xs text-gray-300 -mt-20 pl-4">
                    {item.year} - {item.category} 
                    <div className="text-gray-200 text-lg">{item.title}</div>
                    <div className='bg-white bg-opacity-20 rounded-full w-8 h-6 relative bottom-10 -right-44 '>
                        <div className='text-white text-opacity-70 font-semibold flex justify-center pt-1'>
                            {item.rating}
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
 };

 export default Item;