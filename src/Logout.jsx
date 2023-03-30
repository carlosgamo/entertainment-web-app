import { googleLogout } from '@react-oauth/google'

function Logout({authenticated, setAuthenticated}) {

    return(
        <button id="logOutButton"
                className='text-white -ml-8 mb-4'
                onClick={() => {
                    setAuthenticated(false);
                    localStorage.setItem("authenticated", false);
                }}
        >
            Logout
        </button>
    )
}

export default Logout;