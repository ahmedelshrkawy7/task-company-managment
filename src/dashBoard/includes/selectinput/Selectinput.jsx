import React from 'react'



const Selectinput = ({name,header, arr,fun,data}) => {
  return (


   
           <div>
              <p>{header}</p>
              <select name={name} onChange={(e)=> fun(e)} >

               <option selected hidden>-- select {name}</option>

               {data?.map((opt)=>{
                    return(

                        <option name={opt.id}>{opt.title}{opt.first_name}&nbsp;{opt.last_name}{opt.government}</option>

                    )
                })}
               
                
               
              </select>
            </div>
          
    
  )
}

export default Selectinput