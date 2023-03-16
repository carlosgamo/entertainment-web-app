import Logo from '../icons/Logo'
import IconNavHome from "../icons/IconNavHome.jsx";
import IconNavMovies from "../icons/IconNavMovies";
import IconNavSeries from "../icons/IconNavSeries";
import IconNavBookmark from "../icons/IconNavBookmark";
import '../Menu/Menu.css'

const MenuMobile = ({changeFilter, menuSelected, setMenuSelected}) => { 

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
                    <div className="nav-avatar">
                        <img src="./assets/image-avatar.png"/>
                    </div>
                </div>
                
            </div>
        </>
    )
 };

 export default MenuMobile;