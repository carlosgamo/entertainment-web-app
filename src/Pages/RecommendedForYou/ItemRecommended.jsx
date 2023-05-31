import IconBookMarkEmpty from '../../icons/IconBookmarkEmpty';
import IconPlay from '../../icons/IconPlay';
import IconPencilEdit from '../../icons/IconPencilEdit';
import './Recommended.css';
import Popup from 'reactjs-popup';
import EditTitle from '../ControlPanel/EditTitle/EditTitle';

const ItemRecommended = ({item, profile, changeBookmarked, categories}) => { 
    return (
        <>
            <div className="item-recommended relative">
                <img className="rounded-lg w-full h-28" src={item.thumbnail}/>
                <button className="icon-bookmark-item"
                    onClick={()=> changeBookmarked(item.id)}
                >
                    <IconBookMarkEmpty item={item} profile={profile}/>
                </button>
                {profile.isAdmin 
                    ?   
                        <Popup trigger={open => (    
                            <button className="edit-item-recommended absolute top-2 left-3">
                                <IconPencilEdit item={item} profile={profile}/>
                                 {/* {open ? 'Opened' : 'Closed'} */}
                            </button>  )}  
                            modal
                            position="top center" closeOnDocumentClick>  
                            <EditTitle item={item} categories={categories}/>
                        </Popup>
                    : null
                }
                
                <div className="text-xs mt-1">
                    {item.year} - {item.category} - {item.rating}
                    <div className="item-title">{item.title}</div>
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