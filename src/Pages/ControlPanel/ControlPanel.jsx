import { useState } from "react";
import Logo from "../../icons/Logo";
import "./ControlPanel.css";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import { fetchUserProfile, loadNewDatabase, updateUserProfile } from "../../config/firebase";

const ControlPanel = () => { 

    const {user} = useUserContext();
    const [profile, setProfile] = useState(null);
    const [profileName, setProfileName] = useState("");

    const [darkMode, setDarkMode] = useState(false);
    const [displayTrending, setDisplayTrending] = useState(true)

    const navigate = useNavigate();

    useEffect(()=> {
        fetchUserProfile(user.uid) //user.uid
          .then((profileData) => {
            setProfile(profileData)
            setProfileName(profileData.name)
            setDarkMode(profileData.darkMode)
          })
          .catch((error) => {
            console.log(error)
          })
      },[user])


    const [changeNameVisible, setChangeNameVisible] = useState(false);

    let tempProfileName = "TempName";

    const handleChange = (event) => {
        tempProfileName = event.target.value
    }

    function handleSaveProfileName(){
        setProfileName(tempProfileName)
        setChangeNameVisible(!changeNameVisible)
    }
    
    function handleUpdateProfile(){
        const userNewProfile = {
            email: profile.email,
            isBookmarked: profile.isBookmarked,
            name: profileName,
            authProvider: profile.authProvider,
            darkMode: darkMode,
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

    useEffect(() => {
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
                    <h1 className="-mt-8 ml-14">Account - {profile ? profile.name : null}</h1>
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
                <button className="control-panel-button absolute bottom-4 left-2" onClick={() => handleUpdateProfile()}>Save changes</button>
                {/* <button className="control-panel-button absolute bottom-20 right-6" onClick={() => loadNewDatabase()}>Load database</button> */}
                <Link to="/">
                    {/* <button className="control-panel-button absolute bottom-4 left-6" onClick={() => saveChanges()}>Save changes</button> */}
                    <button className="control-panel-button absolute bottom-4 right-6">Return to Home</button>
                </Link>
            </div>
        </>
    )
 }

 export default ControlPanel;