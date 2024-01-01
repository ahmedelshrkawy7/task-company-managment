import { Outlet } from 'react-router-dom'
import './App.css'
import React,{useEffect, useState ,useContext} from 'react'
import Sidebar from './dashBoard/includes/sideBar/Sidebar'
import Navbar from './dashBoard/includes/navBar/Navbar'
import {createContext } from 'react'
import Loader from './dashBoard/components/loader/Loader'
import { useLocation ,useNavigate } from 'react-router-dom'
import AuthContext from './dashBoard/Auth/AuthProvider'
import Sm_sidebar from './dashBoard/includes/Sm_sidebar/Sm_sidebar'
 

export const serverApi = createContext(null)



const App = () => {

  const {Auth} = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false);
  const [side, setSide] = useState(true);
  const location = useLocation();

  useEffect(() => {

    if(Auth){
      
    }

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    setIsLoading(true);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [location.pathname,Auth]);


const toggleSide =()=>{
   setSide(!side)
  return side
}
 
    
  return (

      
  
      <div className='all'>
{     isLoading &&   <Loader/>
}        
          <Sidebar toggle={toggleSide} side={side}   /> 
        <Sm_sidebar toggle={toggleSide} side={side} /> 
        <div className='main'>
            <Navbar/>
            <div className='body1'>
             
               <Outlet/>
                 

            </div>
        </div>
      </div>
    
  )
}

export default App