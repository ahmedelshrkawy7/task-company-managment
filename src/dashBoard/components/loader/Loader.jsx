import React, { useState } from 'react'
import './Loader.css'
import { IoMdClose } from "react-icons/io";


const Loader = () => {

    const [show , setShow]= useState(true)

    setTimeout(()=>{
        setShow(false)

    },1000)


  return (
  <>
    <div className='dash_loader'>
        
        
        <div class="loader"></div>

        <IoMdClose size={27} style={{position:'absolute', top:'20px' , right:'20px' }}/>

    </div>

  </>
  )
}

export default Loader