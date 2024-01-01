import React from 'react'
import './Location.css'



const Location = ({main,head}) => {
  return (
    
      <div className='dash__location'>

      

         <div className='dash__create'>
            <div className='dash__create-head'>
              {/* <img src={task} alt='task'/> */}
                <h2 style={{fontWeight:'600',fontSize:'24px'}}>{head}</h2>
            </div>
      

        </div>

            <div className='flex'>
              {main && <h2> {main} &nbsp; </h2>}
                <h2> &gt;  &nbsp; { head}</h2>
            </div>

      </div>
    
    
  )
}

export default Location