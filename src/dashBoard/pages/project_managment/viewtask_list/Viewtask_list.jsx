import React, { useContext, useEffect, useState} from 'react'
import Location from '../../../includes/location/Location'
import eye from '../../../assets/project/bi_eye.svg'
import pen from '../../../assets/project/edit-2.svg'
import trash from '../../../assets/project/trash.svg'
import setting from '../../../assets/project/setting-2.svg'
import task from '../../../assets/project/task.svg'
import plus from '../../../assets/Form/icons.svg'
import Label from '../../../components/label/Label'
import './Viewtask_list.css'
import { serverApi } from '../../../../App'
import { Link, useNavigate } from 'react-router-dom';
import { Axios } from '../../../api/Axios'

 const Viewtask_list = () => {

  const [projects,setProjects] = useState([]);


  const server = useContext(serverApi)


  const fetchPost = async () => {
    try {
      const response = await Axios({
        method: "Get",
         url: `${server}/tasks`,
      });
      setProjects(response.data.data.tasks);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=> {
    fetchPost();
  }
  , [])

  const navigate = useNavigate()


  

  return ( 
    <>
    <Location head='Task List' main='Tasks'/>

   
    <div className='project_table' >
      <table >
        <tr className='project_table-head'>
          <th>Task Title</th>
          <th>Project name</th>
          <th>Project Phase</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Member</th>
          <th>Actions</th>
        </tr>
       
       {projects?.map((project)=>{
        
       
        return(
          <tr className='project_table-body'>

          <td>{project.title} </td>
          <td>{project.title}</td>
          <td>{project.phase_name}</td>
          <td><Label text={project.status} /> </td>
          <td><Label text={project.priority} /></td>
          <td className='member_img' style={{display:'flex' , justifyContent:'space-around'}}> <img src={project.employee.image} alt='image' style={{width:'32px' ,height:'32px',borderRadius:'50%' }}/>      {project.employee.first_name}&nbsp;{project.employee.last_name}</td>
          <td className='project_table-body_icons'>
            <img src={eye} alt='eye'onClick={()=>{navigate(`/Task Management/list/view`)}} />
            <img src={pen} alt='eye'/>
            <img src={trash} alt='eye'/>
            <img src={setting} alt='eye' onClick={()=>{navigate(`/projects/Phase/${project.id}`)}}/>
          </td>
          

          </tr>
        )
       })}
         
        


      </table>
    </div>
      <div className='dash__form-confirm'>
       <Link to ='/projects/projectlist'  type='submit' hidden>create</Link>
       <Link to ='/projects'>back</Link>
        
      </div>
   </>
   );
 }
  
 export default  Viewtask_list;