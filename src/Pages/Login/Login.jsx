import { useEffect, useState } from 'react';
import { login, loginWithGoogle } from '../../config/firebase';
import { fetchUserProfile } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';

import './Login.css'
import { useUserContext } from '../../context/UserContext';
import { Formik } from 'formik';
import * as Yup from "yup";

function Login() {
    const {user} = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user){
            navigate('/home');
        }
    }, [user]);

    
    const onSubmit = async ({email, password}, { setSubmitting, setErrors, resetForm }) =>{
        try {
            const credentialUser = await login({email, password});
            resetForm();
        } catch (error) {
            if(error.code === "auth/user-not-found"){
                return setErrors({email: "User not found"})
            }
            if(error.code === "auth/wrong-password"){
                return setErrors({password: "Password incorrect"})
            }
        } finally {
            setSubmitting(false)
        }
    }

    const validationSchema = Yup.object().shape({
        email: Yup
                .string()
                .email("Invalid email")
                .required("Email required"),
        password: Yup
                .string()
                .trim()
                .min(6, "Min. 6 characters")
                .required("Password incorrect")
    })
   
    return(
        <>
            <div className='bg-gradient-to-tr from-slate-400 flex h-screen'>
                
                <div className='login-container'>
                    <div className='login-h1'>LOG IN</div>
                    <div className='login-title'>Entertainment App</div>
                    
                        <Formik 
                            initialValues={{ email: "", password: ""}}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}
                        >
                            {({values, handleSubmit, handleChange, errors, touched, handleBlur, isSubmitting}) => (
                                <form onSubmit={handleSubmit}>
                                    <div className='input-label'>Email</div>
                                    <input 
                                        type='text' 
                                        placeholder='Enter email' 
                                        className='input-login' 
                                        value={values.email} 
                                        onChange={handleChange}
                                        name='email'
                                        onBlur={handleBlur}
                                    />
                                    <div className='input-label'>Password</div>
                                    <input 
                                        type='password' 
                                        placeholder='Password' 
                                        className='input-login' 
                                        value={values.password} 
                                        onChange={handleChange}
                                        name='password'
                                        onBlur={handleBlur}
                                    />
                                    <div className='form-errors'>
                                        {
                                            errors.email && touched.email && errors.email
                                        }
                                    </div>
                                    <div className='form-errors'>
                                        {
                                            errors.password && touched.password && errors.password
                                        }
                                    </div>
                                    
                                    <button type='submit' disabled={isSubmitting} className='email-login-button mb-4'>Sign in</button>
                                    <div className='flex justify-center'>
                                        Don't have an account?
                                        <button disabled={isSubmitting} className='email-sign-up-button' onClick={() => {navigate('/signup');}}>
                                            Sign up here
                                        </button>
                                    </div>
                                </form>
                            )}
                        </Formik>                    
                    {/* <span className='ml-4'>Or Connect with your Google account</span>
                    <button className="google-login-button" onClick={() => loginWithGoogle()}>Sign in with Google 🚀 </button> */}
                </div>
            </div>
        </>
    )
}

export default Login;