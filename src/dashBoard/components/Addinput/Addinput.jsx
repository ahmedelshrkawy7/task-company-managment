import React, { useContext, useEffect, useRef, useState } from 'react'
import case1 from '../../assets/Form/briefcase.svg'
import bin from '../../assets/Form/fluent_delete-28-regular.svg'
import plus from '../../assets/Form/icons.svg'
import axios from 'axios'
import { serverApi } from '../../../App'





const Addinput = ({header,placeholder, keyName ,fun}) => {

    let [title,setTitle] =useState([]) ;
    let linkinput = useRef(0);
    let submitBtn = useRef(0);
    const server =useContext(serverApi)
    
//   console.log({api})
//   console.log({arrName})

   let push=(str ,name)=>{

    
    if( str !==''){

     setTitle([...title, str ]);

    }
    
    linkinput.current.value='';
   
  }
    
     



 let removeLink=(index1)=>{


    setTitle(title.filter(( word ,index)=>{return (index1 !== index)}))

 }

 useEffect(()=>{

  fun( title, keyName);


 },[title])
   
   
   
    
  //  const handleSubmit= async()=>{

  //    submitBtn.current.click(); 
  //    await axios({
  //     method: "post",
  //     url:  `${server}/${api}`,
  //     data: { [arrName] : title} ,
  //     headers: { "Content-Type": "multipart/form-data" },
  //   })
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (response) {
  //       console.log(response);  
  //     });
      
  //  }



   useEffect(()=>{
    setTitle([]);
   },[header])





    
  return (
  <>

      


    <div>
    <p>{header}</p>
    <div style={{display:'flex' ,flexDirection:'row',justifyContent:'flex-start',gap:'20px',alignItems:'center'}}>
        <input  ref={linkinput} placeholder={placeholder} ></input>
        <div className='addLink' onClick={ ()=> push( linkinput.current.value, {keyName})}   ><img src={plus} alt='addlink'/></div>
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
  </>
  )
}

export default Addinput