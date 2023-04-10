import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'

const clientId = "123653857855-iigr6rqj9tpgvqr533sja0tg2pm2pppd.apps.googleusercontent.com"; 

function Login({login}) {

    // const [authenticated, setAuthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));

    // const onSuccess = (res) => {
    //     console.log("LOGIN SUCCESSFULL! res: ", res);
    // }

    // const onError = (res) => {
    //     console.log("LOGIN FAILED! res: ", res);
    // }
    
    return(
        <>
            <div className='bg-gradient-to-tr from-slate-400 flex h-screen'>
                <div className='bg-white rounded-lg m-auto p-10 justify-center'>
                    <div className='text-slate-800 text-2xl font-bold flex justify-center'>Entertainment App</div>
                    <h1 className='text-slate-700 font-bold flex justify-left mb-4'>Login</h1>
                    <div id="signInForm">
                        <form>
                            <input type='text' placeholder='Email address' className='input-login'/>
                            <hr className='mb-2'/>
                            <input type='password' placeholder='Password' className='input-login'/>
                            <hr/>
                            <button type='submit' className='email-login-button'>Sign in</button>
                        </form>
                    </div>
                    <span className='ml-4'>Or Connect with your Google account</span>
                    <button className="google-login-button" onClick={() => login()}>Sign in with Google 🚀 </button>
                        {/* <GoogleOAuthProvider clientId='123653857855-iigr6rqj9tpgvqr533sja0tg2pm2pppd.apps.googleusercontent.com'>
                            <GoogleLogin
                                clientId={clientId}
                                buttonText="Login"
                                onSuccess={onSuccess}
                                onError={onError}
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={true}
                                />
                        </GoogleOAuthProvider> */}
                    
                </div>
            </div>
        </>
    )
}

export default Login;