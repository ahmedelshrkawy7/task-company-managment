import React, { useState } from 'react'
import './Department.css'
import FieldCard from '../../../components/fieldCard/FieldCard'
import Location from '../../../includes/location/Location'
import plus from '../../../assets/Form/icons.svg'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Scroll } from '../../../includes/scrollHorizantly/Scroll'

const Department = () => {

  const nav = useNavigate();

  const scrollRef = Scroll() ;

  const navigate=(id)=>{
    
    nav (`../fields/${id}`);

  }
  const[numDep, setNumDep]=useState(null)

  const depNum =(num)=>{
    setNumDep(num)
  }




  return (
    <>
    
    <Location main='Fields' head='Departments' />
  
    <div className='grid w-100 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>


      <FieldCard api='departments' num={depNum}   fun={navigate}/>
      
     
    </div>
     
     
     
      
    </>
  )
}

export default Department