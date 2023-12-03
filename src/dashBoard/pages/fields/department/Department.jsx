import React from 'react'
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




  return (
    <>
    
    <Location main='Fields' head='Departments' />
    <div className='dash__create'>
      <div className='dash__create-head'>
        
          
      </div>
      <Link to='/createfield' className='dash__create-button'>
          
          <img src={plus} alt='plus'/>
          <h2>Add Department</h2>
        </Link>
     </div>
    <div className='dashboard__department' ref={scrollRef}>


      <FieldCard api='departments'   fun={navigate}/>
      
     
    </div>
     
     
     
      
    </>
  )
}

export default Department