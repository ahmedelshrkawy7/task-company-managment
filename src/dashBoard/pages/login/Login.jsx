import React, { useContext, useEffect, useState,createContext, useRef } from 'react'
import loginimg from '../../assets/login/Frame 1 1.svg'
import logo from '../../assets/login/2023 alexon logo.svg'
import email from '../../assets/login/lock.svg'
import eyeslash from '../../assets/login/eye-slash.svg'
import eye from '../../assets/login/bi_eye.svg'
import lock from '../../assets/login/sms.svg'
import axios from 'axios'
import './Login.css'
import { serverApi } from '../../../App'
import AuthContext from '../../Auth/AuthProvider'
import {  useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import * as Yup from 'yup'


import { notify,error } from '../../notifications/Toast'
import Cookies from 'js-cookie';





const Login = () => {
  const Navigate = useNavigate()

  const {setAuth} = useContext(AuthContext)

  const userRef = useRef()


  const[sucsess,setSuccess] = useState(false)
  
  const server = useContext(serverApi)
  const [data,setData] = useState({})
  const [admin,setAdmin] = useState({})
  const [pwdshow,setPwdshow] = useState(false)





   const handleChange=(e)=>{
    setData((prev)=>{return({...prev , [e.target.name]:e.target.value})})

   }

   

   useEffect(()=>{
    userRef.current.focus();
   },[])


  const handleSubmit= async()=>{ 

    try{

       const response = await axios({
                            method: "post",
                            url: `${server}/login`,
                            data: formik.values ,
                            
                          
                            headers: { "Content-Type": 'multipart/form-data' },
                          })
     
      
      setAdmin(response.data.data.user)
      setAuth(true)
      setSuccess(true)
      localStorage.setItem('logged' ,true)
      
      Cookies.set('token', JSON.stringify(response.data.data), { expires:365, secure: true });
      
      notify('Loggedin Successfully');
        Navigate('/')
    }

    catch (err){
      error('Email or Password is incorrect');
  
    }

  
   

     
  }

  const validationSchema = Yup.object().shape({
       
    email: Yup.string('should be string').email('Invalid email').required('Required'),
    password: Yup.string('should be string').required('Required'),

  });




const formik = useFormik({
  initialValues:{
    email:'',
    password:''
  },
  validationSchema:validationSchema,
  onSubmit:(value)=>{
    handleSubmit();
  }
})
 


  return (

    
    <div className='dash__login'>
        <div className='dash_login-img'>
           <div className='cont'>
              <div className='dash_login-img_header'>
                <h4>Welcome Back !</h4>
              </div>
                
              <div className='dash_login-img_logo'> 
                <img src={logo} alt='logo' />
              </div>
                
           </div>
           
        </div>
        <form className='dash_login-content' onSubmit={formik.handleSubmit}>

            <div className='dash_login-content_container' >


              <div className='dash_login-content_header'>
                      <h2>Log In</h2>
              </div>
      
              <div className='dash_login-content_input'>
                <div className='dash_login-content_input-header'> <h5>Email</h5></div>

                <div className='dash_login-content_input-element'> 
                    <input name='email' type='text' placeholder='Enter your Email'
                    value={formik.values.email}
                     onChange={formik.handleChange} onBlur={formik.handleBlur} ref={userRef} />
                    <img className='left' src={lock} alt='lock'/>
                    <span className='error'>{formik.touched.email && formik.errors.email}</span>
                    
                </div>
              </div>
              

              <div className='dash_login-content_input'>
                  <div className='dash_login-content_input-header'> <h5>Password</h5></div>

                  <div className='dash_login-content_input-element' >
                      <input name='password' type={pwdshow?"text":'password'} placeholder='**********'  
                        value={formik.values.password}
                        onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                      <img className='left' src={email} alt='email'/>
                      <img className='right'  src={pwdshow?eyeslash:eye} alt='email' onClick={()=>{setPwdshow(!pwdshow)}}/>
                      <span className='error'>{formik.touched.password && formik.errors.password}</span>

                  </div>

              </div>
              <div className='dash_login-content_conditions d-flex justify-content-between align-items-center w-100'>
                <div className='dash_login-content_conditions-check'>
                   <input type='checkbox'  />
                   <p>Remember Me</p>
                </div>

                <div className='dash_login-content_conditions-check'>
                  <a href='/'> Forgot your password ?</a>
                </div>
                

              </div>


              <div className='dash_login-content_login'>
                  <button type='submit ' > Login</button>
              </div>

            
            </div>





        </form>
    </div>
  )
}

export default Login 

