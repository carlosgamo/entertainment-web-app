import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin, googleLogout } from '@react-oauth/google'
import { useEffect, useState } from 'react';
import { login } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUserContext } from '../context/UserContext';

import './Login.css'

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profile, setProfile] = useState("");

    const {user} = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user){
            const newProfile = user.email
            setProfile(newProfile);
            navigate('/home', {state: {newProfile}});
        }
    }, [profile]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const credentialUser = await login({email, password});
        } catch (error) {
            console.log(error)
        }
    }
  
    const loginWithGoogle = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    const logOut = () => {
        googleLogout();
        // setProfile(null);
    };
  

    // useEffect(() => {
    //     if (user) {
    //         axios
    //             .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${user.access_token}`,
    //                     Accept: 'application/json'
    //                 }
    //             })
    //             .then((res) => {
    //                 setProfile(res.data);
    //             })
    //             .catch((err) => console.log(err.message));
    //     }
    // }, [ user ]);
    
    return(
        <>
            <div className='bg-gradient-to-tr from-slate-400 flex h-screen'>
                <div className='bg-white rounded-lg m-auto p-10 justify-center'>
                    <div className='text-slate-800 text-2xl font-bold flex justify-center'>Entertainment App</div>
                    <h1 className='text-slate-700 font-bold flex justify-left mb-4'>Login</h1>
                    <div id="signInForm">
                        <form onSubmit={handleSubmit}>
                            <input type='text' placeholder='test@test.com' className='input-login' 
                                    value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <hr className='mb-2'/>
                            <input type='password' placeholder='123456' className='input-login' 
                                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <hr/>
                            <button type='submit' className='email-login-button'>Sign in</button>
                        </form>
                    </div>
                    <span className='ml-4'>Or Connect with your Google account</span>
                    <button className="google-login-button" onClick={() => loginWithGoogle()}>Sign in with Google 🚀 </button>
                    
                </div>
            </div>
        </>
    )
}

export default Login;