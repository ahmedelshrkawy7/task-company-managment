import React, { useRef,useEffect,useContext, useState} from 'react';
import case1 from '../../../assets/Form/briefcase.svg'
import { Link, useParams } from 'react-router-dom';
import attach from '../../../assets/fields/Attach.png'
import plus from '../../../assets/fields/Plus Math.png'
import document from '../../../assets/fields/document-text.svg'
import trash from '../../../assets/Form/trash.svg'
import material from '../../../assets/Form/material-symbols_zoom-out-map-rounded.svg'
import download from '../../../assets/fields/import.svg'
import { serverApi } from '../../../../App';
import { Axios } from '../../../api/Axios';
import './Task_view.css'
import word from '../../../assets/Form/svgexport-18 1.svg'
import  pdf  from '../../../assets/Form/svgexport-10 (18) 1.svg'
import rar  from '../../../assets/Form/svgexport-6 (2) 1.svg'
import { IoClose } from "react-icons/io5";



const Task_view = ({fun}) => {


    let submitBtn = useRef(0);
    const{id}=useParams();
    const server = useContext(serverApi)

    const[project,setProject] = useState([]);
    console.log("🚀 ~ file: View_project.jsx:25 ~ project:", project)


  


 let string = [];


    project?.technologies?.map((tech)=>{

        string.push(tech.name + ' , ')

        
    })




    const fetchPost = async () => {
        try {
          await Axios({
            method: "Get",
             url: `${server}/projects/${id}`,
          }).then((res)=> {setProject(res.data.data.project)});
    
         
        } catch (err) {
          console.error(err);
        }
      };
    
      useEffect(()=>{
        fetchPost();
      },[])
  


//  for(technology of project?.technologies){
//     console.log("🚀 ~ file: View_project.jsx:48 ~ technology:", technology)
//     } 
    

    const items=[
                    {name:'Project Name',data:project.title},{name:'Project Phase',data: project.type},
                    {name:' Start Date ',data:project.start},{name:'Deadline ',data:project.end},
                    {name:'Priority',data:project.status},{name:'Team Member ' , data: [...string] },
                    {name:'Project Name',data:project.title},
                    {name:'Status ',data:project.title}
                ]
    
    
    return ( 
        <div className='task_popup'>

            <div className='dash__form' style={{width:'810px' ,height:'100%' ,gap:'0'}}>
        <div className='dash__form-header' >
            <img src={case1} alt='case'/>
            <p style={{color:'#fff'}}>Task Information</p>
            <IoClose color='#fff' size={20} style={{position:'absolute', right:'20px'}} onClick={fun}/>
        </div>
        <form>
            
            <div className='dash__viewtask' style={{ justifyContent:'flex-start'}} >


                {/* <div className='dash__viewtask-img'>
                <img src={project?.logo} alt='title'/>
                </div> */}

                <div className='dash__viewtask-information'>
                    <h2 className="head">General Information :</h2>
                    <div className='dash__viewtask-information_content' style={{display:'grid' , gridTemplateColumns:'1fr 1fr'}}>
                        {
                            items.map((item)=>{
                                return(
                                <div className='dash__viewtask-information_content-item'>
                                    <h3>{item.name}&nbsp;:</h3>
                                    <p>&nbsp;{item.data}</p>
                                </div>
                                )
                            })
                        }

                    </div>
                </div>
                
                <div className='dash__viewtask-attachments'>
                <h2 className="head">URL :</h2>
            
                    
                    <div  className='dash__viewtask-attachments_content'>
                        <div>
                        <div className='attach-head'>
                            <img src={attach} alt=''/>
                            <h3 >Document Links</h3>
                        </div>
                        <div className='dash__form-content_links'>
                            
                            {
                                    project?.links?.map((link)=>{
                                        return(
                                            <div className='dash__form-content_links-view'>
                                                <h3>{link}</h3>
                                            </div>
                                        )
                                    })
                                }
                        

                        
                            
                            
                        </div>
                        </div>


                        <div>
                            <div className='attach-head'>
                                <img src={attach} alt=''/>
                                <h3 >Attachments</h3>
                            </div>
                        
                            <div className='dash__form-content_attach_upload flex' style={{gap:'25px', flexWrap:'wrap', justifyContent:'flex-start'}} >

                                
                                
        
                                    
                                        
                                        {project?.attachments?.map((attachment)=>{

                                        if( attachment.attachment_type == 'image'){

                                            return(
                                                <div className='dash__form-content_attach_upload-image' key={project.id}>
    
                                                <div className='dash__form-content_attach_upload-image_file'>
                                                
                                                <img src={attachment.attachment_path} alt='attach img'/>
                                                </div>

                                            </div>
                
                                            )
                                        }
                                        })}
        
                            </div>
                    
                        </div>
                

                        <div>
                            <div className='attach-head'>
                                <img src={document} alt=''/>
                                <h3 > Documents</h3>
                            </div>


                            <div className='attach-files'>
                                
                            {project?.attachments?.map((attachment)=>{

                                if( attachment.attachment_type != 'image'){

                            

                                    return(

                                        <div className='attach-file'>
                                            <div>
                                                <img src={pdf} alt='files'/>
                                            </div>
                                            <div>
                                                <h3>Project Details</h3>
                                                <p>20 page . 4,4 MB</p>
                                            </div>
                                            <div style={{marginLeft:'auto'}}>
                                                <img src={download} alt=''/>
                                            </div>
                                            
                                        </div>
                                    )


                                }
                                })  }
                            
                            </div>
                            
                        
                        </div>
                    </div>
                    
                </div>

            
                <div className='dash__viewtask-details'>
                    <h2 className="head">Project Description :</h2>
                    <div className='dash__viewtask-details_content'>
                        <h2>{project.description}</h2>
                    </div>
                
                </div>

            </div> 
            
        
            <button type='sumbit' hidden ref={submitBtn} onClick={(e)=> e.preventDefault()}></button>
        </form>
        
   
            </div>
    
       </div>
    );
}
 
export default Task_view;