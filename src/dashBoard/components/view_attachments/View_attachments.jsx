import React from 'react'
import download from '../../assets/fields/import.svg'
import attach from '../../assets/fields/Attach.png'
import  pdf  from '../../assets/Form/svgexport-10 (18) 1.svg'




const View_attachments = ({links,attachs}) => {


  return (
    <div>
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
                                links?.map((link)=>{
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

                            
                            
    
                                
                                    
                                    {attachs?.map((attachment)=>{

                                      if( attachment.attachment_type == 'image'){

                                          return(
                                            <div className='dash__form-content_attach_upload-image'/* key={project.id}*/>
  
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
                              
                        {attachs?.map((attachment)=>{

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


    </div>
  )
}

export default View_attachments