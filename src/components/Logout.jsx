import { logout } from "../config/firebase";
import './Menu/Menu.css'

function Logout() {

    const handleLogout = async() =>{
        try {
            await logout();
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <button id="logOutButton"
                className='logout-Button'
                onClick={handleLogout}
        >
            Logout
        </button>
    )
}

export default Logout;