import React, { useEffect, useRef, useState ,useContext} from 'react'
import Location from '../../../includes/location/Location'
import case1 from '../../../assets/Form/briefcase.svg'
import bin from '../../../assets/Form/fluent_delete-28-regular.svg'
import upload from '../../../assets/Form/documentupload.svg'
import plus from '../../../assets/Form/icons.svg'
import camera from '../../../assets/Form/solar_camera-linear.svg'
import trash from '../../../assets/Form/trash.svg'
import material from '../../../assets/Form/material-symbols_zoom-out-map-rounded.svg'
import logo1 from '../../../assets/Form/Frame 1171275978 1.svg'
import  pdf  from '../../../assets/Form/pdf.svg'
import  p  from '../../../assets/project/svgexport-18 1.svg'
import { Link, useNavigate } from 'react-router-dom'
import { serverApi } from '../../../../App'
import { useFormik } from 'formik'
import Selectinput from '../../../components/selectinput/Selectinput'
import Addattachments from './../../../components/Addattachments/Addattachments';
import { Axios } from '../../../api/Axios'
import * as Yup from 'yup'

const Create_task = () => {
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
 
    title: Yup.string('shuold be string').required('required *'),
    description: Yup.string('shuold be string').required('required *'),
    status: Yup.string('shuold be string').required('required *'),
    start: Yup.string('shuold be string').required('required *'),
    end: Yup.string('shuold be string').required('required *'),
    links: Yup.string('shuold be string').required('required *'),
  
  });

  const formik = useFormik({
    initialValues:{
      title :'' ,
    description: '' , 
    status: 'delay',
    start: '' ,
    end : '',
    attachments: [], 
    links : [],
    },
    validationSchema:validationSchema,
    onSubmit:()=>{
      handleSubmit();
      navigate('/Task Management/list')
    }
  })

  
  const server =useContext(serverApi)

   let [links,setLinks] =useState([]) ;
   let [technology,setTechnology] =useState([]) ;

   
  const[projects,setProjects] =useState([])
  const[phases,setPhases] =useState([])
  const[departments,setDepartments] =useState([])
  const[members,setMembers] =useState([])


  
   let linkinput = useRef(0);
   let submitBtn = useRef(0);

   
  //  console.log(technologies)
  //  console.log(data);




   

  const fetchPost=async()=>{

    const endpoints =['projects','ProjectPhases','departments','employees']
    try {
        Promise.all(endpoints.map((endpoint) => Axios.get(`${server}/${endpoint}`)))

        .then(([{data: projects}, {data: phases}, {data: departments}, {data: members},
          ] )=> {


          setProjects(projects.data.allprojects)
          setPhases(phases.data.Phases)
          setDepartments(departments.data.Departments);
          setMembers(members.data.employees);
        
          });
     
     
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

       }
   
    }
 }

 let remove=(index1,inputName)=>{

   switch(inputName){
       case 'link' :
           setLinks(links.filter(( word ,index)=>{return (index1 !== index)}));
           formik.setFieldValue('links',  formik.values.links.filter(( word ,index)=>{return (index1 !== index)})  )

       break ;    
      //  case 'tech' :
      //       setTechnology(technology.filter(( word ,index)=>{return (index1 !== index)}));
      //       formik.setFieldValue('technologies',  formik.values.technologies.filter(( word ,index)=>{return (index1 !== index)})  )

      //  break ;    
   }
    
 }

const handleSelect =(e,name)=>{

  const index =    e.target.childNodes[e.target.selectedIndex].getAttribute('name');

  formik.setFieldValue( name ,  index)

}
  
 
   const handleSubmit= async()=>{ 
     
    
     submitBtn.current.click(); 

     await Axios({
      method: "post",
      url: `${server}/Phases/tasks`,
      data: formik.values ,
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
    <Location main='Tasks' head=' Create Task'/>
   
    <div className='dash__form'>
      <div className='dash__form-header' >
        <img src={case1} alt='case'/>
        <p style={{color:'#fff'}}>Create Task</p>
      </div>
      <form onSubmit={formik.handleSubmit}>
     



        
        <div className='dash__form-content'>
           
            <div className='dash__form-content_details'>

            <div style={{width:'50%'}}>
              <p>Task Title</p>
              <input name='title' type='text'  onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
              <span className='error'>{formik.touched.title && formik.errors.title}</span>
            </div>

            <div  style={{width:'50%'}}> 
              <Selectinput name='project_id' fun={handleSelect}   header='Project Name' data={projects} />
              <span className='project_id'>{formik.touched && formik.errors.project_id}</span>
            </div>

            <div  style={{width:'50%'}}>
              <Selectinput name='phase_id' fun={handleSelect}   header='Project Phase' data={phases} />
              <span className='error'>{formik.touched.phase_id && formik.errors.phase_id}</span>
            </div>
           
            <div>
              <p>Status</p>
              <select name='status'  onChange={formik.handleChange} onBlur={formik.handleBlur}>
               
                <option >Completed</option>
                <option >In progress</option>
                <option >Delayed</option>
              </select>
              <span className='error'>{formik.touched.status && formik.errors.status}</span>
            </div>
            
            <div>
              <p>Priority</p>
              <select name='priority'   onChange={formik.handleChange} onBlur={formik.handleBlur}>
               
                <option >high</option>
                <option >low</option>
             
              </select>
              <span className='error'>{formik.touched.priority && formik.errors.priority}</span>

            </div>
            <div>
              <p>Start Date</p>
              <input name='start' type='date'  onChange={formik.handleChange} onBlur={formik.handleBlur}></input>
              <span className='error'>{formik.touched.start && formik.errors.start}</span>

            </div>
            
            <div>
              <p>Deadline</p>
              <input name='end' type='date'   onChange={formik.handleChange} onBlur={formik.handleBlur} ></input>
              <span className='error'>{formik.touched.end && formik.errors.end}</span>
            </div>
         
            <div>
              <Selectinput header='Department' name='department'fun={formik.handleChange}   data={departments} />
              <span className='error'>{formik.touched && formik.errors.title}</span>
            </div>
            <div>
              <Selectinput header='Member' name='employee_id' fun={handleSelect}  data={members}/>
              <span className='error'>{formik.touched && formik.errors.title}</span>
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
           
         </div>
        
          

           

          <Addattachments fun={updateData}/>

            
            <div className='dash__form-content_projdetails'>
              <div className='dash__form-content_projdetails-header'>
                <p>Project Details</p>
              </div>
              <div className='dash__form-content_projdetails-input'>
               <textarea rows="4" cols="50" name='description'   onChange={formik.handleChange} onBlur={formik.handleBlur}></textarea> 
                  {/* <input rows="4" cols="50" type='text'name='description' onBlur={handleChange} /> */}
              </div>
              {/* <span className='error'>{formik.touched.description && formik.errors.description}</span> */}
          </div>

        </div>
         <button type='submit' hidden ref={submitBtn}></button>
      </form>
      
      <div className='dash__form-confirm'>
       <Link   onClick={()=>{submitBtn.current.click()}}>create</Link>
        <Link>back</Link>
        
      </div>
    </div>
    </>
  )
}



export default Create_task