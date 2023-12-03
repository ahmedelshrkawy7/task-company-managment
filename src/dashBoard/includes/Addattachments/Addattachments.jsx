import React, { useEffect, useRef, useState ,useContext} from 'react'
import upload from '../../assets/Form/documentupload.svg'
import trash from '../../assets/Form/trash.svg'
import material from '../../assets/Form/material-symbols_zoom-out-map-rounded.svg'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { serverApi } from '../../../App'
import { IoIosClose } from "react-icons/io";
import word from '../../assets/Form/svgexport-18 1.svg'
import  p  from '../../assets/Form/svgexport-10 (18) 1.svg'
import rar  from '../../assets/Form/svgexport-6 (2) 1.svg'


const Addattachments = ({fun}) => {
    
  const server =useContext(serverApi)

  let [links,setLinks] =useState([]) ;
  let [technology,setTechnology] =useState([]) ;
  let [images,setImages] =useState([]) ;
  let [docs,setDocs] =useState([]) ;
  let [docfiles,setDocfiles] =useState([]) ;
  let [Attachments,setAttachments] = useState([]) ;
  let [allattachments,setAllattachments] = useState([]) ;
  let [technologies,setTechnologies] = useState([]) ;
  
   // console.log(technologies)
   // console.log(images)
   // console.log(docs[0]?.file)
   
//    console.log(allattachments)
//    console.log(Attachments)
//    console.log(docfiles)

 
  let fileInput = useRef('');
 
  
 
  
 

 


 useEffect(()=>{

 setAllattachments([  ...Attachments , ...docfiles]);

   ;
 },[Attachments,docfiles]);


 useEffect(()=>{

  fun(allattachments)

   ;
 },[allattachments]);
  


  

 
let remove=(index1,inputName)=>{

  switch(inputName){
      case 'link' :
          setLinks(links.filter(( word ,idx)=>{return (index1 !== idx)}))
      break ;    
      case 'tech' :
           setTechnology(technology.filter(( word ,idx)=>{return (index1 !== idx)}))
      break ;    
      case 'images' :
        setImages((prev)=>prev.filter(( word ,idx)=>{return (index1 !== idx)}));
        setAttachments((prev)=> prev.filter((word ,idx)=>{ return( index1!== idx)} ))

      break ;    
      case 'docs' :
        setDocs((prev)=>prev.filter(( word ,idx)=>{return (index1 !== idx)}));
        setDocfiles((prev)=> prev.filter((word ,idx)=>{ return( index1!== idx)} ))

      break ;    
  }
   
}
  
  
  let addAttach =({target:{files}})=> {
                     
                       
   for (let i of files){ 
     // console.log(i)

     if(i.type.startsWith('image/')){
       setImages((prev)=>[...prev , URL.createObjectURL(i)]);
       setAttachments((prev)=>[ ...prev , i]);

     }

     else if(i.type.endsWith('pdf')){

       setDocs((prev)=>[...prev , {name: i.name , img: p ,type: 'pdf' }]);
       setDocfiles((prev)=> [...prev , i]);

     }
     else if(i.type.endsWith('document')){

       setDocs((prev)=>[...prev , {name: i.name , img: word ,type: 'word'}]);
       setDocfiles((prev)=> [...prev , i]);


     }
     else {

       setDocs((prev)=>[...prev , {name: i.name , img: rar ,type: 'rar'}]);
       setDocfiles((prev)=> [...prev , i]);


     }

   };


}


  let removeAttach=(index2)=>{
     setImages(images.filter(( word ,index)=>{return (index2 !== index)}));
     setAttachments(Attachments.filter((attach,index)=>{return(index2 !== index)}) );
     
  }

  return (
    <>
     
              <div className='dash__form-content_attach'>
                
                <div className='dash__form-content_attach-header'>
                      <p>Attachments</p>
                    </div>
                <div className='dash__form-content_attach_upload flex' style={{gap:'25px', flexWrap:'wrap', justifyContent:'flex-start'}} >
                    <div className='dash__form-content_attach_upload-card' onClick={()=>{
                      fileInput.current.click(); 
                    }} >
                      <img src={upload} alt='upload'/>
                      <input hidden type='file'  ref={fileInput} onChange={(e)=> addAttach(e)} multiple />
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

              { docs[0] &&
              <>
              <div>
                    <div className='dash__form-content_attach-header'>
                                <p>Documents</p>
                    </div>
              </div>
  
              <div className='dash__form-content_attach-documents'>
                {docs?.map((doc,index)=>{
  
                return(
                  
                  <div className='dash__form-content_attach-documents_doc'>
                    <img src={doc.img} alt='pdf'/>
                    <h4>{doc.name}</h4>
                    <p style={{justifySelf:'flex-end'}}>{doc.type} File</p>
                    <IoIosClose color=' #1370E4' size={24} style={{cursor:'pointer'}} onClick={()=>{remove(index,'docs')}}/>
                  </div>
  
                )
                })}
              </div>
              </>
                }
    </>
    
  )
}

export default Addattachments