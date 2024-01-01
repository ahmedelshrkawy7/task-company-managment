import React, { useContext, useState,useEffect } from 'react'
import Project_card from '../../../components/project_card/Project_card'
import Projectnum_card from '../../../components/projectnum_card/Projectnum_card'
 import icon4 from '../../../assets/project_managment/bag-tick-2.svg'
import icon2 from '../../../assets/project_managment/bag-cross.svg'
 import icon3 from '../../../assets/project_managment/bag-timer.svg'
 import icon1 from '../../../assets/project_managment/briefcase.svg'
 import { Location } from '../../../routes/import'
 import plus from '../../../assets/Form/icons.svg'
import'./Project_dash.css'
import { serverApi } from '../../../../App'
import { Axios } from '../../../api/Axios'

const Project_dash = () => {

  const [projects_count,setProjects_count]= useState([])
  const [projects,setProjects]= useState([])
 const server = useContext(serverApi)
    const projectnum = [{header:'',num:'',icon:''}]



    const fetchPost=async()=>{

      const endpoints =['projects']
      try {
          Promise.all(endpoints.map((endpoint) => Axios.get(`${server}/${endpoint}`)))
  
          .then(([{data: projects}
  
            ] )=> {
  
  
            setProjects_count(projects.data.project_counts)
            setProjects(projects.data.allprojects)
         
          
            });
       
       
      } catch (err) {
        console.error(err);
      }
  
    };
  
  
    useEffect(()=>{
      fetchPost();
    },[])

  return (
  <>

   <Location main ='Project management' head='Project Dashboard '  />

{/* 
    <div className='dash__create'>
      <div className='dash__create-head'>
        
          <h2>Overview</h2>
      </div>
      
    </div> */}

    <div className='subtitle'>
        <h2>Overview</h2>
    </div>

    <div className='w-100 gap-4 grid lg:grid-cols-4   md:grid-cols-2 grid-cols-1'>
    

       <Projectnum_card header='Total' footer='Projects'  num ={projects_count.completed_projects+projects_count.in_progress_projects+projects_count.delayed_projects||''}  icon= {icon1} />
       <Projectnum_card header='Completed ' num ={projects_count.completed_projects}  footer='Projects'   icon= {icon2}/>
       <Projectnum_card header='In Progress '  num ={projects_count.in_progress_projects}   footer='Projects'  icon= {icon3}/>
       <Projectnum_card header='Delayed '  num ={projects_count.delayed_projects}  footer='Projects'  icon= {icon4}/>

    </div>

    <div className='subtitle'>
        <h2>Projects</h2>
    </div>
    
    <div className='w-100 gap-4 grid lg:grid-cols-4   md:grid-cols-2 grid-cols-1 '>

      {projects.map((project)=>{
        return(
          <>
          <Project_card project={project} />
         
          </>
          )
      })}
     
       
       
        
    </div>
  </>
  )
}

export default Project_dash