import React, { Component ,useRef,useEffect,useContext, useState} from 'react';
import './View_project.css'
import Location from '../../../includes/location/Location';
import case1 from '../../../assets/Form/briefcase.svg'
import { Link, useParams } from 'react-router-dom';
import attach from '../../../assets/fields/Attach.png'
import plus from '../../../assets/fields/Plus Math.png'
import document from '../../../assets/fields/document-text.svg'
import trash from '../../../assets/Form/trash.svg'
import material from '../../../assets/Form/material-symbols_zoom-out-map-rounded.svg'
import download from '../../../assets/fields/import.svg'
import axios from 'axios';
import { serverApi } from '../../../../App';

import word from '../../../assets/Form/svgexport-18 1.svg'
import  pdf  from '../../../assets/Form/svgexport-10 (18) 1.svg'
import rar  from '../../../assets/Form/svgexport-6 (2) 1.svg'


const View_project = () => {


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
          await axios({
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
                    {name:'Project Name',data:project.title},{name:'Project Type',data: project.type},
                    {name:' Start Date ',data:project.start},{name:'Deadline ',data:project.end},
                    {name:'Status',data:project.status},{name:'Technologies' , data: [...string] },]
    
    
    return ( 
        <>
        <Location head='Seinor App '/>
        <div className='dash__form'>
      <div className='dash__form-header' >
        <img src={case1} alt='case'/>
        <p style={{color:'#fff'}}>Seinor App Information</p>
      </div>
      <form>
        
        <div className='dash__viewtask' >


            <div className='dash__viewtask-img'>
              <img src={project?.logo} alt='title'/>
            </div>

            <div className='dash__viewtask-information'>
                <h2 className="head">General Information :</h2>
                <div className='dash__viewtask-information_content'>
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
      
      <div className='dash__form-confirm'>
        <Link  hidden type='submit' /*onClick={()=>{handleSubmit()}}*/ > create </Link> 
        <Link> back </Link>
        
      </div>
        </div>

   
    </>
    );
}
 
export default View_project;