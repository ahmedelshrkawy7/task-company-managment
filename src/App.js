import React from 'react'
import Sidebar from './dashBoard/includes/sideBar/Sidebar'
import Navbar from './dashBoard/includes/navBar/Navbar'
import Location from './dashBoard/includes/location/Location'
import {Routes ,Route } from 'react-router-dom'
import './App.css'
import Department from './dashBoard/pages/fields/department/Department'
import Createfield from './dashBoard/pages/fields/createField/Createfield'
import CreateSub from './dashBoard/pages/fields/subDepartment/CreateSub'
import Allfields from './dashBoard/pages/fields/allFields/Allfields'
import CreateTechnology from './dashBoard/pages/fields/technology/CreateTechnology'
import SpecialList from './dashBoard/pages/fields/specialization/Special-list'
import Departlist from './dashBoard/pages/fields/departList/Departlist'
import AssignTask from './dashBoard/pages/fields/AssignTask/AssignTask'
import Carddetails from './dashBoard/pages/fields/cardDetails/Carddeatails'
import AssignList from './dashBoard/pages/fields/AssignTaskList/AssignList'
import {createContext } from 'react'
import Viewtask from './dashBoard/pages/fields/viewTask/Viewtask'
import Setting from './dashBoard/pages/settings/Setting'
import T_home from './dashBoard/pages/teams/TeamCard/T_home'
import No_member from './dashBoard/pages/teams/noMember/No_member'
import CreateMember from './dashBoard/pages/teams/createMember/CreateMember'
import Member_details from './dashBoard/pages/teams/member_details/Member_details'
import CreateForm from './dashBoard/pages/projects/createForm/CreateForm';
import Project from './dashBoard/pages/projects/projects/Project';
import View_project from './dashBoard/pages/projects/viewproject/View_project'
import Phase from './dashBoard/pages/projects/phases/Phases'
export const serverApi = createContext(null)
const alexServer ='http://216.219.83.182/Alexon_Management/public/api'

const App = () => {
 
    
  return (
    <serverApi.Provider value={alexServer}>
      <div className='all'>
        <Sidebar/>
        <div className='main'>
            <Navbar/>
            <div className='body1'>
             
              <Routes>
                  <Route path='/projects' element={<CreateForm/> }/> 
                  <Route path='/projects/projectlist' element={<Project/> }/> 
                  <Route path='/projects/view' element={<View_project/> }/> 
                  <Route path='/projects/Phase' element={<Phase/> }/> 
                  <Route path='/projects'  element={<Project/> }/> 
                  <Route path='/Department' element={ <Department/>} /> 
                  <Route path='/fields/:id' element={ <Allfields/>} /> 
                  <Route path='/createfield' element={ <Createfield/>} />
                  <Route path='/specialization' element={ <CreateSub/>} />
                  <Route path='/tech' element={ <CreateTechnology/>} />
                  <Route path='/speciallist' element={ <SpecialList/>} />
                  <Route path='/departlist' element={ <Departlist/>} />
                  <Route path='/assignTask' element={ <AssignTask/>} />
                  <Route path='/Carddetails' element={ <Carddetails/>} />
                  <Route path='/AssignList' element={ <AssignList/>} />
                  <Route path='/viewtask' element={ <Viewtask/>} />
                  <Route path='/Settings' element={ <Setting/>} />
                  <Route path='/Teams' element={ <T_home/>} />
                  <Route path='/createmember' element={ <CreateMember/>} />
                  <Route path='/empty' element={ <No_member/>} />
                  <Route path='/member_details' element={ <Member_details/>} />

              </Routes>
              
            </div>
        </div>
      </div>
      </serverApi.Provider>
    
  )
}

export default App