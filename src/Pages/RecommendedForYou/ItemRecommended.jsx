import IconBookMarkEmpty from '../../icons/IconBookmarkEmpty';
import IconPlay from '../../icons/IconPlay';
import IconPencilEdit from '../../icons/IconPencilEdit';
import './Recommended.css';
import Popup from 'reactjs-popup';
import EditTitle from '../ControlPanel/EditTitle/EditTitle';
import { useState } from 'react';

const ItemRecommended = ({item, profile, changeBookmarked, categories}) => { 

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    return (
        <>
            <div className="item-recommended relative">
                <img className="rounded-lg w-full h-28" src={item.thumbnail}/>
                <button className="icon-bookmark-item"
                    onClick={()=> changeBookmarked(item.id) }
                >
                    <IconBookMarkEmpty item={item} profile={profile}/>
                </button>
                {profile.isAdmin 
                    ?   
                        <div>
                            {/* {open ? 'Opened' : 'Closed'} */}
                            <button className="edit-item-recommended absolute top-2 left-3" onClick={()=> setOpen(true)}>
                                <IconPencilEdit item={item} profile={profile}/>
                                
                            </button>  
                            {/* <Popup trigger={open => (   */}
                            <Popup open={open} onClose={closeModal} 
                                modal
                                nested
                                closeOnEscape
                                // lockScroll
                                repositionOnResize
                                closeOnDocumentClick
                                position="top" 
                            >  
                                <button className="rounded-lg bg-white absolute top-5 right-16 w-7 h-7" onClick={closeModal}>X</button>
                                <EditTitle item={item} categories={categories}/>
                            </Popup>
                        </div>
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