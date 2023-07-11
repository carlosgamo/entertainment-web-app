import IconBookMarkEmpty from '../../icons/IconBookmarkEmpty';
import IconPlay from '../../icons/IconPlay';
import IconPencilEdit from '../../icons/IconPencilEdit';
import IconCategoryMovie from '../../icons/IconCategoryMovie';
import IconCategoryTV from '../../icons/IconCategoryTV'
import './Billboard.css';
import Popup from 'reactjs-popup';
import EditTitle from '../ControlPanel/EditTitle/EditTitle';
import { useState } from 'react';

const BillboardItem = ({item, profile, changeBookmarked, categories}) => { 

    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);

    return (
        <>
            <div className="item-recommended relative">
                <img className="rounded-md w-full h-28" src={item.thumbnail}/>
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
                                <button className="close-modal-button" onClick={closeModal}>X</button>
                                <EditTitle item={item} categories={categories}/>
                            </Popup>
                        </div>
                    : null
                }
                
                <div className="item-details">
                    {item.year} - 
                    <div className='mr-1 ml-0.5 mt-0.5'>
                        {item.category === "Movie" ?<IconCategoryMovie/> : <IconCategoryTV/>} 
                    </div>
                    {item.category} - {item.rating}
                </div>
                <div className="item-title">{item.title}</div>
                <button id='icon-play-overlay' 
                     className='relative -top-28 left-16 
                                opacity-0 hover:opacity-60'>
                    <IconPlay/>
                </button>
            </div>
        </>
    )
 };

 export default BillboardItem;