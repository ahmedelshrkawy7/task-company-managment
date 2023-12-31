import React, {  useEffect, useRef, useState } from 'react'
import case1 from '../../assets/Form/briefcase.svg'
import bin from '../../assets/Form/fluent_delete-28-regular.svg'
import plus from '../../assets/Form/icons.svg'
import { Axios } from '../../api/Axios'
import { Link } from 'react-router-dom'
import { notify,error } from '../../notifications/Toast'
import Location from '../location/Location'
import Header from '../../components/Header/Header'





const Addform = ({header,placeholder, api ,arrName}) => {


  let [title,setTitle] =useState([]) ;
  
   

   let linkinput = useRef(0);
   
   let submitBtn = useRef(0);

   
  
   

 
   
   let pushLink=()=>{

    
      if(linkinput.current.value !==''){

       setTitle([...title,  linkinput.current.value ]);
      }
      linkinput.current.value='';
    }
      
       



   let removeLink=(index1)=>{
      setTitle(title.filter(( word ,index)=>{return (index1 !== index)}))
   }
   
   
   
   
    
   const handleSubmit= async()=>{


     
     submitBtn.current.click(); 
     await Axios({
      method: "post",
      url:  `/${api}`,
      data: { [arrName] : title } ,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        notify(`${arrName} added successfully`)
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);  
        error(`Server Error`)
      });
      
   }

   useEffect(()=>{
    setTitle([]);
   },[header])





   
  return (
    <>

    <Header text={header}/>

    <div className='dash__form'>
      <div className='dash__form-header' >
        <img src={case1} alt='case'/>
        <p style={{color:'#fff'}}>Create New {header}</p>
      </div>

      <form>
      
        
        <div className='dash__form-content'>
          
          <div className='dash__form-content_details'>

            <div>
              <p>{header}</p>
              <div style={{display:'flex' ,flexDirection:'row',justifyContent:'flex-start',gap:'20px',alignItems:'center'}}>
                <input  ref={linkinput} placeholder={placeholder} ></input>
                <div className='addLink' onClick={pushLink}   ><img src={plus} alt='addlink'/></div>
              </div>
            </div>

          </div>

            <div className='dash__form-content_links' style={{width:'100%' ,gridTemplateColumns:'1fr 1fr 1fr 1fr'}}>

            {title.map((link , index1)=>{
              
              return(
              <div className='dash__form-content_links-link' style={{width:'100%'}}>

              <div className='dash__form-content_links-link-a' style={{width:'165px'}}>
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

export default Addform