import IconBookMarkEmpty from '../../icons/IconBookmarkEmpty';
import IconPlay from '../../icons/IconPlay';
import IconPencilEdit from '../../icons/IconPencilEdit';
import './Recommended.css';
import Popup from 'reactjs-popup';
import EditTitle from '../ControlPanel/EditTitle/EditTitle';

const ItemRecommended = ({item, profile, changeBookmarked, categories}) => { 
    return (
        <>
            <div className="item-recommended">
                <img className="rounded-lg" src={item.thumbnail.regular.small}/>
                <button className='bg-gray-700 rounded-full opacity-80 w-7 h-7 
                                relative -top-24 -right-28 pl-2 '
                    onClick={()=> changeBookmarked(item.id)}
                >
                    <IconBookMarkEmpty item={item} profile={profile}/>
                </button>
                {profile.isAdmin 
                    ?   
                        <Popup trigger={open => (    
                            <button className="edit-item-recommended">
                                <IconPencilEdit item={item} profile={profile}/>
                                 {/* {open ? 'Opened' : 'Closed'} */}
                            </button>  )}  
                            modal
                            position="top center" closeOnDocumentClick>  
                            <EditTitle item={item} categories={categories}/>
                        </Popup>

                        // <button className='bg-gray-700 rounded-full opacity-80 w-7 h-7 
                        // relative -top-24 -left-4 pl-2'
                        //     onClick={()=> console.log("Editing item: " + item.id)}
                        // >
                        //     <IconPencilEdit item={item} profile={profile}/>
                        // </button>
                    : null
                }
                
                <div className="text-xs -mt-6">
                    {item.year} - {item.category} - {item.rating}
                    <div className="text-gray-800 dark:text-slate-200 text-base font-medium">{item.title}</div>
                </div>
                <button id='icon-play-overlay' 
                     className='relative -top-28 left-16 
                                opacity-0 hover:opacity-60'>
                    <IconPlay/>
                </button>
            </div>
        </>
    )
 };

 export default ItemRecommended;