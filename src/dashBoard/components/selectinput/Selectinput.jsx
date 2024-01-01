import React from 'react'



const Selectinput = ({name,header, arr,fun,data}) => {
  return (


   
           <>
              <p>{header}</p>
              <select name={name} onChange={(e)=> fun(e,name)}  >

               <option selected hidden>-- select {header}</option>

               {data?.map((opt)=>{
                    return(

                        <option name={opt.id}>{opt.title}{opt.first_name}&nbsp;{opt.last_name}{opt.government}{opt.name}</option>

                    )
                })}
               
                
               
              </select>
              
            </>
          
    
  )
}

export default Selectinput