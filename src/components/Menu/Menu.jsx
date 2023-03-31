import Logo from '../icons/Logo'
import IconNavHome from "../icons/IconNavHome.jsx";
import IconNavMovies from "../icons/IconNavMovies";
import IconNavSeries from "../icons/IconNavSeries";
import IconNavBookmark from "../icons/IconNavBookmark";
import '../Menu/Menu.css'
import Logout from '../../Logout';

const MenuMobile = ({changeFilter, menuSelected, setMenuSelected, profile, logOut}) => { 

    function handleClick(number, filter){
        setMenuSelected(number)
        changeFilter(filter)
    }  

    return(
        <>
            
                <div className="menu">
                <div id="logo" className="logo">
                    <Logo/>
                </div>
                <div id="nav-bar" className="nav-bar">
                    <div className="nav-icon"
                        onClick={() => handleClick(0,"all")}
                        >
                        <IconNavHome menuSelected={menuSelected}/>
                    </div>
                    <div className="nav-icon" 
                        // onClick={() => changeFilter("Movie")}
                        onClick={() => handleClick(1, "Movie")}
                        >
                        <IconNavMovies menuSelected={menuSelected}/>
                    </div>
                    <div className="nav-icon"
                        onClick={() => handleClick(2, "TV Series")}
                        >
                        <IconNavSeries menuSelected={menuSelected}/>
                    </div>
                    <div className="nav-icon"
                        onClick={() => handleClick(3, "isBookmarked")}
                        >
                        <IconNavBookmark menuSelected={menuSelected}/>
                    </div>
                    <button className="nav-avatar">
                        <img className='rounded-full' src={profile.picture}/>
                        <div className='nav-avatar-name'>
                            {profile.name}
                        </div>
                    </button>
                    <button className='logout-button' onClick={logOut}>Log out</button>
                    {/* <Logout/> */}
                </div>
                </div>              
        </>
    )
 };

 export default MenuMobile;