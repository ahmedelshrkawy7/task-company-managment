import React, { useContext, useEffect } from 'react'
import { Outlet, Route,Routes, useNavigate } from 'react-router-dom'
import App from '../../App'
import AuthContext from '../Auth/AuthProvider'


import{
    Department, Createfield, CreateSub, Allfields, CreateTechnology, SpecialList, Departlist, AssignTask, Carddetails, 
   Viewtask, Setting, T_home, No_member, CreateMember, Member_details, CreateForm, Project, View_project, 
   Newphase,Create_task, Viewtask_list,View_task,Project_dash,Projectcard_details,Task_home,Task_view,Home,Login
} from './import'




const Routesfile = () => {

  const {Auth} = useContext(AuthContext)
  const navigate = useNavigate()

  


  useEffect(()=>{
 
    if(!Auth){
      
        navigate('/login')
    }
    
    

  },[Auth,navigate])


  

  return (
    
    <Routes>

      <Route path='/login' element={<Outlet/>} >
        
        <Route index  element={<Login/>}/>

      </Route>

   
      <Route path='/' element={<App/>}>


         {/* //////////////
             projects
         ////////////// */}

           <Route path='/Create'             element={<CreateForm/> }/> 
           <Route path='/Project List'        element={<Project/> }/> 
           <Route path='/projects/view/:id'    element={<View_project/> }/> 
           <Route path='/projects/Phase/:id'   element={<Newphase/> }/> 



{/*           
         //////////////
             fields
         ////////////// */}


                                       { /* ----------------------  department --------------------*/ }

           <Route path='/Departments' element={ <Department/>} /> 
           <Route path='/Create Department'    element={ <Createfield/>} />
           <Route path='/fields/:id' element={ <Allfields/>} /> 
           <Route path='/assignTask' element={ <AssignTask/>} />
           <Route path='/departlist' element={ <Departlist/>} />
           <Route path='/viewtask'   element={ <Viewtask/>} />

    
                                    {/* ----------------------  specialization -------------------- */}

           <Route path='/specialization' element={ <CreateSub/>} />
           <Route path='/tech'           element={ <CreateTechnology/>} />
           <Route path='/speciallist'    element={ <SpecialList/>} />
           <Route path='/Carddetails'    element={ <Carddetails/>} />




           {/* //////////////
             settings
         ////////////// */}

           <Route path='/Settings' element={ <Setting/>} />


    

           {/* //////////////
             teams
         //////////////     */}

           <Route path='/Teams'          element={ <T_home/>} />
           <Route path='/Add employee'   element={ <CreateMember/>} />
           <Route path='/empty'          element={ <No_member/>} />
           <Route path='/member_details' element={ <Member_details/>} />

{/* 
         //////////////
             project_managment Task Management
         ////////////// */}
 
           <Route path='/Tasks List'            element={ < Viewtask_list/>} />
           <Route path='/Task Management/list/view'  element={ < View_task/>} />
           <Route path='/Projects Dashboard'         element={ <Project_dash/>} />
           <Route path='/Projects Dashboard/details/:projectid' element={ <Projectcard_details/>} />



         {/* //////////////
             tasks
         ////////////// */}

           <Route path='/Tasks'         element={ <Task_home/>} />
           <Route path='/Tasks/view'    element={ <Task_view/>} />
           <Route path='/Create Task'   element={ <Create_task/>} />



         {/* //////////////
             home
         ////////////// */}

           <Route index  element={ <Home/>} />



                    
      </Route>
      
   </Routes>
  )
}

export default Routesfile