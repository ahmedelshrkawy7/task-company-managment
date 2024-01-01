import React, { useContext, useEffect, useState} from 'react'
import './project.css'
import Location from '../../../includes/location/Location'

import plus from '../../../assets/Form/icons.svg'

import { Link, useNavigate } from 'react-router-dom';
import Table from '../../../includes/table/Table'
import { Axios } from '../../../api/Axios'





const Project = () => {
  
  const th =['Project Name','Project type','Start Date','Deadline','Status','Actions']
  const attributes=['type','start','end']

  const [projects,setProjects] = useState([]);
  const navigate = useNavigate();


  const fetchPost = async () => {
    try {
      const response = await Axios({
        method: "Get",
         url: `/projects`,
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
    {/* <Location head='  Project List'/> */}

    {/* <div className='dash__create'>
      <div className='dash__create-head'>
        <img src={task} alt='task'/>
          <h2> Project List</h2>
      </div>

        <Location main='projects' head='  Project List'/>

     </div> */}
      <Location    main='Projects' head='  Project List'/>


    <Table th={th} api='projects' res_key='allprojects'
     attributes={attributes} eye_route='/projects/view' trash_route='/projects/Phase'  />

     <div className='dash__form-confirm'>
       <Link to ='/projects/projectlist'  type='submit' hidden>create</Link>
       <Link to ='/projects'>back</Link>
        
      </div>



{/* 
    <div className='project_table' >
      <table >


        <tr className='project_table-head'>
          {th?.map((th)=>{
            return(

              <th>{th}</th>

            )
          })}
         
        </tr>
       
       {projects.map((project)=>{
        
       
        return(
          <tr className='project_table-body'>

          <td>{project.title}</td>
          <td>{project.type}</td>
          <td>{project.start} </td>
          <td>{project.end} </td>
          <td>{project.status}</td>
          <td className='project_table-body_icons'>
            <img src={eye} alt='eye'onClick={()=>{navigate(`/projects/view/${project.id}`)}} />
            <img src={pen} alt='eye'/>
            <img src={trash} alt='eye'/>
            <img src={setting} alt='eye' onClick={()=>{navigate(`/projects/Phase/${project.id}`)}}/>
          </td>
          

          </tr>
        )
       })}
         
        


      </table>
      <div className='dash__form-confirm'>
       <Link to ='/projects/projectlist'  type='submit' hidden>create</Link>
       <Link to ='/projects'>back</Link>
        
      </div>
    </div> */}
   </>
   );
 }
  
 export default Project;