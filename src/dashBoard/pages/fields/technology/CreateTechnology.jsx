import React, { useEffect, useRef, useState ,useContext} from 'react'
import './CreateTechnology.css'
import case1 from '../../../assets/Form/briefcase.svg'
import bin from '../../../assets/Form/fluent_delete-28-regular.svg'
import plus from '../../../assets/Form/icons.svg'
import Location from '../../../includes/location/Location'
import { Link } from 'react-router-dom'
import logo1 from '../../../assets/Form/Frame 1171275978 1.svg'
import camera from '../../../assets/Form/solar_camera-linear.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { serverApi } from '../../../../App'
import { Axios } from '../../../api/Axios'
import { notify,error } from '../../../notifications/Toast'
import Header from '../../../components/Header/Header'











const CreateTechnology = () => {

  const server = useContext(serverApi);


  let [options , setOptions] =useState([]);
  let [departments , setDepartments] =useState({
   
  });
  let [logoImage,setlogoImages] = useState(logo1) ;
  let [tech,setTech] = useState(false) ;
  let [technologies,setTechnologies] = useState([]) ;
  let [obj,setObj] = useState( {}) ;


   
  let linkinput = useRef(0);
  let logoImg = useRef(0);

  let submitBtn = useRef(0);
  let selected = useRef(0);
 


  
   
 

   let pushLink=()=>{

      if ( linkinput.current.value!== '' ){

        setObj({ ...obj , name : linkinput.current.value}) 
        
      

       
        let item = departments[selected.current.value];
        item.push(linkinput.current.value);
       setDepartments({ ...departments ,[selected.current.value]: item })
       setTech(true);
       setlogoImages(logo1)
      }

      linkinput.current.value='';
   }

   
   
   
   const handleSubmit= async()=>{ 
   

     submitBtn.current.click(); 
     post();
   }
   


   const post=async()=>{
    
   
    await Axios({
      method: "post",
      url:  `${server}/technologies`,
      data: { technologies },
      headers: { "Content-Type": "multipart/form-data" },
    }).then(()=> notify()  )
     
      .catch(function (response) {
        console.log(response.name); 
        error();
       
      });

   }
   const fetchPost = async () => {
    try {
     await Axios({
        method: "Get",
         url: `${server}/subdepartments`
      }).then((res)=>{ setOptions(res.data.data.Subdepartments);})
   
      
    } catch (err) {
      console.error(err);
      error()
    }
  
  };
  

  useEffect(()=> {
     fetchPost(); 
  }
  , [])

  useEffect(()=> {
    
    if(tech){
      console.log(technologies)
      setTechnologies( [...technologies , obj ]);
    }
  }
  , [ obj.name ])

  const selectChange=(e)=>{
    setDepartments({ ...departments ,[e.target.value]:departments[e.target.value]? departments[e.target.value]:[] });
    
    

   
      const index = e.target.selectedIndex ;
      const el = e.target.childNodes[index]
      const option =  el.getAttribute('id');  

      setObj({ ...obj , subdepartment_id : option}) ;
    }
    
  

   
  return (
    <>
    <Header text='Technologies'/>

    <div className='dash__form'>
    <div className='dash__form-header' >
      <img src={case1} alt='case'/>
      <p style={{color:'#fff'}}>Create New Technology</p>
    </div>

    <form>
     
      <div className='dash__form-logo'>
        <div  className='dash__form-logo-img'>
              <img src={logoImage} alt='logo'/>
            </div>
            <div className='flex' style={{gap:'10px'}} onClick={()=>{logoImg.current.click() }}>
              <input name='logo' type="file" accept='image/*' hidden ref={logoImg} 
              onChange={({target:{files}})=>{setlogoImages(URL.createObjectURL(files[0])); setObj( { ...obj ,  logo :files[0]} ) }}/>
              <img src={camera} alt='camera' style={{width:'18px'}}/>
              <p>Upload Logo</p>
            </div> 
      </div>
      <div className='dash__form-content'>
         
          <div className='dash__form-content_details'style={{justifyContent:'flex-start'}}>
          
          <div>
            <p>Specialization</p>
            <div style={{display:'flex' ,flexDirection:'row',justifyContent:'flex-start',gap:'20px',alignItems:'center'}}>


            <select  ref={selected}   onChange={selectChange} >
            <option disabled hidden selected value= ''> -- select sub --</option>
             {options.map((opt)=>{
             
              return(
                
                <option id={opt.id}>{opt.title}</option>
                
               
                
              )
             })

             }
            </select>
           
             
            </div>
          </div>
          
          <div>
            <p>Technologies</p>
            <div style={{display:'flex' ,flexDirection:'row',justifyContent:'flex-start',gap:'20px',alignItems:'center'}}>
              <input  ref={linkinput}   placeholder='Backend' ></input>
              <div className='addLink' onClick={pushLink}   ><img src={plus} alt='addlink'/></div>
            </div>
          </div>
          </div>
          <div className='allDepartments' style={{width:'100%' }}>

            
             {
             Object.keys(departments).map((dep)=>{
              return(
              <div className='department' >

                <div className='department_header'> 
                    <h5>{dep}</h5>
                </div>
                    
                    
                  {departments[dep].map((link , index1)=>{
                    return(
              

                    <div className='department_technology'>
                      <h6>{link}</h6>
                    </div>
                   )
                  })}
                   
              </div>)

               
              })

              }



           
            
          </div>
        
          

      </div>
     
       <button type='sumbit' hidden ref={submitBtn} onClick={(e)=> e.preventDefault()}></button>
    </form>
    
    <div className='dash__form-confirm'>
     <Link   type='submit' onClick={()=>{handleSubmit()}}>Create</Link>
      <Link hidden >Back</Link>
     
    </div>
   
  </div>
  
  </>
  )
}

export default CreateTechnology