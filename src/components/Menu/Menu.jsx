import Logo from '../../icons/Logo'
import IconNavHome from "../../icons/IconNavHome.jsx";
import IconNavMovies from "../../icons/IconNavMovies";
import IconNavSeries from "../../icons/IconNavSeries";
import IconNavBookmark from "../../icons/IconNavBookmark";
import Logout from "../Logout.jsx"
import './Menu.css';
import { Link } from 'react-router-dom';

const Menu = ({profileName, changeFilter, menuSelected, setSectionTitle, setMenuSelected}) => { 

    function handleClick(number, filter){
        switch (number) {
            case 0:
                setSectionTitle("Recommended for you")
                break;
            case 1:
                setSectionTitle("Movies")
                break;
            case 2:
                setSectionTitle("TV Series")
                break;
            case 3:
                setSectionTitle("Bookmarked")
                break;
            default:
                setSectionTitle("Recommended for you")
                break;
        }
        setMenuSelected(number)
        changeFilter(filter)
    }

    const navIconFillColor = "#0369a1";
   
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
                        <IconNavHome 
                            menuSelected={menuSelected} 
                            navIconFillColor={navIconFillColor}
                        />
                    </button>
                    <button className="nav-icon" 
                        // onClick={() => changeFilter("Movie")}
                        onClick={() => handleClick(1, "Movie")}
                        >
                        <IconNavMovies menuSelected={menuSelected} navIconFillColor={navIconFillColor}/>
                    </button>
                    <button className="nav-icon"
                        onClick={() => handleClick(2, "TV Series")}
                        >
                        <IconNavSeries menuSelected={menuSelected} navIconFillColor={navIconFillColor}/>
                    </button>
                    <button className="nav-icon"
                        onClick={() => handleClick(3, "isBookmarked")}
                        >
                        <IconNavBookmark menuSelected={menuSelected} navIconFillColor={navIconFillColor}/>
                    </button>                  
                    <Link className="nav-avatar"
                        to={"/ControlPanel"}
                    >
                        <img className='rounded-full' />
                        <div className='nav-avatar-initial'>
                            {profileName ? profileName.charAt(0).toUpperCase() : null}
                        </div>
                    </Link>
                    <Logout/>
                </div>
                </div>              
        </>
    )
 };

 export default Menu;