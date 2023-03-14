import Logo from './icons/Logo'
import IconNavHome from "./icons/IconNavHome.jsx";
import IconNavMovies from "./icons/IconNavMovies";
import IconNavSeries from "./icons/IconNavSeries";
import IconNavBookmark from "./icons/IconNavBookmark";

const MenuMobile = ({changeFilter, filter}) => { 
    return(
        <>
            <div className="bg-slate-800 h-16">
                <div id="logo" className="pt-4 pl-4">
                    <Logo/>
                </div>
                <div id="nav-bar" className="flex self-center ml-32 -mt-6">
                    <div className="mr-10"
                        onClick={() => changeFilter("all")}
                    >
                        <IconNavHome/>
                    </div>
                    <div className="mr-10" 
                        onClick={() => changeFilter("Movie")}
                    >
                        <IconNavMovies/>
                    </div>
                    <div className="mr-10"
                        onClick={() => changeFilter("TV Series")}
                    >
                        <IconNavSeries/>
                    </div>
                    <div className="mr-10"
                        onClick={() => changeFilter("isBookmarked")}
                    >
                        <IconNavBookmark/>
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