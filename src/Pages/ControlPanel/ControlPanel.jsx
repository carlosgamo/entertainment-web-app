import { useState } from "react";
import Logo from "../../icons/Logo";
import "./ControlPanel.css";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import { fetchUserProfile, loadNewDatabase, updateUserProfile } from "../../config/firebase";
import { Warning } from "postcss";

const ControlPanel = () => { 

    const {user} = useUserContext();
    const [profile, setProfile] = useState(null);
    const [profileName, setProfileName] = useState("");

    const [previousName, setPreviousName] = useState("");

    const [darkMode, setDarkMode] = useState(false);
    const [displayTrending, setDisplayTrending] = useState(true)

    const [changeNameVisible, setChangeNameVisible] = useState(false);

    const navigate = useNavigate();

    useEffect(()=> {
        fetchUserProfile(user.uid)
          .then((profileData) => {
            setProfile(profileData)
            setProfileName(profileData.name)
            setPreviousName(profileData.name)
            setDarkMode(profileData.darkMode)
          })
          .catch((error) => {
            console.log(error)
          })
      },[user])


    const handleChange = (event) => {
        setProfileName(event.target.value)
    }

    function handleCancelButton(){
        setProfileName(previousName)
        setChangeNameVisible(!changeNameVisible)
    }
    
    function handleUpdateProfile(){
        const userNewProfile = {
            email: profile.email,
            isBookmarked: profile.isBookmarked,
            name: profileName,
            authProvider: profile.authProvider,
            darkMode: darkMode,
            isAdmin: profile.isAdmin,
            displayTrending: displayTrending,
            uid: user.uid,
        }

        updateUserProfile(user, userNewProfile)
            .then(() => {
                console.log("User updated successfully")
                navigate('/home')
            })
            .catch((error) => {
                console.log("Error updating profile")
            })
    }

    useEffect(() => { //DARKMODE
        if (profile) {
            if (profile.darkMode){
                document.documentElement.classList.add('dark')
            }else{
                document.documentElement.classList.add('light')
                document.documentElement.classList.remove('dark')
            }
        }
    }, [profile])

    useEffect(() => { //Display TRENDING
    if (profile) {
        if (profile.displayTrending){
            setDisplayTrending(true)
        }else{
            setDisplayTrending(false)
        }
    }
    }, [profile]);
    
    return(
        <>
            <div className="control-panel-main">
                <div>
                    <div className="text-2xl mb-2 mt-2">
                        <Link id="logo" className="" to="/">
                            <Logo/>
                        </Link>
                    <h1 className="-mt-8 ml-14">Account - Control panel</h1>
                    </div>
                </div>
                <hr/>
                <div>
                    <h2>Profile</h2>
                    <div className="control-panel-items">Name</div>
                        {changeNameVisible ? 
                            <div>
                                <input type="text" className="change-name-input" 
                                        maxLength={20} defaultValue={profileName}
                                        onChange={handleChange}/>
                                <button className="control-panel-button ml-4 text-red-200" 
                                        onClick={() => handleCancelButton()}
                                        >Cancel
                                </button>
                            </div> 
                            : 
                            
                            <button className="change-profile-name-button" 
                                    onClick={() => setChangeNameVisible(!changeNameVisible)}
                                    >
                                        {profileName}
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
                    {/* {profile && profile.isAdmin 
                        ?
                            <div>
                                <h2>Manage titles</h2>
                                <div className="text-slate-600">
                                    <p className="control-panel-items">
                                        <button className="add-title-button">Add new title</button>
                                    </p>
                                </div>
                            </div>   
                        : null} */}
                </div>
                <button className="control-panel-button absolute bottom-4 left-2" onClick={() => handleUpdateProfile()}>Save changes</button>
                {/* <button className="control-panel-button absolute bottom-20 right-6" onClick={() => loadNewDatabase()}>Load database</button> */}
                <Link to="/">
                    <button className="control-panel-button absolute bottom-4 right-6">Return to Home</button>
                </Link>
            </div>
        </>
    )
 }

 export default ControlPanel;