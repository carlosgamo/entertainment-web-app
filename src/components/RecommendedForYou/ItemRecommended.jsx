import IconBookMarkEmpty from '../icons/IconBookmarkEmpty.jsx';
import IconPlay from '../icons/IconPlay';

const Item = ({item, changeBookmarked}) => { 
    return (
        <>
            <div className="border-white boder-2 rounded-md text-gray-400 
                w-40 h-40 pl-1.5 pt-2 mb-2">
                <img className="rounded-lg" src={item.thumbnail.regular.small} width="150"/>
                <div className='bg-black rounded-full opacity-50 w-7 h-7 relative -top-24 -right-28 pl-2 pt-2'
                    onClick={()=> changeBookmarked(item.title)}
                >
                    <IconBookMarkEmpty item={item.isBookmarked}/>
                </div>
                <div className="text-xs -mt-6">
                    {item.year} - {item.category} - {item.rating}
                    <div className="text-gray-200 text-base">{item.title}</div>
                </div>
                <div id='icon-play-overlay' 
                     className='relative -top-28 left-14 
                                opacity-0 hover:opacity-60'>
                    <IconPlay/>
                </div>
            </div>
        </>
    )
 };

 export default Item;