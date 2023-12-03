import React, { useEffect, useState } from 'react'
import './project.css'
import Location from '../../../includes/location/Location'
import eye from '../../../assets/project/bi_eye.svg'
import pen from '../../../assets/project/edit-2.svg'
import trash from '../../../assets/project/trash.svg'
import setting from '../../../assets/project/setting-2.svg'
import task from '../../../assets/project/task.svg'
import plus from '../../../assets/Form/icons.svg'

import axios from 'axios'

 const Project = () => {

  const [projects,setProjects] = useState([]);


  const fetchPost = async () => {
    try {
      const response = await axios({
        method: "Get",
         url: "http://216.219.83.182/Alexon_Management/public/api/projects",
      });
      setProjects(response.data.data.allprojects);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=> {
    fetchPost();
  }
  , [])


  

  return ( 
    <>
    <Location head='  Project List'/>

    <div className='dash__create'>
      <div className='dash__create-head'>
        <img src={task} alt='task'/>
          <h2> Project List</h2>
      </div>
      <div className='dash__create-button'>
          <img src={plus} alt='plus'/>
          <h2>Create new project</h2>
        </div>
     </div>

    <div className='project_table' >
      <table >
        <tr className='project_table-head'>
          <th>Project name</th>
          <th>Project type</th>
          <th>Start Date</th>
          <th>Deadline</th>
          <th>Status</th>
          <th >Project links</th>
          <th>Actions</th>
        </tr>
       
       {projects.map((project)=>{
        
       
        return(
          <tr className='project_table-body'>

          <td>{project.title}</td>
          <td>{project.type}</td>
          <td>{project.start} </td>
          <td>{project.end} </td>
          <td>{project.status}</td>
          <td  className='project_table-body_link'style={{color:'#4F9CD1'}}><p>{project.links[0]?.link}</p></td>
          <td className='project_table-body_icons'>
            <img src={eye} alt='eye'/>
            <img src={pen} alt='eye'/>
            <img src={trash} alt='eye'/>
            <img src={setting} alt='eye'/>
          </td>
          

          </tr>
        )
       })}
         
        


      </table>
      <div className='project_button'>
        <button>Back</button>
      </div>
    </div>
   </>
   );
 }
  
 export default Project;