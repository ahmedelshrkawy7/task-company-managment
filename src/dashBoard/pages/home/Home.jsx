import React, { useContext,useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Projectnum_card from '../../components/projectnum_card/Projectnum_card'
import { Location } from '../../routes/import'
import icon1 from '../../assets/project_managment/briefcase.svg'
import icon2 from '../../assets/home/cpu-setting.svg'
import icon3 from '../../assets/home/task-square.svg'
import icon4 from '../../assets/home/user.svg'
import Home_card from '../../components/home_card/Home_card'
import './Home.css'
import { serverApi } from '../../../App'
import AuthContext from '../../Auth/AuthProvider'
import { Axios } from '../../api/Axios'
import Header from '../../components/Header/Header'



const Home = () => {
  const[projects_count, setProjects_count]= useState([])
  const[projects, setProjects]= useState([])
  const navigate = useNavigate()

  const {Auth} = useContext(AuthContext)


  const server = useContext(serverApi)

  const fetchPost=async()=>{

    const endpoints =['projects','dashboard']
    try {
        Promise.all(endpoints.map((endpoint) => Axios.get(`${endpoint}`)))

        .then(([{data: projects},{data:counts}

          ] )=> {


          setProjects_count(counts.data)
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
    <Location main='Dashboard' head='Home'/>

    <Header text='Overview'/>
    <div className='grid w-100 lg:grid-cols-4 md:grid-cols-2  sm:grid-cols-1 gap-6  '>

     <Projectnum_card header='Projects Number' footer='Projects' num ={projects_count?.Projects}  icon= {icon1} />
     <Projectnum_card header='Fields' footer='Fields' num ={projects_count?.fields}   icon= {icon2} />
     <Projectnum_card header='Total Tasks' footer='Tasks' num ={projects_count?.tasks}  icon= {icon3} />
     <Projectnum_card header='Teams' footer='Member' num ={projects_count?.employees}  icon= {icon4} />

    </div>

    
    <Header text=' Projects Summary'/>


    <div className=' grid w-100 xl:grid-cols-3  w-100 md:grid-cols-2  grid-cols-1 gap-4 justify-center '>

      {projects.map((project)=>{
        return(
          <Home_card project={project} />

        )
      })}

    

    </div>

    </>
  )
}

export default Home