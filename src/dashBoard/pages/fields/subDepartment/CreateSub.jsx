import React, { useEffect, useRef, useState,useContext } from 'react'
import case1 from '../../../assets/Form/briefcase.svg'
import bin from '../../../assets/Form/fluent_delete-28-regular.svg'
import plus from '../../../assets/Form/icons.svg'
import Location from '../../../includes/location/Location'
import { Axios } from '../../../api/Axios'
import { Link } from 'react-router-dom'
import { serverApi } from '../../../../App'
import { notify,error } from '../../../notifications/Toast'
import Header from '../../../components/Header/Header'














const Createsub = () => {
    let [title,setTitle] =useState([]) ;
    const[options,setOptions]=useState([])
    const[data ,setData] = useState({})
   

    let linkinput = useRef(0);
    
    let submitBtn = useRef(0);

   
  
   

 
   
  //  setData({...data, subdepartment: title  });
   let pushLink=()=>{

    
      if(linkinput.current.value !==''){

       setTitle([...title, { title: linkinput.current.value }]);
      
       
      }
      linkinput.current.value='';
   }
   let removeLink=(index1)=>{
      setTitle(title.filter(( word ,index)=>{return (index1 !== index)}))
   }
   const fetchPost = async () => {
    try {
     await Axios({
        method: "Get",
         url: `/departments`
      }).then((res)=>{ setOptions(res.data.data.Departments);})
   
      
    } catch (err) {
      console.error(err);
    }

  
  };
  

  useEffect(()=> {
     fetchPost();
    }
    , [])
   
  useEffect(()=> {
       setData({...data, subdepartments: title  });

    }
    , [title])
   
   
   
    
   const handleSubmit= async()=>{ 
     
    console.log(data)
     submitBtn.current.click(); 

     
     await Axios({
      method: "post",
      url:  `/subdepartments`,
      data: data ,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response);
        notify('Specialization Added successfully')
      })
      .catch(function (response) {
        console.log(response);
        error('Server Error')  
      });
      
   }
   
  return (
    <>
    <Header text='Specailizations'/>
    <div className='dash__form'>
    <div className='dash__form-header' >
      <img src={case1} alt='case'/>
      <p style={{color:'#fff'}}>Create New Specialization</p>
    </div>

    <form>
     
      
      <div className='dash__form-content'>
         
          <div className='dash__form-content_details' style={{justifyContent:'flex-start'}}>
          
          <div>
            <p>Department</p>
            <div style={{display:'flex' ,flexDirection:'row',justifyContent:'flex-start',gap:'20px',alignItems:'center'}}>

            <select onChange={(e)=>{ setData({...data, department_id: e.target.value  })}} >
              <option selected disabled hidden> -- Sub Department --</option>
             {options.map((opt)=>{
              return(
               
                <option key={opt.id}
                 value={opt.id}
                >{opt.title}</option>
                
              )
             })

             }
            </select>
              
            </div>
          </div>
          <div>
            <p>Specialization</p>
            <div style={{display:'flex' ,flexDirection:'row',justifyContent:'flex-start',gap:'20px',alignItems:'center'}}>
              <input  ref={linkinput} placeholder='Back-end' ></input>
              <div className='addLink' onClick={pushLink}   ><img src={plus} alt='addlink'/></div>
            </div>
          </div>
          </div>
          <div className='dash__form-content_links' style={{width:'100%' ,display:'flex'}}>

           {title.map((link , index1)=>{
            
            return(
            <div className='dash__form-content_links-link'>

            <div className='dash__form-content_links-link-a' style={{width:'100%'}}>
              <a href='/'>{link.title}</a>
            </div>
            <div className='dash__form-content_links-link-icon' onClick={()=>{removeLink(index1)}}>
                <img src={bin} alt='bin'/>
              </div>

         </div>
            )

           })}

           
            
          </div>
        
          

      </div>
       <button type='sumbit' hidden ref={submitBtn} onClick={(e)=> e.preventDefault()}></button>
    </form>
    
    <div className='dash__form-confirm'>
     <Link   type='submit' onClick={()=>{handleSubmit()}}>Create</Link>
      <Link hidden>Back</Link>
    </div>
  </div>
  </>
  )
}

export default Createsub