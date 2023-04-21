import { useState } from "react";
import Logo from "../../icons/Logo";
import "./ControlPanel.css";
import { Link } from 'react-router-dom';

const ControlPanel = () => { 

    const initialProfileName = JSON.parse(localStorage.getItem("profileName"));
    const [profileName, setProfileName] = useState(initialProfileName);

    const initialStateDisplayTrending = JSON.parse(localStorage.getItem("displayTrending")) || localStorage.setItem("displayTrending", true);
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
    
    function saveChanges(){
        localStorage.setItem("displayTrending", displayTrending)
    }
    
    return(
        <>
            <div className="control-panel-main">
                <div>
                    <div className="text-2xl mb-2 mt-2">
                        <Link id="logo" className="" to="/">
                            <Logo/>
                        </Link>
                    <h2 className="text-slate-600 -mt-8 ml-14">Account - {profileName}</h2>
                    </div>
                </div>
                <hr/>
                <div>
                    <h2 className="text-xl text-slate-800 mt-4 mb-2">Profile</h2>
                    {changeNameVisible ? 
                        <div>
                            <input type="text" className="rounded-sm text-slate-800 ml-8" 
                                    maxLength={20} defaultValue={profileName}
                                    onChange={handleChange}/>
                            <button className="mr-4 ml-6 hover:text-green-400 border-white pt-1.5 pb-2 pl-4 pr-4" 
                                    onClick={() => handleSaveProfileName()}
                                    >Save
                            </button>
                            <button className="hover:text-red-400" 
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
                    
                    <h2 className="text-xl text-slate-800 mt-4 mb-2">Site preferences</h2>
                    <div className="text-slate-600">
                        <input type="checkbox" checked={displayTrending} className="control-panel-items"
                                onChange={() => setDisplayTrending(!displayTrending)}
                        />
                        Display Trending
                    </div>
                    
                </div>
                
                
                <Link id="logo" className="mr-2" to="/">
                    <button className="control-panel-button absolute bottom-4 left-6" onClick={() => saveChanges()}>Save changes</button>
                    <button className="control-panel-button absolute bottom-4 right-6">Return to Home</button>
                </Link>
            </div>
        </>
    )
 }

 export default ControlPanel;