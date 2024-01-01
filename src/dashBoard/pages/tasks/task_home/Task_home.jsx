import React, { useContext, useEffect, useState } from 'react'
import plus from '../../../assets/Form/icons.svg'
import './Task_home.css'
import img from '../../../assets/tasks/Ellipse 3263.svg'
import star from '../../../assets/tasks/solar_star-outline.svg'
import ggg from '../../../assets/tasks/b615cd1f932cd1924a9842e4132a9d6b.png'
import link from '../../../assets/tasks/et_attachments.svg'
import Label from '../../../components/label/Label'
import progress from '../../../assets/tasks/lucide_clipboard-list.svg'
import delayed from '../../../assets/tasks/system-uicons_document.svg'
import { Axios } from '../../../api/Axios'
import { useNavigate } from 'react-router-dom'
import Task_view from '../task_view/Task_view'
import { Scroll } from '../../../includes/scrollHorizantly/Scroll'
import { Location } from '../../../routes/import'
import { Nprojectcard } from '../../../components/Nprojectcard/Nprojectcard'





const Task_home = () => {
    const[index, setIndex] = useState(0);
    const[active, setActive] = useState([1]);
    const[toggle, setToggle] = useState(false);
    const[projects, setProjects] = useState([]);
    const[project_statistics, setProject_statistics] = useState([]);
    const[project_id, setProject_id] = useState(1);
    const[tasks_count, setTasks_count] = useState([]);
    const[tasks, setTasks] = useState([]);
    const[phases, setPhases] = useState([]);
    const[phase_id, setPhase_id] = useState(1);
    const[active1, setActive1] = useState(1);
    const [activeClass, seActiveClass] = useState(null)

   
    const scrrollRef = Scroll();
  
    const togglefun=()=>{
        setToggle(!toggle)
    }

    const fetchPost=async()=>{

        const endpoints =['projects','tasks']
        try {
            Promise.all(endpoints.map((endpoint) => Axios.get(`/${endpoint}`)))
    
            .then(([{data: projects},{data:tasks_count}

              ] )=> {
    
    
              setProjects(projects.data.allprojects)
              setTasks_count(tasks_count.data.task_counts)
              
               
            
              });
         
         
        } catch (err) {
          console.error(err);
        }
    
      };
    

      useEffect(()=>{
        fetchPost();
      },[])

      
      useEffect(()=>{
        Axios.get(`/projects/1?phase_id=${phase_id}`).then((res)=> setTasks(res.data.data.tasks))
      },[phase_id])

      useEffect(()=>{
        Axios.get(`/Phases/${project_id}`).then((res)=>  {  setPhases(res.data.data.Phases)})

        Axios.get(`/projects/${project_id}`).then((res)=>  {  setProject_statistics(res.data.data)})

      },[project_id])

      const setproject_id =(num)=>{
        setProject_id(num)
        seActiveClass(num)
      }

      const navigate = useNavigate()




  return (
        <>
     

        <Location main='Dashboard' head='Tasks'/>

        <div className='task_home-projects'>
            <div className='task_title'>
                Projects
            </div>


            <div className='task_home-projects-cards' ref={scrrollRef}>


                {projects?.map((project,index)=>{
                return(
                    <>
                    {/* <div className= {`task_home-projects-cards_card ${project.id === activeClass ? "pro_active" : ""}`   } onClick={()=>{
                        setProject_id(project.id);
                        seActiveClass(project.id)
                        }}>
                        <div className='task_home-projects-cards_card-1'>
                            <div className='task_home-projects-cards_card-img' >
                                <img src={project.logo} alt='img'/>
                            </div>
                            <div className='task_home-projects-cards_card-name'>
                                <h3>{project.title}</h3>
                                <div><p>{project.end}</p></div>
                            </div>
                        </div>
                        <div className='task_home-projects-cards_card-2'>
                            <h2>Progress : 35%</h2>
                            <progress value='35' max='100' style={{heigth:'30px'}}></progress>
                        </div>

                        <div className='d-flex'>
                            <Label text={project.status}/>
                            <p style={{fontSize:'14px'}}>
                            | {project.phases_count} 
                            Phases |{project.start}

                            </p>
                        </div>


                    </div> */}
                   
                    <Nprojectcard project={project} index={index} pro_id={setproject_id} active={activeClass} />
                    </>
                )
                })}
            


            </div>

            <div className='task_title'>
               Project Statistics
            </div>


            <div className='task_home-Statistics'>
                <div className='task_home-Statistics_card'>
                    <div className='task_home-Statistics_card-icon'>
                        <img src={star} alt='star'/>
                    </div>
                    <div className='task_home-Statistics_card-content'>
                        <h6>Completed Tasks</h6>
                        <h4>{project_statistics.completed_tasks <= 10 ? '0'+ project_statistics.completed_tasks:project_statistics.completed_tasks}</h4>
                    </div>

                </div>
                <div className='task_home-Statistics_card' style={{background: '#21BD1E'}}>
                    <div className='task_home-Statistics_card-icon'>
                        <img src={delayed} alt='star'/>
                    </div>
                    <div className='task_home-Statistics_card-content'>
                        <h6 style={{color:'#21BD1E'}}> In Progress Tasks</h6>
                        <h4 style={{color:'#21BD1E'}}>{project_statistics.in_progress_tasks <= 10 ? '0'+ project_statistics.in_progress_tasks:project_statistics.in_progress_tasks}</h4>
                    </div>

                </div>
                <div className='task_home-Statistics_card'style={{background: '#F24040'}}   >
                    <div className='task_home-Statistics_card-icon'>
                        <img src={progress} alt='star'/>
                    </div>
                    <div className='task_home-Statistics_card-content'>
                        <h6 style={{color:'#F24040'}}>Delayed Tasks</h6>
                        <h4 style={{color:'#F24040'}}>{project_statistics.delayed_tasks <= 10 ? '0'+ project_statistics.delayed_tasks:project_statistics.delayed_tasks}</h4>
                    </div>

                </div>
                
            </div>


            <div className='task_home-phases'>
                <div className='dashboard_allfields_toggle' style={{width:'100%'}}>
        {
            
                     phases?.map((sub,index)=>{
                            
                            
                            return(

                            <div style={{flexGrow:'1',maxWidth:'250px'}} className={ active[index]? 'active':''} key={sub.id}  onClick={()=> { setIndex(index); setActive(()=>{let arr=[]; arr[index]=1; return arr } );setPhase_id(sub.id) }}>

                                <h5>{sub.title}</h5>
                            </div>
                            )
                        })
                        }
        
                </div>
               <div className='task_home-phases_content'>
                 
                    <div className='task_title' >
                        Tasks Today
                    </div>
                    <div className='task_home-phases_tasks'>

                        {tasks?.map((task)=>{

                            return(

                                <div className='task_home-phases_tasks-task' onClick={togglefun}>
                                    <div style={{height:'100%' , display:'flex' , alignItems:'center' ,padding:'0'}}>
                                        <div  className='task_home-phases_tasks-task_person' >
        
                                            <img src={task.employee.image} alt='aaa'/>
                                            <div>
                                                <h6>Start from</h6>
                                                <p>{task.start}</p>
                                            </div>
        
                                        </div>
        
                                        <div className='task_home-phases_tasks-task_name' >
                                            <h4>{task.title}</h4>
                                            <div className='task_home-phases_tasks-task_name-content'> 
                                                <div className='task_home-phases_tasks-task_name-content_link'>
                                                    <img src={link}  alt='link' />
                                                    <h4>{task.links[0]}</h4>
                                                </div> <span className='span_space'/>
                                                <div className='task_home-phases_tasks-task_name-content_status' >
                                                    <h4>Status :</h4>
                                                    <Label text={task.status} />
                                                </div>  
                                            </div>
                                        </div>
        
                                    </div>
                                    
                                    <div className='task_home-phases_tasks-task_priority'>
                                        <h2>Priority :</h2>
                                        <Label text={task.priority} />
                                        
                                    </div>
                                    <div className='task_home-phases_tasks-task_progress'>
                                        <h6>Progress     <span>{Math.floor(task.progress)}%</span></h6>
                                        <progress value={task.progress} max="100"></progress>
                                    </div>
                                    <div className='task_home-phases_tasks-task_deadline'>
                                        <h5>Deadline</h5>
                                        <h5 style={{color:'var(--blue)'}}>{task.end}</h5>
                                    </div>
        
                                </div>
                             
                            )
                        })}

                        
                    </div>
       

               </div>

            </div>
       
      </div>

      { toggle &&
          <Task_view fun={togglefun}/>
      }


        </> 
 )
}

export default Task_home