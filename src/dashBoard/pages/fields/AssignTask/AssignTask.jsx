import React, { useEffect, useRef, useState } from 'react'
import './AssignTask.css'
import case1 from '../../../assets/Form/briefcase.svg'
import bin from '../../../assets/Form/fluent_delete-28-regular.svg'
import upload from '../../../assets/Form/documentupload.svg'
import plus from '../../../assets/Form/icons.svg'
import camera from '../../../assets/Form/solar_camera-linear.svg'
import trash from '../../../assets/Form/trash.svg'
import material from '../../../assets/Form/material-symbols_zoom-out-map-rounded.svg'
import logo1 from '../../../assets/Form/Frame 1171275978 1.svg'
import  pdf  from '../../../assets/Form/pdf.svg'
import Location from '../../../includes/location/Location'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Axios } from '../../../api/Axios'

const AssignTask = () => {

   let [links,setLinks] =useState([]) ;
   let [images,setImages] =useState([]) ;
   let [logoImage,setlogoImages] = useState() ;
   let [Attachments,setAttachments] = useState([]) ;
   

   let linkinput = useRef(0);
   let fileInput = useRef('');
   let logoImg = useRef(0);
   let submitBtn = useRef(0);

   let [data ,setData ] =  useState( { 
 
    // title :'' ,
    // description: '' , 
    // status: 'On going',
    // type :'',
    // start: '' ,
    // end : '',
    // attachments: Attachments , 
    // logo: '', 
    // links : []
   })
  
    
  const notify = () =>toast.success('Specializations Saved Successfully', {
   
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});
  const error = () =>toast.error('Server Error', {
   
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});
   const handleChange = (e) => {

    const value = e.target.value;
     setData({
      ...data,
     [e.target.name]: value
     });
  };

  useEffect(()=>{
    setData( { ...data ,  attachments :[ ...Attachments]} )
    ;
  },[Attachments]);

   

   let pushLink=()=>{
      if(linkinput.current.value !==''){
       setLinks([...links, linkinput.current.value]);
       
       setData({...data , links : [...links]})
      }
      linkinput.current.value='';
   }
   let removeLink=(index1)=>{
      setLinks(links.filter(( word ,index)=>{return (index1 !== index)}))
   }
   let removeAttach=(index2)=>{
      setImages(images.filter(( word ,index)=>{return (index2 !== index)}));
      setAttachments(Attachments.filter((attach,index)=>{return(index2 !== index)}) );
      
   }


 
   const handleSubmit= async()=>{ 
     
    
     submitBtn.current.click(); 
     await Axios({
      method: "post",
      url: "/projects",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
       notify();
      })
      .catch(function (response) {
        console.log(response);  
        error()
      });
      
   }
   

  return (
    <>
    <Location head=' Assign New Task'/>
   
    <div className='dash__form'>
      <div className='dash__form-header' >
        <img src={case1} alt='case'/>
        <p style={{color:'#fff'}}>Assign New Task</p>
      </div>
      <form >
       
        
        <div className='dash__form-content' style={{ width:'92%'}}>
           
           <div className='dash__form-content_details' style={{ display:'flex',}}>
                <div style={{width:'45%'}} >
                    <p>Project Name</p>
                    <select name='status' style={{width:'100%'}} >
                    
                        <option   disabled selected    >Senior App</option>
                        <option value="2">Delayed</option>
                        <option value="3">On going</option>
                        <option value="4">At risk</option>
                    </select>
                </div>
                <div style={{width:'45%'}}>
                    <p>Phase</p>
                    <select name='status' style={{width:'100%'}}>
                    
                        <option value="" disabled selected>Create Login Design</option>
                        <option value="2">Delayed</option>
                        <option value="3">On going</option>
                        <option value="4">At risk</option>
                    </select>
                </div>
           </div>
           <div className='dash__form-content_details'>
                <div style={{width:'100%'}}>
                    <p>Task Title</p>
                    <input required name='start' type='text'placeholder='Enter input data' onChange={handleChange} style={{width:'100%'}}></input>
                </div>
           </div>
            <div className='dash__form-content_details'>
           
            <div>
              <p>Status</p>
              <select name='status' >
               
                <option value="1">Completed</option>
                <option value="2">Delayed</option>
                <option value="3">On going</option>
                <option value="4">At risk</option>
              </select>
            </div>
           
           
            <div>
              <p>Start Date</p>
              <input name='start' type='date' onChange={handleChange}></input>
            </div>
            
            <div>
              <p>Deadline</p>
              <input name='end' type='date' onChange={handleChange} ></input>
            </div>
            <div>
              <p>Pirority</p>
              <select name='status' >
               
                <option value="1" selected>High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
              
              </select>
            </div>
            </div>
            
            
          
            <div className='dash__form-content_details' >
              <div>
                  <p>Project links</p>
                  <div style={{display:'flex' ,flexDirection:'row',justifyContent:'flex-start',gap:'20px',alignItems:'center'}}>
                    <input type='url' ref={linkinput} placeholder='http//:www.project.com' ></input>
                    <div className='addLink' onClick={pushLink}   ><img src={plus} alt='addlink'/></div> 
                    <div className='dash__form-content_links' style={{margin:'0', display:'flex', flexWrap:'wrap'}} >

                          {links.map((link , index1)=>{

                          return(
                          <div className='dash__form-content_links-link' >

                          <div className='dash__form-content_links-link-a'>
                            <a href={link} target='blank'>{link}</a>
                          </div>
                          <div className='dash__form-content_links-link-icon' onClick={()=>{removeLink(index1)}}>
                              <img src={bin} alt='bin'/>
                            </div>

                          </div>
                          )

                          })}



                    </div>
                 </div>
              </div>
                    
            

            </div>
            <div className='dash__form-content_projdetails' style={{justifyContent:'space-between', width:'100%'}}>
              <div className='dash__form-content_projdetails-header'>
                <p>Project Details</p>
              </div>
              <div className='dash__form-content_projdetails-input'>
               <textarea placeholder='Type here' rows="4" cols="50" name='description' onChange={handleChange}></textarea> 
                  {/* <input rows="4" cols="50" type='text'name='description' onChange={handleChange} /> */}
              </div>
            </div>
            <div className='dash__form-content_attach'>
              
              <div className='dash__form-content_attach-header'>
                    <p>Attachments</p>
                  </div>
               <div className='dash__form-content_attach_upload flex' style={{gap:'25px', flexWrap:'wrap', justifyContent:'flex-start'}} >
                  <div className='dash__form-content_attach_upload-card' onClick={()=>{
                     fileInput.current.click(); 
                  }} >
                    <img src={upload} alt='upload'/>
                    <input hidden type='file'  ref={fileInput} onChange={({target:{files}})=>{
                      
                        
                        let urls=[];
                        for (let i of files){ 
  
                           if(i.type.startsWith('image/')){
                            urls.push ( URL.createObjectURL(i)) ;
                           }
                           else{
                            urls.push(pdf)
                           }
                          };
  
                          setAttachments([ ...Attachments , files]);
                          
                          setImages([...images , ...urls]);
                        
  
                    }} multiple />
                    <button onClick={(e)=>{e.preventDefault()}} >Uploading Files</button>
                  </div>
                  {/* <div className='dash__form-content_attach_upload-images flex 'style={{gap:'10px',width:'100%' , height:'100%' ,flexWrap:'wrap' */}
             
                   
                      {images.map((word,index)=>{
                        
                        
                        return(
                            <div className='dash__form-content_attach_upload-image'key={index}>
  
                                <div className='dash__form-content_attach_upload-image_file'>
                                  
                                   <img src={images[index]} alt='attach img'/>
                                 </div>
  
  
                                <div className='dash__form-content_attach_upload-image_hover'>
                                <img src={material} alt='material'/>
                                <img src={trash} alt='trash' onClick={()=>{removeAttach(index)}}/>
                            </div>
                          
  
                          </div>
                        )
                      })
  
                      }
                      
                    
                  {/* </div> */}
               
               </div>
              </div>

        </div>
         <button type='sumbit' hidden ref={submitBtn} onClick={(e)=> e.preventDefault()}></button>
      </form>
      
      <div className='dash__form-confirm'>
       <Link to='/AssignList'  type='submit' onClick={()=>{handleSubmit()}}>Create</Link>
        <Link>Back</Link>
        
      </div>
    </div>
    </>
  )
}

export default AssignTask