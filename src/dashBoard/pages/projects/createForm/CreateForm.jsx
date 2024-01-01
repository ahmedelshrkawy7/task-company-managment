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
import Selectinput from '../../../components/selectinput/Selectinput'
import { Axios } from '../../../api/Axios'
import logo1 from '../../../assets/Form/Frame 1171275978 1.svg'
import { Link, useNavigate } from 'react-router-dom'
import { serverApi } from '../../../../App'
import Addattachments from '../../../components/Addattachments/Addattachments'
import { useFormik } from 'formik'
import { notify,error } from '../../../notifications/Toast'
import * as Yup from 'yup'

const CreateForm = () => {

  const navigate =useNavigate()

  const validationSchema = Yup.object().shape({
    // Define validation rules for each input
    // personal: Yup.object().shape({
    //   title: Yup.string().required('title is required'),
    //   lastName: Yup.string().required('Last Name is required'),
    // }),
    // address: Yup.object().shape({
    //   street: Yup.string().required('Street is required'),
    //   city: Yup.string().required('City is required'),
    //   state: Yup.string().required('State is required'),
    //   zip: Yup.string().required('Zip Code is required'),
    // }),
  
  title: Yup.string('title shuold be string').required('required *'),
  start: Yup.string('start date shuold be string').required('required *'),
  end: Yup.string('deadline shuold be string').required('required *'),
  type: Yup.string('type shuold be string').required('required *'),
  status: Yup.string('type shuold be string').required('required *'),
  select: Yup.string('type shuold be string').required('required *'),
  // status: Yup.required('required *'),


  
  });

  const formik = useFormik({
    initialValues:{
      title:'',
    description: '' , 
    status: 'delay',
    type :'',
    start: '' ,
    end : '',
    attachments: [], 
    logo: '', 
    links : [],
    technologies:[]
    },
    validationSchema:validationSchema,
    validateOnChange:true,
    validateOnBlur:true ,
    validate:(values)=>{ console.log(values)},
    onSubmit:(values)=>{
      handleSubmit();
      navigate('/Project List')
      
    }
  })

  
  const server =useContext(serverApi)

   let [links,setLinks] =useState([]) ;
   let [technology,setTechnology] =useState([]) ;
   let [logoImage,setlogoImages] = useState() ;
   let [technologies,setTechnologies] = useState([]) ;
   
   let linkinput = useRef(0);
   let techinput = useRef(0);
   let logoImg = useRef(0);
   let submitBtn = useRef(0);

   
  



   



  const fetchPost = async () => {
    try {
      await Axios({
        method: "Get",
         url: `/technologies`,
      }).then((res)=> {setTechnologies( res.data.data.Technologies )});

     
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{
    fetchPost();
  },[])


    const updateData =(Allattachments)=>{

      formik.setFieldValue('attachments',  Allattachments  )

    }


 
   

  let push=(str,inputName)=>{

    if( str !==''){

       switch(inputName){

           case 'link' :
           
              setLinks((prev)=> [...prev ,str]);
              formik.setFieldValue('links',[...formik.values.links , str ])
              linkinput.current.value=''
           break ;   


           case 'tech' :

               setTechnology((prev)=>[...prev , str]);
               

              

 
             

           break ;    
       }
   
    }
 }

 let remove=(index1,inputName)=>{

   switch(inputName){
       case 'link' :
           setLinks(links.filter(( word ,index)=>{return (index1 !== index)}));
           formik.setFieldValue('links',  formik.values.links.filter(( word ,index)=>{return (index1 !== index)})  )

       break ;    
       case 'tech' :
            setTechnology(technology.filter(( word ,index)=>{return (index1 !== index)}));
            formik.setFieldValue('technologies',  formik.values.technologies.filter(( word ,index)=>{return (index1 !== index)})  )

       break ;    
   }
    
 }


  
 
   const handleSubmit= async()=>{ 
     
    
      console.log(formik.values);
     await Axios({
      method: "post",
      url: `/projects`,
      data: formik.values ,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response);
        notify('Project added successfully')
      })
      .catch(function (response) {
        console.log(response); 
        error('Server Error')
      });
      
   }



   

  return (
    <>
    <Location main='Projects' head=' Create Project'/>
  
    <div className='dash__form'>
      <div className='dash__form-header' >
        <img src={case1} alt='case'/>
        <p style={{color:'#fff'}}>Create New Project</p>
      </div>
      <form onSubmit={formik.handleSubmit} className='needs-validation' novalidate>
        <div className='dash__form-logo'>
          <div  className='dash__form-logo-img'>
            <img src={logoImage || logo1} alt='logo'/>
          </div>
          <div className='flex' style={{gap:'10px'}} onClick={()=>{logoImg.current.click() }}>
            <input  name='logo' type="file" accept='image/*' hidden ref={logoImg} 
            onChange={({target:{files}})=>{setlogoImages(URL.createObjectURL(files[0])); formik.setFieldValue('logo',files[0]) ; }}/>
            <img src={camera} alt='camera' style={{width:'18px'}}/>
            <p>Upload Logo</p>
          </div> 
        </div>



        
        <div className='dash__form-content'>
           
            <div className='dash__form-content_details'>
            <div  style={{width:'75%'}}>
              <p>Project Name</p>
              <input name='title' type='text'  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.title}></input>
              
              <span className="error">{formik.touched.title &&formik.errors.title}</span>
            </div>
            
            <div>
              <p>Start Date</p>
              <input name='start'  type='date'  onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
              <span className="error">{formik.touched.start && formik.errors.start }</span>
            </div>
            
            <div>
              <p>Deadline</p>
              <input name='end' type='date'  onChange={formik.handleChange} onBlur={formik.handleBlur} ></input>
              <span className="error">{formik.touched.end && formik.errors.end }</span>
            </div>
            <div>
              <p>Status</p>
              <select name='select'  onChange={formik.handleChange} onBlur={formik.handleBlur}value={formik.values.status}>
               
                <option >Completed</option>
                <option >Delayed</option>
                <option >in Progress</option>
               
              </select>
              <span className="error">{formik.touched.select && formik.errors.select }</span>
            </div>
            <div>
              <p>Project type</p>
              <input type='text' name='type'  onChange={formik.handleChange} onBlur={formik.handleBlur}/>
              <span className="error">{formik.touched.type && formik.errors.type }</span>

            </div>
            <div>
              <p>Project links</p>
              <div style={{display:'flex' ,flexDirection:'row',justifyContent:'flex-start',gap:'20px',alignItems:'center'}}>
                <input  ref={linkinput} ></input>
                <div className='addLink' onClick={()=>{push(linkinput.current.value , 'link'); }}   ><img src={plus} alt='addlink'/></div>
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
                <select type='url' name='' ref={techinput} >
                        
                  <option selected hidden value=''>- select technology -</option>
                  {technologies?.map((tech)=>{

                    return(
                      <>
                        <option name={tech.id}>{tech.name}</option>
                       
                      </>

                    )
                  })}

                  
                </select>

                <div className='addLink' onClick={(e)=>{push( techinput.current.value , 'tech'); formik.setFieldValue('technologies',[...formik.values.technologies , techinput.current.selectedIndex])}}   ><img src={plus} alt='addlink'/></div>
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
               <textarea rows="4" cols="50" name='description'  onBlur={formik.handleChange}></textarea> 
                  {/* <input rows="4" cols="50" type='text'name='description' onBlur={handleChange} /> */}
              </div>
          </div>

        </div>
         <button type='submit' hidden ref={submitBtn}></button>
      </form>
      
      
      <div className='dash__form-confirm'>
        <Link  type='submit' onClick={()=>{submitBtn.current.click()}}>create</Link>
        <Link>back</Link>
        
      </div>
    </div>
    </>
  )
}

export default CreateForm