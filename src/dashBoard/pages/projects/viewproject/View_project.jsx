import React, { Component ,useRef} from 'react';
import './View_project.css'
import Location from '../../../includes/location/Location';
import case1 from '../../../assets/Form/briefcase.svg'
import { Link } from 'react-router-dom';
import attach from '../../../assets/fields/Attach.png'
import plus from '../../../assets/fields/Plus Math.png'
import document from '../../../assets/fields/document-text.svg'
import trash from '../../../assets/Form/trash.svg'
import material from '../../../assets/Form/material-symbols_zoom-out-map-rounded.svg'
import pdf from '../../../assets/fields/svgexport-10 (18) 1.svg'
import download from '../../../assets/fields/import.svg'



const View_project = () => {
    let submitBtn = useRef(0);

    const items=[{name:'Project Name',data:'senior App'},{name:'Project Type',data:''},
    {name:' Start Date ',data:''},{name:'Deadline ',data:''},{name:'Status',data:''},{name:'Technologies',data:''},]
    
    
    return ( 
        <>
        <Location head='Seinor App '/>
        <div className='dash__form'>
      <div className='dash__form-header' >
        <img src={case1} alt='case'/>
        <p style={{color:'#fff'}}>Seinor App Information</p>
      </div>
      <form>
        
        <div className='dash__viewtask'>
            <div className='dash__viewtask-img'>
              <img src={attach} alt=''/>
            </div>
            <div className='dash__viewtask-information'>
                <h2 className="head">General Information :</h2>
                <div className='dash__viewtask-information_content'>
                    {
                        items.map((item)=>{
                            return(
                            <div className='dash__viewtask-information_content-item'>
                                <h3>{item.name}:</h3>
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
                       <div className='attach-link'>
                            <h3>http//:www.project.com//llfpffvppjfdiu8ufhovoiidhf</h3>
                       </div>
                    </div>


                    <div>
                        <div className='attach-head'>
                            <img src={attach} alt=''/>
                            <h3 >Attachments</h3>
                        </div>
                       
                        <div className='dash__form-content_attach_upload flex' style={{gap:'25px', flexWrap:'wrap', justifyContent:'flex-start'}} >

                                    
                                    <div className='dash__form-content_attach_upload-image'>
            
                                        <div className='dash__form-content_attach_upload-image_file'>
                                            
                                            <img src={attach} alt='attach img'/>
                                        </div>
            
            
                                        {/* <div className='dash__form-content_attach_upload-image_hover'>
                                            <img src={material} alt='material'/>
                                            <img src={trash} alt='trash'  />
                                        </div> */}
                                    
            
                                    </div>
                                
            
                                
                                
                                
                        
                        
                        </div>
                
                    </div>
              

                    <div>
                         <div className='attach-head'>
                            <img src={document} alt=''/>
                            <h3 > Documents</h3>
                        </div>
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
                    </div>
                </div>
                
            </div>

           
            <div className='dash__viewtask-details'>
                <h2 className="head">Project Description :</h2>
                <div className='dash__viewtask-details_content'>
                    <h2>Lörem ipsum salig nen, ip-tv plus labesa. Eurov yk.
                         Funktionell dumhetsabel som antiras mide. Heteron bionebelt preseling, divis peng.
                          Trer beroren.</h2>
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