import IconBookMarkEmpty from '../icons/IconBookmarkEmpty.jsx';

const Item = ({item}) => { 
    return (
        <>
            <div className="border-white boder-2 rounded-md text-gray-400 pt-2 pb-4">
                <img className="rounded-lg" src={"src/"+item.thumbnail.regular.small} width="180" height="150"/>
                <div className='bg-black rounded-full opacity-50 w-7 h-7 relative -top-28 -right-36 pl-2 pt-2'>
                    <IconBookMarkEmpty item={item.isBookmarked}/>
                </div>
                <div className="text-xs -mt-6">
                    {item.year} - {item.category} - {item.rating}
                    <div className="text-gray-200 text-lg">{item.title}</div>
                </div>
            </div>
        </>
    )
 };

 export default Item;