import Logo from './icons/Logo'
import IconNavHome from "./icons/IconNavHome.jsx";
import IconNavMovies from "./icons/IconNavMovies";
import IconNavSeries from "./icons/IconNavSeries";
import IconNavBookmark from "./icons/IconNavBookmark";

const MenuMobile = ({changeFilter, menuSelected, setMenuSelected}) => { 

    function handleClick(number, filter){
        setMenuSelected(number)
        changeFilter(filter)
    }
    

    return(
        <>
            <div className="bg-slate-800 h-16">
                <div id="logo" className="pt-4 pl-4">
                    <Logo/>
                </div>
                <div id="nav-bar" className="flex self-center ml-32 -mt-6">
                    <div className="mr-10"
                        onClick={() => handleClick(0,"all")}
                    >
                        <IconNavHome menuSelected={menuSelected}/>
                    </div>
                    <div className="mr-10" 
                        // onClick={() => changeFilter("Movie")}
                        onClick={() => handleClick(1, "Movie")}
                    >
                        <IconNavMovies menuSelected={menuSelected}/>
                    </div>
                    <div className="mr-10"
                        onClick={() => handleClick(2, "TV Series")}
                    >
                        <IconNavSeries menuSelected={menuSelected}/>
                    </div>
                    <div className="mr-10"
                        onClick={() => handleClick(3, "isBookmarked")}
                    >
                        <IconNavBookmark menuSelected={menuSelected}/>
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 ml-6 -mt-2">
                        <img src="./assets/image-avatar.png"/>
                    </div>
                </div>
                
            </div>
        </>
    )
 };

 export default MenuMobile;