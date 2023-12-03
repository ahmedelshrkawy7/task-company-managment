import React, { useEffect, useRef, useState ,useContext} from 'react'
import './CreateForm.css'
import Location from '../../../includes/location/Location'
import case1 from '../../../assets/Form/briefcase.svg'
import bin from '../../../assets/Form/fluent_delete-28-regular.svg'
import upload from '../../../assets/Form/documentupload.svg'
import plus from '../../../assets/Form/icons.svg'
import camera from '../../../assets/Form/solar_camera-linear.svg'
import trash from '../../../assets/Form/trash.svg'
import material from '../../../assets/Form/material-symbols_zoom-out-map-rounded.svg'
import logo1 from '../../../assets/Form/Frame 1171275978 1.svg'
import axios from 'axios'
import  pdf  from '../../../assets/Form/pdf.svg'
import  p  from '../../../assets/project/svgexport-18 1.svg'
import { Link } from 'react-router-dom'
import { serverApi } from '../../../../App'
import Addattachments from '../../../includes/Addattachments/Addattachments'

const CreateForm = () => {

  
  const server =useContext(serverApi)

   let [links,setLinks] =useState([]) ;
   let [technology,setTechnology] =useState([]) ;
   let [images,setImages] =useState([]) ;
   let [logoImage,setlogoImages] = useState() ;
   let [Attachments,setAttachments] = useState([]) ;
   let [technologies,setTechnologies] = useState([]) ;
   
   let linkinput = useRef(0);
   let techinput = useRef(0);
   let fileInput = useRef('');
   let logoImg = useRef(0);
   let submitBtn = useRef(0);

   let [data ,setData ] =  useState( { 
 
    title :'' ,
    description: '' , 
    status: 'On going',
    type :'',
    start: '' ,
    end : '',
    attachments: Attachments , 
    logo: '', 
    links : [],
    technologies:[]
   })
  
   console.log(technologies)




   const handleChange = (e) => {

    const value = e.target.value;
     setData({
      ...data,
     [e.target.name]: value
     });
  };




  const fetchPost = async () => {
    try {
      await axios({
        method: "Get",
         url: `${server}/technologies`,
      }).then((res)=> {setTechnologies( res.data.data.Technologies )});

     
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{
    fetchPost();
  },[])


    const updateData =(Allattachments)=>{

      setData( { ...data ,  attachments :[ ...Allattachments]} )
    }


  useEffect(()=>{
    setData( { ...data ,  attachments :[ ...Attachments]} )
    ;
  },[Attachments]);

   

  let push=(str,inputName)=>{

    if( str !==''){

       switch(inputName){

           case 'link' :
              let arr = [...links,str];
              setLinks((prev)=> [...prev ,str]);
              setData({...data , links : arr})
              linkinput.current.value=''
           break ;   


           case 'tech' :

               setTechnology((prev)=>[...prev , str]);
               

              let index = techinput.current.selectedIndex;

              let arr1 = [...technology, index];
 
               setData({...data , technologies : arr1})

           break ;    
       }
   
    }
 }

 let remove=(index1,inputName)=>{

   switch(inputName){
       case 'link' :
           setLinks(links.filter(( word ,index)=>{return (index1 !== index)}))
       break ;    
       case 'tech' :
            setTechnology(technology.filter(( word ,index)=>{return (index1 !== index)}))
       break ;    
   }
    
 }


   let removeAttach=(index2)=>{
      setImages(images.filter(( word ,index)=>{return (index2 !== index)}));
      setAttachments(Attachments.filter((attach,index)=>{return(index2 !== index)}) );
      console.log(Attachments)
      
   }
 
   const handleSubmit= async()=>{ 
     
    
     submitBtn.current.click(); 
     console.log(data); 
     await axios({
      method: "post",
      url: `${server}/projects`,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);  
      });
      
   }
   

  return (
    <>
    <Location head=' Create Project'/>
    <div className='dash__create'>
      <div className='dash__create-head'>
        
          
      </div>
      <div className='dash__create-button'>
          <img src={plus} alt='plus'/>
          <h2>Create new project</h2>
        </div>
     </div>
    <div className='dash__form'>
      <div className='dash__form-header' >
        <img src={case1} alt='case'/>
        <p style={{color:'#fff'}}>Create New Project</p>
      </div>
      <form>
        <div className='dash__form-logo'>
          <div  className='dash__form-logo-img'>
            <img src={logoImage? logoImage:logo1} alt='logo'/>
          </div>
          <div className='flex' style={{gap:'10px'}} onClick={()=>{logoImg.current.click() }}>
            <input name='logo' type="file" accept='image/*' hidden ref={logoImg} 
            onChange={({target:{files}})=>{setlogoImages(URL.createObjectURL(files[0])); setData( {...data ,  logo :files[0]} ) }}/>
            <img src={camera} alt='camera' style={{width:'18px'}}/>
            <p>Upload Logo</p>
          </div> 
        </div>



        
        <div className='dash__form-content'>
           
            <div className='dash__form-content_details'>
            <div  style={{width:'75%'}}>
              <p>Project Name</p>
              <input name='title' type='text'  onChange={handleChange}></input>
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
              <p>Status</p>
              <select name='status' >
               
                <option value="1">Completed</option>
                <option value="2">Delayed</option>
                <option value="3">On going</option>
                <option value="4">At risk</option>
              </select>
            </div>
            <div>
              <p>Project type</p>
              <input type='text' name='type'  onChange={handleChange}/>
              
            </div>
            <div>
              <p>Project links</p>
              <div style={{display:'flex' ,flexDirection:'row',justifyContent:'flex-start',gap:'20px',alignItems:'center'}}>
                <input type='url' ref={linkinput} ></input>
                <div className='addLink' onClick={()=>{push(linkinput.current.value , 'link')}}   ><img src={plus} alt='addlink'/></div>
              </div>
            </div>
           { links[0] && <div className='dash__form-content_links' style={{width:'100%'}}>

                {links.map((link , index1)=>{
                
                return(
                <div className='dash__form-content_links-link'>

                <div className='dash__form-content_links-link-a'>
                  <a href={link} target='blank'>{link}</a>
                </div>
                <div className='dash__form-content_links-link-icon' onClick={()=>{remove(index1,'link')}}>
                    <img src={bin} alt='bin'/>
                  </div>

                </div>
                )

                })}


 
            </div>}
            <div>
              <p>Technologies</p>
              <div style={{display:'flex' ,flexDirection:'row',justifyContent:'flex-start',gap:'20px',alignItems:'center'}}>
                <select type='url' name='' ref={techinput}>
                        
                  {technologies?.map((tech)=>{

                    return(
                      <>
                        <option name={tech.id}>{tech.name}</option>
                       
                      </>

                    )
                  })}

                  
                </select>


                <div className='addLink' onClick={(e)=>{push( techinput.current.value , 'tech')}}   ><img src={plus} alt='addlink'/></div>
              </div>
            </div>
            { technology[0] && <div className='dash__form-content_links' style={{width:'100%'}}>

                {technology.map((tech , index1)=>{

                return(
                <div className='dash__form-content_links-link'>

                <div className='dash__form-content_links-link-a'>
                  <a  target='blank'>{tech}</a>
                </div>
                <div className='dash__form-content_links-link-icon' onClick={()=>{remove(index1,'tech')}}>
                    <img src={bin} alt='bin'/>
                  </div>

                </div>
                )

                })}



                </div>}
         </div>
        
          

           

          <Addattachments fun={updateData}/>

            
            <div className='dash__form-content_projdetails'>
              <div className='dash__form-content_projdetails-header'>
                <p>Project Details</p>
              </div>
              <div className='dash__form-content_projdetails-input'>
               <textarea rows="4" cols="50" name='description' onChange={handleChange}></textarea> 
                  {/* <input rows="4" cols="50" type='text'name='description' onChange={handleChange} /> */}
              </div>
          </div>

        </div>
         <button type='sumbit' hidden ref={submitBtn} onClick={(e)=> e.preventDefault()}></button>
      </form>
      
      <div className='dash__form-confirm'>
       <Link to ='/projects/projectlist'  type='submit' onClick={()=>{handleSubmit()}}>create</Link>
        <Link>back</Link>
        
      </div>
    </div>
    </>
  )
}

export default CreateForm