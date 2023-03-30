import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { useState } from 'react';

const clientId = "123653857855-iigr6rqj9tpgvqr533sja0tg2pm2pppd.apps.googleusercontent.com"; 

function Login() {

    const [authenticated, setAuthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));

    const onSuccess = (res) => {
        setAuthenticated(true);
        localStorage.setItem("authenticated", true);
        console.log("LOGIN SUCCESSFULL! res: ", res.id);
        window.location.reload(false);
    }

    const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res);
    }
    
    return(
        <>
            <div className='text-white text-2xl font-bold ml-6 mt-4'>Entertainment App</div>
            <div className='bg-gray-700 rounded-lg w-96 h-48 p-10 ml-10 lg:p-10 lg:ml-96  mt-20'>
                <h1 className='text-white font-bold flex justify-center mb-4'>Login</h1>

                <div id="signInButton">
                    <GoogleOAuthProvider clientId='123653857855-iigr6rqj9tpgvqr533sja0tg2pm2pppd.apps.googleusercontent.com'>
                        <GoogleLogin
                            clientId={clientId}
                            buttonText="Login"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                            />
                    </GoogleOAuthProvider>
                </div>
            </div>
        </>
    )
}

export default Login;