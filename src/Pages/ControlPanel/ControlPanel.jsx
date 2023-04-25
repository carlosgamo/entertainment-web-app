import { useState } from "react";
import Logo from "../../icons/Logo";
import "./ControlPanel.css";
import { Link } from 'react-router-dom';
import { useEffect } from "react";

const initialProfileName = JSON.parse(localStorage.getItem("profileName"));
  
const ControlPanel = () => { 

    const inicialStateDarkMode = localStorage.getItem('theme') === 'dark';
    const [darkMode, setDarkMode] = useState(inicialStateDarkMode);

    const [profileName, setProfileName] = useState(initialProfileName);

    const initialStateDisplayTrending = JSON.parse(localStorage.getItem("displayTrending")) === true;
    const [displayTrending, setDisplayTrending] = useState(initialStateDisplayTrending)

    const [changeNameVisible, setChangeNameVisible] = useState(false);

    let tempProfileName = initialProfileName;

    const handleChange = (event) => {
        tempProfileName = event.target.value
    }

    function handleSaveProfileName(){
        setProfileName(tempProfileName)
        localStorage.setItem("profileName", JSON.stringify(tempProfileName))
        setChangeNameVisible(!changeNameVisible)
    }


    useEffect(() => {
        if (darkMode){
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        }else{
            document.documentElement.classList.add('light')
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
      }, [darkMode]);

      useEffect(() => {
        localStorage.setItem("displayTrending", displayTrending)
      }, [displayTrending])
    
    return(
        <>
            <div className="control-panel-main">
                <div>
                    <div className="text-2xl mb-2 mt-2">
                        <Link id="logo" className="" to="/">
                            <Logo/>
                        </Link>
                    <h1 className="-mt-8 ml-14">Account - {profileName}</h1>
                    </div>
                </div>
                <hr/>
                <div>
                    <h2>Profile</h2>
                    {changeNameVisible ? 
                        <div className="text-slate-800">
                            <input type="text" className="rounded-sm text-slate-800 ml-8" 
                                    maxLength={20} defaultValue={profileName}
                                    onChange={handleChange}/>
                            <button className="control-panel-button ml-2 text-green-200" 
                                    onClick={() => handleSaveProfileName()}
                                    >Save
                            </button>
                            <button className="control-panel-button ml-4 text-red-200" 
                                    onClick={() => setChangeNameVisible(!changeNameVisible)}
                                    >Cancel
                            </button>
                        </div> 
                        : 
                        <button className="ml-6 hover:bg-sky-600 bg-slate-400 border-white border-2 rounded-md pb-1 pl-4 pr-4" 
                                onClick={() => setChangeNameVisible(!changeNameVisible)}
                                >Change name
                        </button>
                    }
                    
                    <h2>Site preferences</h2>
                    <div className="text-slate-600">
                        <p className="control-panel-items">
                            <input type="checkbox" checked={darkMode} className="mr-2"
                                    onChange={() => setDarkMode(!darkMode)}
                            />
                            Dark mode
                        </p>
                        <p className="control-panel-items">
                            <input type="checkbox" checked={displayTrending} className="mr-2"
                                    onChange={() => setDisplayTrending(!displayTrending)}
                            />
                            Display Trending
                        </p>
                    </div>
                </div>
                
                <Link id="logo" className="mr-2" to="/">
                    {/* <button className="control-panel-button absolute bottom-4 left-6" onClick={() => saveChanges()}>Save changes</button> */}
                    <button className="control-panel-button absolute bottom-4 right-6">Return to Home</button>
                </Link>
            </div>
        </>
    )
 }

 export default ControlPanel;