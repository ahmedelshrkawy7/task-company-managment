import React, { useState ,createContext } from 'react'
import  ReactDOM  from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'
import './index.css'
import Routesfile from './dashBoard/routes/Routes';
import { BrowserRouter} from 'react-router-dom';
import { serverApi } from './App';
import { AuthProvider } from './dashBoard/Auth/AuthProvider';
import Toast  from './dashBoard/notifications/Toast';



const alexServer ='http://216.219.83.182/Alexon_Management/public/api'



export const logged = createContext(null)


setInterval(()=>{

},1000)



const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(


    
     <React.StrictMode>
       <serverApi.Provider value={alexServer}>
            <BrowserRouter>
              <AuthProvider>
               <Routesfile/>
               <Toast />
              </AuthProvider>
            </BrowserRouter>
        </serverApi.Provider>
    </React.StrictMode>
)