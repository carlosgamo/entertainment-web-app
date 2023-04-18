import IconBookMarkEmpty from '../../icons/IconBookmarkEmpty';
import IconPlay from '../../icons/IconPlay';
import './Recommended.css';

const ItemRecommended = ({item, changeBookmarked}) => { 
    return (
        <>
            <div className="item-recommended">
                <img className="rounded-lg" src={item.thumbnail.regular.small}/>
                <button className='bg-black rounded-full opacity-50 w-7 h-7 
                                relative -top-24 -right-28 pl-2 '
                    onClick={()=> changeBookmarked(item.title)}
                >
                    <IconBookMarkEmpty item={item}/>
                </button>
                <div className="text-xs -mt-6">
                    {item.year} - {item.category} - {item.rating}
                    <div className="text-gray-200 text-base">{item.title}</div>
                </div>
                <div id='icon-play-overlay' 
                     className='relative -top-28 left-16 
                                opacity-0 hover:opacity-60'>
                    <IconPlay/>
                </div>
            </div>
        </>
    )
 };

 export default ItemRecommended;