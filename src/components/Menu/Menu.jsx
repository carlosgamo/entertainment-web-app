import Logo from '../../icons/Logo'
import IconNavHome from "../../icons/IconNavHome.jsx";
import IconNavMovies from "../../icons/IconNavMovies";
import IconNavSeries from "../../icons/IconNavSeries";
import IconNavBookmark from "../../icons/IconNavBookmark";
import Logout from "../Logout.jsx"
import './Menu.css';
import { Link } from 'react-router-dom';

const Menu = ({ profileName, changeFilter, menuSelected, setMenuSelected}) => { 

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
                    <button className="nav-icon"
                        onClick={() => handleClick(0,"all")}
                        >
                        <IconNavHome menuSelected={menuSelected}/>
                    </button>
                    <button className="nav-icon" 
                        // onClick={() => changeFilter("Movie")}
                        onClick={() => handleClick(1, "Movie")}
                        >
                        <IconNavMovies menuSelected={menuSelected}/>
                    </button>
                    <button className="nav-icon"
                        onClick={() => handleClick(2, "TV Series")}
                        >
                        <IconNavSeries menuSelected={menuSelected}/>
                    </button>
                    <button className="nav-icon"
                        onClick={() => handleClick(3, "isBookmarked")}
                        >
                        <IconNavBookmark menuSelected={menuSelected}/>
                    </button>                  
                    <Link className="nav-avatar"
                        to={"/ControlPanel"}
                        // state={{ profileName: profileName}}
                    >
                        <img className='rounded-full' />
                        <div className='nav-avatar-initial'>
                            {profileName.charAt(0).toUpperCase()}
                        </div>
                    </Link>
                    <Logout/>
                </div>
                </div>              
        </>
    )
 };

 export default Menu;