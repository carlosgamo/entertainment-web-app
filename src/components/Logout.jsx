import { logout } from "../config/firebase";

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
                className='text-white
                    text-sm font-semibold
                    hover:text-blue-500
                    mb-4
                    -ml-8'
                onClick={handleLogout}
        >
            Logout
        </button>
    )
}

export default Logout;