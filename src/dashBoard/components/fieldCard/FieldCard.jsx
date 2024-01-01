import React, { useEffect, useState ,useRef } from 'react'
import './FieldCard.css'

import dots from '../../assets/fields/more.svg'
import user from '../../assets/fields/solar_user-rounded-linear.svg'
import scroll from '../../assets/fields/scroll.svg'
import { Link } from 'react-router-dom'

import { Axios } from '../../api/Axios'



const FieldCard = ({api,link,fun,num}) => {
  const [fields ,setFields] = useState([])





  const fetch = async()=>{
   const res = await Axios({
       method: "Get",
        url: `${api}`,
     })
     setFields(res.data.data.Departments || res.data.data.Subdepartments);
    }


  useEffect(()=>{
   fetch();
   num(fields.length)
   
  },[])

  return (
    <>
    {fields.map((field)=>{

      
      return(
        <div className='field_card ' onClick={()=>{fun(field.id)}}>
            <div>
              <h6>{field.title || field.name}</h6>
              <img src={dots} alt='dots'/>
            </div>
            <div>
              <img src={user} alt='user'/>
              <p> {field.employee_count ||field.employees_count} member</p>
            </div>
          <div>
              <img src={scroll} alt='scroll'/>
              <p>{field.technology_count} technologies</p>
            </div>
          
       </div>
      )
    })

    }
    </>
  )
}

export default FieldCard