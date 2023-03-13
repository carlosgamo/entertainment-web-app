import IconBookMarkEmpty from '../icons/IconBookmarkEmpty.jsx';

const Item = ({item}) => { 
    return (
        <>
            <div className="border-white boder-2 rounded-md text-gray-400 pt-2 pb-4">
                <img className="rounded-lg" src={"src/"+item.thumbnail.trending.large} width="250"/>
                <div className='bg-black rounded-full opacity-50 w-7 h-7 relative -top-28 -right-52 pl-2 pt-2'>
                    <IconBookMarkEmpty item={item.isTrending}/>
                </div>
                <div className="text-xs -mt-20 pl-4">
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