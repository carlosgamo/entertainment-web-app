import { Formik } from 'formik';
import * as Yup from "yup";

import './Signup.css'
import { registerNewUser } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { useEffect } from 'react';

const SignUp = () => { 

    const {user} = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user){
            localStorage.setItem("profileName", user.displayName)
            navigate('/home');
            // navigate('/home', {state: {newProfile}});
        }
    }, [user]);

    const onSubmit = async ({name, email, password}, { setSubmitting, setErrors, resetForm }) =>{
        try {
            const credentialUser = await registerNewUser({email, password});
            //resetForm();
        } catch (error) {
            if(error.code === "auth/email-already-in-use"){
                return setErrors({email: "Email already in use"})
            }
        } finally {
            
            setSubmitting(false)
        }
    }

    const validationSchema = Yup.object().shape({
        name: Yup
                .string()
                .trim("Invalid name")
                .required("Name required"),
        email: Yup
                .string()
                .email("Invalid email")
                .required("Email required"),
        password: Yup
                .string()
                .trim()
                .min(6, "Min. 6 characters")
                .required("Password required")
    })
    
    return(
        <>
            <div className='bg-gradient-to-tr from-slate-400 flex h-screen'>
                <div className='bg-white rounded-lg m-auto p-10 justify-center'>
                    <div className='text-slate-800 text-2xl font-bold flex justify-center'>Entertainment App - Sign Up</div>
                    <h1 className='text-slate-700 font-bold flex justify-left mb-4'>Information</h1>
                        <Formik 
                            initialValues={{ name: "", email: "", password: ""}}
                            onSubmit={onSubmit}
                            validationSchema={validationSchema}
                        >
                            {({values, handleSubmit, handleChange, errors, touched, handleBlur, isSubmitting}) => (
                                <form onSubmit={handleSubmit}>
                                    <div className='input-title'>Name</div>
                                    <input 
                                        type='text' 
                                        placeholder='Test' 
                                        className='input-signup' 
                                        value={values.name} 
                                        onChange={handleChange}
                                        name='name'
                                        onBlur={handleBlur}
                                    />
                                    <hr className='mb-2'/>
                                    <div className='input-title'>Email</div>
                                    <input 
                                        type='text' 
                                        placeholder='test@test.com' 
                                        className='input-login' 
                                        value={values.email} 
                                        onChange={handleChange}
                                        name='email'
                                        onBlur={handleBlur}
                                    />
                                    <hr className='mb-2'/>
                                    <div className='input-title'>Password</div>
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
                                            errors.name && touched.name && errors.name
                                        }
                                    </div>
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
                                    <hr/>
                                    <button type='submit' disabled={isSubmitting} className='email-signup-button'>Sign up</button> 
                                    <button className='email-sign-up-button pt-1 text-center' onClick={() => {navigate('/');}}>
                                        Return to login page
                                    </button>                                  
                                </form>
                            )}
                        </Formik>
                </div>
            </div>
        </>
    )
 }

 export default SignUp;