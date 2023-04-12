import Logo from '../../icons/Logo'
import IconNavHome from "../../icons/IconNavHome.jsx";
import IconNavMovies from "../../icons/IconNavMovies";
import IconNavSeries from "../../icons/IconNavSeries";
import IconNavBookmark from "../../icons/IconNavBookmark";
import Logout from "../Logout.jsx"
import './Menu.css';
import { Link } from 'react-router-dom';

const MenuMobile = ({changeFilter, menuSelected, setMenuSelected, profile, logOut}) => { 

    function handleClick(number, filter){
        setMenuSelected(number)
        changeFilter(filter)
    }  

    return(
        <>
            
                <div className="menu">
                <Link id="logo" className="logo" to="/">
                    <Logo/>
                </Link>
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
                    <Link className="nav-avatar" to="/">
                        {/* <img className='rounded-full' src={profile.picture}/> */}
                        <div className='nav-avatar-name'>
                            {/* {profile.name} */}
                        </div>
                    </Link>
                    <Logout/>
                </div>
                </div>              
        </>
    )
 };

 export default MenuMobile;